# Vercel部署指南

这个文档指导您如何在Vercel上部署Koala项目。

## 部署步骤

### 1. 创建Git仓库

首先，将项目推送到GitHub、GitLab或Bitbucket：

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. 在Vercel上导入项目

1. 登录您的Vercel账户
2. 点击"Add New Project"
3. 导入您刚才创建的Git仓库
4. **重要**: 设置以下选项:
   - Framework Preset: `Next.js`
   - Root Directory: `/` (项目根目录，由于我们已经有vercel.json配置文件)

### 3. 配置环境变量

在"Environment Variables"部分，添加以下变量:

- `AUTH_SECRET`: 一个安全的随机字符串，用于Next-Auth
- `NEXT_PUBLIC_API_URL`: 指向您后端API的URL

### 4. 部署

点击"Deploy"按钮开始部署过程。

## 故障排除

如果部署失败，请检查:

1. **构建错误**: 查看构建日志中的具体错误消息
2. **依赖问题**: 确保所有依赖项都能正确安装
3. **环境变量**: 确认所有必要的环境变量都已设置
4. **API连接**: 确保`NEXT_PUBLIC_API_URL`指向有效的后端API

## 后端部署

请注意，此指南仅涵盖前端部署。您还需要单独部署后端服务，并确保:

1. 后端API接受来自Vercel域的CORS请求
2. 所有必要的后端环境变量都已配置
3. 前端中的`NEXT_PUBLIC_API_URL`指向正确的后端URL
