# Get Flowmint on Google Search

Your live domain: **https://flowmintops.netlify.app**

## 1. Verify ownership (Search Console)

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://flowmintops.netlify.app` (URL prefix)
3. Verify using the HTML file already in `public/googleadddfb60282faaf8.html`
   - Test: open `https://flowmintops.netlify.app/googleadddfb60282faaf8.html` in a browser (must show one line of text)
4. Click **Verify**

## 2. Submit sitemap

After redeploying this repo:

1. Open `https://flowmintops.netlify.app/sitemap.xml` — you should see XML (not an error page)
2. In Search Console → **Sitemaps** → submit: `https://flowmintops.netlify.app/sitemap.xml`

## 3. Request indexing

Search Console → **URL inspection** → enter each URL → **Request indexing**:

- `https://flowmintops.netlify.app/`
- `https://flowmintops.netlify.app/about`
- `https://flowmintops.netlify.app/services`
- `https://flowmintops.netlify.app/projects`

## 4. Expect timing

- New sites often take **1–4 weeks** before brand searches like `Flowmint` show your site
- Check progress: search `site:flowmintops.netlify.app` on Google

## 5. Help ranking for your brand

- Link to `https://flowmintops.netlify.app` from LinkedIn, Upwork, and blessingigwegbe.com
- Keep business name **Flowmint** consistent everywhere
- Optional: Google Business Profile if you have a UK business address

## Netlify

- Redeploy after every SEO-related change
- Build command: `npm run build` (see `netlify.toml`)
- Use Netlify’s **Next.js** runtime (`@netlify/plugin-nextjs`)
