# Jett.io

**Engineering Leadership in the Age of AI: Signal Over Noise**

A static Next.js blog focused on engineering leadership, AI, DevOps, Security, and Resilience. Deployed to GitHub Pages with a terminal-green aesthetic.

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

This site automatically deploys to GitHub Pages on every push to `main`. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### One-Time Setup

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Configure custom domain: `jett.io`
4. Update DNS settings at your domain registrar

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
- **Deployment**: GitHub Pages
- **Font**: Inter + JetBrains Mono

## Design System

- **Colors**: Black (#000000), Terminal Green (#00FF41), White
- **Aesthetic**: High contrast, terminal/hacker style
- **Typography**: Clean, scannable, action-oriented

## Contributing

This is a personal blog. For development rules and guidelines, see the repository-specific rules in `.cursorrules` or similar configuration.

## License

All rights reserved.
