/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.adjika33.ru'],
  },
  ignorePatterns: [
    'jest.config.js',
    'lib',
    '**/*.tsx',
  ],
}

module.exports = nextConfig
