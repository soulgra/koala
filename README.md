# Mamora - Web3 AI助手

**Mamora**是一个基于Koala AI的Web3智能助手，帮助用户与区块链进行交互，提供资产分析和市场洞察。这个项目包含前端(Next.js)和后端(Express)两部分。

## 项目架构 🏗️

项目由以下部分组成:

- **前端**: 使用Next.js构建的React应用，提供用户界面
- **后端**: 使用Express构建的API服务器，处理区块链交互和数据处理

## 功能特点 ✨

- **AI驱动的Web3交互**: 通过AI助手简化区块链操作
- **多链资产分析**: 查看和分析跨多个区块链的加密资产
- **市场洞察**: 获取加密货币市场的最新趋势和分析
- **自动化任务**: 设置自动执行的区块链操作

## 快速开始 🚀

### 安装依赖

项目使用pnpm作为包管理器:

```bash
# 安装全局依赖
pnpm install

# 启动开发环境
pnpm dev
```

这将同时启动前端和后端服务。

### 环境配置

1. 在`frontend`目录中创建`.env.local`文件:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
AUTH_SECRET=your_auth_secret
```

2. 在`server`目录中创建`.env`文件:

```
PORT=5000
JWT_SECRET=your_jwt_secret
# 其他API密钥和配置
```

## 部署指南 🌍

### Vercel部署 (前端)

详细的Vercel部署步骤请参考[VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md)文件。

主要步骤包括:

1. 将代码推送到Git仓库
2. 在Vercel导入项目
3. 配置环境变量
4. 部署

### 后端部署

后端可以部署在任何支持Node.js的平台上，如:

- Heroku
- Railway
- Google Cloud Run
- AWS Elastic Beanstalk

部署后，确保更新前端的`NEXT_PUBLIC_API_URL`环境变量指向后端服务的URL。

## 开发指南 👨‍💻

### 项目结构

```
/
├── frontend/          # Next.js前端应用
│   ├── public/        # 静态资源
│   └── src/           # 源代码
│       ├── app/       # 页面和路由
│       ├── components/# UI组件
│       └── lib/       # 工具和库
├── server/            # Express后端API
│   └── src/           # 源代码
│       ├── controllers/# 控制器
│       ├── models/    # 数据模型
│       └── routes/    # API路由
└── .vercel/           # Vercel配置
```

### 命令说明

```bash
# 开发模式
pnpm dev

# 构建项目
pnpm build

# 生产模式启动
pnpm start:prod

# 完整构建并启动
pnpm prod
```

## 故障排除 🛠️

### 常见问题

1. **环境变量问题**: 确保所有必需的环境变量都已正确设置
2. **构建错误**: 检查Vercel部署日志中的具体错误信息
3. **API连接失败**: 确保前端使用正确的API URL
4. **依赖问题**: 使用`pnpm install --force`强制重新安装依赖

## 贡献指南 🤝

我们欢迎您的贡献! 请遵循以下步骤:

1. Fork此仓库
2. 创建您的特性分支: `git checkout -b feature/amazing-feature`
3. 提交您的更改: `git commit -m 'Add some amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 提交拉取请求

## 许可证 📄

本项目采用MIT许可证 - 详情请见[LICENSE](LICENSE)文件

---

**Mamora** ✨⚡️🌐 — Simplifying Solana interactions, one task at a time! 🌟🌐✨.
