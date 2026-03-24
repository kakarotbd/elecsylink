const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const { slug } = req.query;
  if (!slug) return res.redirect(302, '/');

  let links = {};
  try {
    links = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'links.json'), 'utf8'));
  } catch (e) {}

  const target = links[slug];
  if (target) return res.redirect(302, target);

  return res.status(404).send('<h1>404 - Link পাওয়া যায়নি</h1>');
};
