/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
    unoptimized: true, // Added for local images
  },
  // حل مشاكل الصلاحيات مع OneDrive
  distDir: '.next',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // تجنب مشاكل OneDrive
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
  // SEO and Performance
  compress: true,
  poweredByHeader: false,
  // Output configuration for static export (if needed)
  // output: 'standalone',
}

module.exports = nextConfig


