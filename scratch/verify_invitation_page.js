const http = require('http');

http.get('http://localhost:8000/', (res) => {
  console.log('Root Redirect Status:', res.statusCode);
  console.log('Redirect Location:', res.headers.location);
  
  if (res.headers.location) {
    http.get(`http://localhost:8000${res.headers.location}`, (innerRes) => {
      console.log('Redirect Destination Status:', innerRes.statusCode);
      let body = '';
      innerRes.on('data', chunk => body += chunk);
      innerRes.on('end', () => {
        console.log('Contains Siva Dhanush:', body.includes('Siva Dhanush'));
        console.log('Contains Renukadevi:', body.includes('Renukadevi'));
      });
    });
  }
});
