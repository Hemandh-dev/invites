const http = require('http');

http.get('http://localhost:8000/www.missingpieceinvites.com/demos/meenaya.html', (res) => {
  console.log('Status code:', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Contains media__1781017365100.jpg:', body.includes('media__1781017365100.jpg'));
    console.log('Contains media__1781017365106.jpg:', body.includes('media__1781017365106.jpg'));
    console.log('Contains media__1781017365111.jpg:', body.includes('media__1781017365111.jpg'));
    console.log('Contains media__1781017365114.jpg:', body.includes('media__1781017365114.jpg'));
  });
});
