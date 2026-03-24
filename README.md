# elecsy.shop — YouTube Link Shortener

## কীভাবে Vercel-এ Deploy করবে

### Step 1: GitHub-এ Upload করো
1. GitHub.com-এ যাও
2. New Repository তৈরি করো → নাম দাও `elecsy-links`
3. এই folder-এর সব file সেখানে upload করো

### Step 2: Vercel-এ Deploy করো
1. vercel.com → "Add New Project"
2. তোমার `elecsy-links` repo select করো
3. **Environment Variables** section-এ যোগ করো:
   - Name: `ADMIN_PASSWORD`
   - Value: তোমার পছন্দের password (যেমন: `elecsy@2024`)
4. Deploy করো!

### Step 3: Custom Domain যোগ করো
1. Vercel Dashboard → তোমার project → Settings → Domains
2. `elecsy.shop` যোগ করো
3. তোমার domain provider-এ DNS update করো (Vercel বলে দেবে কী করতে হবে)

## কীভাবে ব্যবহার করবে

- **Admin Panel**: `elecsy.shop/admin` → login করো → link যোগ করো
- **Link format**: `/video221`, `/ep1`, `/latest` — যা খুশি
- **শুধু YouTube link** দেওয়া যাবে

## File Structure
```
elecsy-links/
├── api/
│   ├── [slug].js     ← redirect handler
│   └── admin.js      ← admin API
├── public/
│   ├── index.html    ← homepage
│   └── admin.html    ← admin panel
├── links.json        ← সব links store হয়
├── vercel.json       ← routing config
└── package.json
```
