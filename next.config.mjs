/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Use basePath for GitHub Pages repository deployment
  // Remove this line once custom domain (jett.io) is configured
  basePath: '/jett-io',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
