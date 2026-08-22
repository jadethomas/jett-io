# Jett.io

**Engineering Leadership in the Age of AI: Signal Over Noise**

A static Next.js blog focused on engineering leadership, AI, DevOps, Security, and Resilience. Deployed to Cloudflare Pages.

🌐 **Live Site**: [jett.io](https://jett.io)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The static site will be in /out directory
```

## Deployment

This site automatically deploys to Cloudflare Pages on every push to `main`. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### One-Time Setup

1. Create the Pages project: `wrangler pages project create jett-io --production-branch main`
2. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository secrets
3. Attach the custom domain `jett.io` under Workers & Pages → jett-io → Custom domains
4. Point DNS at Cloudflare (or `CNAME` to `jett-io.pages.dev`)

### Deploy

```bash
git add .
git commit -m "Your changes"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy.

## Project Structure

```
/app          - Next.js App Router pages
/components   - Reusable UI components
/content      - MDX blog posts
/lib          - Utilities and helpers
/public       - Static assets
/styles       - Global styles
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, Static Export)
- **Styling**: Tailwind CSS
- **Content**: MDX for blog posts
- **Deployment**: Cloudflare Pages
- **Font**: Source Sans 3 + JetBrains Mono

## Design System

- **Colors**: Navy (#001632), Amber (#FAA61A), Cyan (#54C0E4), Ink (#F2F5F8)
- **Aesthetic**: Photo-led, warm accents on deep navy
- **Typography**: Clean, scannable, action-oriented

## Contributing

This is a personal blog. For development rules and guidelines, see the repository-specific rules in `.cursorrules` or similar configuration.

## License

All rights reserved.
