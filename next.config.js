/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/instagram-dummy-ui',
    assetPrefix: '/instagram-dummy-ui/',
    images:{
      unoptimized: true,
    }
  };
  
  module.exports = nextConfig;
  