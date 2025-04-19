/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 避免API路由
  trailingSlash: true,
  // 移除实验性配置
  reactStrictMode: true,
};

module.exports = nextConfig;
