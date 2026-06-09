const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 8000;

// Content types mapping
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

const domains = [
  'api.pixelflow.so',
  'app.framerstatic.com',
  'c.ba.contentsquare.net',
  'events.framer.com',
  'fonts.gstatic.com',
  'framer.com',
  'framerusercontent.com',
  'slrgkgulru.pixelflow.so',
  't.contentsquare.net',
  'www.googletagmanager.com',
  'www.missingpieceinvites.com'
];

// Helper to rewrite remote references to local ones in HTML
function rewriteContent(content) {
  if (typeof content !== 'string') return content;
  let rewritten = content;
  
  for (const domain of domains) {
    const escapedDomain = domain.replace(/\./g, '\\.');
    
    // Replace absolute URLs: https://domain or http://domain or //domain -> /domain
    const regexNormal = new RegExp(`(https?:)?//${escapedDomain}`, 'g');
    rewritten = rewritten.replace(regexNormal, `/${domain}`);
  }
  return rewritten;
}

// Set no-cache headers to force browser to load fresh files (avoiding cached broken scripts)
function setNoCacheHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
}

// Robust fallback proxy to fetch missing assets from the live site
function proxyFallback(domain, pathname, search, ext, res) {
  const remoteUrl = `https://${domain}${pathname}${search}`;
  console.log(`[Proxy Fallback] Local file not found. Fetching: ${remoteUrl}`);
  
  const options = {
    timeout: 5000 // 5 seconds timeout
  };

  const makeRequest = (url) => {
    const proxyReq = https.get(url, options, (proxyRes) => {
      const statusCode = proxyRes.statusCode;

      // Handle redirects automatically
      if ([301, 302, 307, 308].includes(statusCode) && proxyRes.headers.location) {
        let redirectUrl = proxyRes.headers.location;
        if (redirectUrl.startsWith('/')) {
          redirectUrl = `https://${domain}${redirectUrl}`;
        }
        console.log(`[Proxy Redirect] Following redirect to: ${redirectUrl}`);
        makeRequest(redirectUrl);
        return;
      }

      if (statusCode === 200) {
        console.log(`[200 Proxy Success] Served: /${domain}${pathname}`);
        if (!res.headersSent) {
          setNoCacheHeaders(res);
          res.writeHead(200, {
            'Content-Type': proxyRes.headers['content-type'] || mimeTypes[ext] || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*'
          });
        }

        const isHtml = ext === '.html' || (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html'));
        
        if (isHtml) {
          let body = '';
          proxyRes.on('data', chunk => { body += chunk; });
          proxyRes.on('end', () => {
            let processed = rewriteContent(body);
            res.end(processed);
          });
        } else {
          proxyRes.pipe(res);
        }
      } else {
        console.log(`[Proxy ${statusCode}] Failed for ${url}`);
        if (!res.headersSent) {
          setNoCacheHeaders(res);
          res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
          res.end(`Proxy failed with status: ${statusCode}`);
        }
      }
    });

    proxyReq.on('timeout', () => {
      console.error(`[Proxy Timeout] Request timed out for ${url}`);
      proxyReq.destroy();
      if (!res.headersSent) {
        setNoCacheHeaders(res);
        res.writeHead(504, { 'Content-Type': 'text/plain' });
        res.end('Gateway Timeout');
      }
    });

    proxyReq.on('error', (err) => {
      console.error(`[Proxy Error] Request failed for ${url}: ${err.message}`);
      if (!res.headersSent) {
        setNoCacheHeaders(res);
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Bad Gateway');
      }
    });
  };

  makeRequest(remoteUrl);
}

const server = http.createServer((req, res) => {
  // Add CORS headers for web fonts, module preloads, etc.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse request URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Redirect root to the main HTML file
  if (pathname === '/' || pathname === '') {
    res.writeHead(302, { 'Location': '/www.missingpieceinvites.com/demos/invitation.html' });
    res.end();
    return;
  }

  // Resolve file path locally
  let filePath = path.join(__dirname, pathname);

  // Handle case where path is directory, try to append index.html
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch (e) {
    // If file doesn't exist, we will handle it below
  }

  const ext = path.extname(filePath).toLowerCase();

  // Check if file exists locally
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      // Serve local file
      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          console.error(`[500] Error reading ${pathname}: ${readErr.message}`);
          if (!res.headersSent) {
            setNoCacheHeaders(res);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          }
          return;
        }

        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        // Rewrite ONLY HTML assets
        if (ext === '.html') {
          const originalText = data.toString('utf8');
          let rewrittenText = rewriteContent(originalText);
          
          // Inject CSS to hide Watermark, Buy button, Card 4, and make event title font smaller
          const watermarkStyle = '<style>[data-framer-name="Watermark"], [data-framer-name="Buy button stack"], [data-framer-name="Card 4"] { display: none !important; } [data-framer-name="Event name"], [data-framer-name="Event name"] *, .framer-d9o4fp, .framer-d9o4fp * { font-size: 18px !important; --framer-font-size: 18px !important; }</style>';
          rewrittenText = rewrittenText.replace('</head>', `${watermarkStyle}</head>`);
          
          console.log(`[200] Served and Rewrote HTML (Watermark Hidden): ${pathname}`);
          if (!res.headersSent) {
            setNoCacheHeaders(res);
            res.writeHead(200, { 'Content-Type': contentType });
          }
          res.end(rewrittenText, 'utf8');
        } else {
          console.log(`[200] Served Local: ${pathname}`);
          if (!res.headersSent) {
            setNoCacheHeaders(res);
            res.writeHead(200, { 'Content-Type': contentType });
          }
          res.end(data);
        }
      });
    } else {
      // Local file not found! Let's check if it belongs to a scraped domain and try fallback proxy.
      const match = domains.find(domain => pathname.startsWith(`/${domain}/`));
      if (match) {
        const remotePath = pathname.substring(match.length + 1); // strip leading domain
        proxyFallback(match, remotePath, parsedUrl.search, ext, res);
      } else {
        // Completely missing local file
        console.log(`[404] Not Found: ${pathname}`);
        if (!res.headersSent) {
          setNoCacheHeaders(res);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
        }
        res.end('Not Found');
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`Wedding invitation site running locally!`);
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
