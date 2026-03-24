const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  const { slug } = req.query;
  if (!slug) return res.redirect(302, '/');

  try {
    const url = await kv.get(`link:${slug}`);
    if (url) return res.redirect(302, url);
  } catch (e) {}

  return res.status(404).send(`<!DOCTYPE html>
<html>
<head>
  <title>404 - elecsy.shop</title>
  <meta charset="UTF-8">
  <style>
    body { background: #0a0a0a; color: #fff; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; flex-direction: column; gap: 16px; }
    h1 { font-size: 4rem; margin: 0; color: #ff4444; }
    p { color: #888; }
    a { color: #ff4444; text-decoration: none; }
  </style>
</head>
<body>
  <h1>404</h1>
  <p>Link পাওয়া যায়নি: <strong>/${slug}</strong></p>
  <a href="/">← হোমে ফিরে যাও</a>
</body>
</html>`);
};
