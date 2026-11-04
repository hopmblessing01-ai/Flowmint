# Contact form → blessing@flowmint.uk

The form uses **Web3Forms** to email you directly. No custom-domain mailbox or Resend domain setup required.

## Setup (5 minutes)

1. Go to [web3forms.com](https://web3forms.com)
2. Enter **blessing@flowmint.uk** and create an **Access Key**
3. Check that inbox for the key (or copy it from the dashboard)
4. **Netlify** → Site configuration → **Environment variables** → add:

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | your Web3Forms access key |

5. **Deploy** the site again (required — `NEXT_PUBLIC_*` vars are baked in at build time)

6. Submit a test on `https://flowmintops.netlify.app/contact` and check **blessing@flowmint.uk** (and spam)

## Local development

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, then restart `npm run dev`.

Without any key, localhost uses `/api/contact` (logs to terminal only).

## Why Netlify Forms did not email you

The site showed “success” but **Netlify never received** the submission (Next.js returns the homepage for `POST /`). Web3Forms fixes that.

## Optional: Resend backup

If `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is **not** set, the form falls back to `/api/contact` + Resend (`RESEND_API_KEY` in Netlify). That path sends to `CONTACT_TO_EMAIL`, or to **blessing@flowmint.uk** when that variable is unset.

An access key created with the old Gmail address still delivers there. Replace it with a key created for **blessing@flowmint.uk**, then redeploy.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Success but no email | Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` and **redeploy** |
| Still nothing | Confirm Web3Forms is registered to **blessing@flowmint.uk** |
| Error on submit | Check browser DevTools → Network → `api.web3forms.com` response |
| Emails in spam | Mark as “Not spam” once |
