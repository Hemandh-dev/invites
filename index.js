module.exports = (req, res) => {
  res.writeHead(302, { Location: '/invitation.html' });
  res.end();
};
