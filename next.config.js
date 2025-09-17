/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable dynamic API routes for Google Places integration
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
