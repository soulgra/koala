/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 避免API路由
  trailingSlash: true,
  // 简化配置
  reactStrictMode: true,
};

module.exports = nextConfig;
