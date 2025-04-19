#!/bin/bash

# 显示当前目录和环境
echo "Current directory: $(pwd)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 安装依赖
echo "Installing dependencies..."
npm install --legacy-peer-deps

# 构建Next.js应用
echo "Building Next.js application..."
npm run build

# 验证构建输出
echo "Verifying build output..."
ls -la .next/

echo "Build completed"
