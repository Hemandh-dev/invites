const http = require('http');

http.get('http://localhost:8000/www.missingpieceinvites.com/demos/meenaya.html', (res) => {
  console.log('Status code:', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const hasWrap = body.includes('href="https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw" target="_blank" rel="noopener" style="display: contents;"');
    console.log('Has the new link wrap:', hasWrap);
  });
});
