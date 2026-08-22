# Cloudflare Pages Deployment Guide

This site is a Next.js static export (`output: 'export'`) hosted on **Cloudflare Pages** at **jett.io**. Every push to `main` deploys automatically.

## Initial Setup (One-Time)

### 1. Create the Pages project

The project is named `jett-io`. If it does not exist yet, the first `wrangler pages deploy` will offer to create it, or you can create it up front:

```bash
wrangler pages project create jett-io --production-branch main
```

### 2. Configure the custom domain (jett.io)

1. In the Cloudflare dashboard, go to **Workers & Pages → jett-io → Custom domains**
2. Click **Set up a custom domain** and enter `jett.io`
3. If `jett.io` is already on Cloudflare DNS, the required record is created for you
4. If the domain is registered elsewhere, either:
   - Move the nameservers to Cloudflare (recommended — enables automatic TLS and the fastest edge routing), or
   - Add a `CNAME` record at your registrar pointing `jett.io` to `jett-io.pages.dev`
5. TLS certificates are issued automatically — no manual certificate step

Repeat for `www.jett.io` if you want the apex and www both served.

### 3. Add CI secrets

For the GitHub Actions workflow to deploy, add two repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → use the **Edit Cloudflare Workers** template, or a custom token with `Account → Cloudflare Pages → Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID in the right sidebar |

## Deployment Workflow

### Automatic deployment

Every push to `main` triggers `.github/workflows/deploy.yml`:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

The workflow will:
1. Check out the code
2. Install dependencies with `npm ci`
3. Build the site with `npm run build` (creates static files in `/out`)
4. Deploy `/out` to Cloudflare Pages via `wrangler-action`

### Manual deployment

From the Actions tab:

1. Go to **Actions** in the GitHub repository
2. Select the "Deploy to Cloudflare Pages" workflow
3. Click **Run workflow** and select the `main` branch

Or straight from your machine, which is often faster for a one-off:

```bash
npm run build
wrangler pages deploy out --project-name=jett-io
```

Add `--branch=main` to publish to production; without it, wrangler creates a preview deployment on its own branch alias.

### Preview deployments

Any deploy with a `--branch` other than `main` produces a preview URL of the form `<branch>.jett-io.pages.dev`, which is useful for sharing work in progress without touching production.

## Local Testing

Before pushing, test the static export locally:

```bash
# Development mode
npm run dev

# Build static export
npm run build

# The static files land in /out. Serve them exactly as Cloudflare will:
npx wrangler pages dev out
```

`wrangler pages dev` is closer to production than `npx serve` because it applies the same routing and trailing-slash behaviour as the Pages edge.

## Configuration Files

- **next.config.mjs** — `output: 'export'` for static export, `trailingSlash: true`, `images.unoptimized`
- **wrangler.toml** — declares the project name and `pages_build_output_dir = "out"`
- **.github/workflows/deploy.yml** — the CI deployment pipeline

## Troubleshooting

### Build fails

- Check the Actions tab for error logs
- Test the build locally: `npm run build`
- Ensure all dependencies are in `package.json`

### Deploy step fails with an authentication error

- Confirm `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set as repository secrets
- Confirm the token has the `Cloudflare Pages → Edit` permission — a token scoped only to Workers will not deploy Pages
- Locally, run `wrangler whoami` to confirm which account you are authenticated against

### Pages not updating

- Check the Actions tab to confirm the deployment completed
- Check **Workers & Pages → jett-io → Deployments** for the most recent build
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Purge the cache from the Cloudflare dashboard if a stale asset persists

### 404 errors

- Ensure `trailingSlash: true` is set in `next.config.mjs`
- Confirm `/out` contains the expected `index.html` files after a build
- Check that internal links use `next/link` and root-relative paths

### Custom domain not working

- Verify the domain shows as **Active** under the project's Custom domains tab
- If the domain is not on Cloudflare nameservers, confirm the `CNAME` to `jett-io.pages.dev` has propagated (`dig jett.io`)
- Certificate issuance can take a few minutes after the domain is attached

## Performance

The site is well suited to Pages:
- Static HTML export, served from Cloudflare's edge network
- No server runtime and no API dependencies
- Images are pre-optimised at build authoring time (`images.unoptimized` is set, so Next does not transform them)

## Monitoring

- Deployment status: **Actions** tab in GitHub, or **Workers & Pages → jett-io → Deployments**
- Live site: https://jett.io
- Analytics: **Workers & Pages → jett-io → Analytics** for edge request and bandwidth data
