const http = require('http');

http.get('http://localhost:8000/www.missingpieceinvites.com/demos/meenaya.html', (res) => {
  console.log('Status code:', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Contains Contact:', body.includes('Contact'));
    console.log('Contains Please rsvp:', body.includes('Please rsvp') || body.includes('Please<br class="framer-text">rsvp'));
  });
});
