const fs = require('fs');
const path = require('path');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1234';
const linksPath = path.join(process.cwd(), 'links.json');

function getLinks() {
  try {
    return JSON.parse(fs.readFileSync(linksPath, 'utf8'));
  } catch {
    return {};
  }
}

function saveLinks(links) {
  fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const auth = req.headers['authorization'];
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const links = getLinks();

  if (req.method === 'GET') {
    return res.json(links);
  }

  if (req.method === 'POST') {
    const { slug, url } = req.body;
    if (!slug || !url) return res.status(400).json({ error: 'slug এবং url দরকার' });
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return res.status(400).json({ error: 'শুধু YouTube link দেওয়া যাবে' });
    }
    links[slug] = url;
    saveLinks(links);
    return res.json({ success: true, slug, url });
  }

  if (req.method === 'DELETE') {
    const { slug } = req.body;
    if (!slug || !links[slug]) return res.status(404).json({ error: 'Link পাওয়া যায়নি' });
    delete links[slug];
    saveLinks(links);
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
