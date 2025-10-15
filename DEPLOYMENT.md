# GitHub Pages Deployment Guide

This site is configured to automatically deploy to GitHub Pages at **jett.io** when you push to the `main` branch.

## Initial Setup (One-Time)

### 1. Configure GitHub Pages

1. Go to your GitHub repository settings
2. Navigate to **Settings → Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. Save the settings

### 2. Configure Custom Domain (jett.io)

1. In the same **Settings → Pages** section
2. Under "Custom domain", enter: `jett.io`
3. Click "Save"
4. Configure your DNS settings at your domain registrar:
   - Add an `A` record pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a `CNAME` record pointing to: `<your-username>.github.io`
5. Wait for DNS propagation (can take up to 24 hours)
6. Once DNS is configured, enable "Enforce HTTPS" in GitHub Pages settings

## Deployment Workflow

### Automatic Deployment

Every push to the `main` branch automatically triggers a deployment:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

The GitHub Actions workflow will:
1. Check out the code
2. Install dependencies with `npm ci`
3. Build the site with `npm run build` (creates static files in `/out`)
4. Deploy to GitHub Pages

### Manual Deployment

You can also trigger a deployment manually:

1. Go to **Actions** tab in your GitHub repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow"

## Local Testing

Before pushing, always test the static export locally:

```bash
# Development mode
npm run dev

# Build static export
npm run build

# The static files will be in the /out directory
# You can serve them locally with:
npx serve out
```

## Workflow File

The deployment is configured in `.github/workflows/deploy.yml`

Key features:
- Runs on push to `main`
- Uses Node.js 20
- Caches npm dependencies for faster builds
- Uploads the `/out` directory to GitHub Pages
- Handles concurrent deployments safely

## Configuration Files

- **next.config.mjs**: Configured with `output: 'export'` for static export
- **public/CNAME**: Contains the custom domain `jett.io`
- **public/.nojekyll**: Tells GitHub Pages not to use Jekyll processing

## Troubleshooting

### Build Fails

- Check the Actions tab for error logs
- Test the build locally: `npm run build`
- Ensure all dependencies are in `package.json`

### Pages Not Updating

- Check Actions tab to see if deployment completed successfully
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Wait a few minutes for CDN to update

### 404 Errors

- Ensure `trailingSlash: true` is set in `next.config.mjs`
- Check that all links in your site use correct paths
- Verify that the `/out` directory contains all expected files

### Custom Domain Not Working

- Verify DNS settings at your domain registrar
- Check that CNAME file exists in `/public/CNAME`
- Ensure "Custom domain" is set in GitHub Pages settings
- Wait for DNS propagation (up to 24 hours)

## Performance

The site is optimized for GitHub Pages:
- Static HTML export (no server required)
- Images set to `unoptimized: true`
- No runtime API dependencies
- Fast loading times

## Monitoring

- View deployment status: **Actions** tab in GitHub
- Check live site: https://jett.io
- Monitor build times and identify any issues early

