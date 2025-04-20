# Vercel部署指南

这个文档提供详细指导，帮助您在Vercel上成功部署Mamora项目。

## 部署准备

### 1. 确认配置文件

首先，确保您的项目中有以下配置文件：

- **项目根目录的`vercel.json`**: 配置整个项目的部署设置
- **前端目录的`next.config.js`**: 正确配置Next.js应用

### 2. 后端部署

在部署前端之前，请确保您的后端API已经部署并可访问：

1. 部署后端API到支持Node.js的平台（如Heroku、Railway等）
2. 记录下后端API的URL，您将需要它作为环境变量

### 3. 更新API URL

在项目根目录的`vercel.json`文件中，更新rewrites配置中的后端URL：

```json
"rewrites": [
  {
    "source": "/api/:path*",
    "destination": "https://your-backend-url.com/api/:path*"
  }
]
```

将`https://your-backend-url.com`替换为您实际的后端URL。

## 部署步骤

### 1. 创建Git仓库

将项目推送到GitHub、GitLab或Bitbucket：

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
4. **重要配置**:
   - Framework Preset: 选择`Next.js`
   - Root Directory: 保持为`/`（项目根目录）
   - Build Command: 系统将自动使用vercel.json中的buildCommand
   - Output Directory: 系统将自动使用vercel.json中的outputDirectory
   - Install Command: 保持默认

### 3. 配置环境变量

在Vercel的"Environment Variables"部分，添加以下必要变量:

- `AUTH_SECRET`: 一个安全的随机字符串，用于Next-Auth（可以使用`openssl rand -base64 32`生成）
- `NEXT_PUBLIC_API_URL`: 您后端API的完整URL（例如`https://your-backend-api.com`）
- 其他前端可能需要的环境变量

### 4. 部署

点击"Deploy"按钮开始部署过程。Vercel将:
1. 克隆您的仓库
2. 执行构建命令
3. 部署结果到全球CDN

## 常见问题及解决方案

### 构建失败

如果构建过程失败，检查Vercel的构建日志，常见原因包括：

1. **依赖项冲突**
   - 解决方案: 检查package.json中的依赖版本，更新冲突的依赖

2. **Node.js版本不兼容**
   - 解决方案: 在Vercel项目设置中，指定与您本地开发环境相匹配的Node.js版本

3. **环境变量缺失**
   - 解决方案: 确保所有必要的环境变量都已在Vercel中配置

4. **构建命令错误**
   - 解决方案: 确保vercel.json中的buildCommand正确指向前端目录

### API连接问题

如果前端无法连接到后端API：

1. **CORS错误**
   - 解决方案: 确保后端API允许来自Vercel域名的请求
   - 在后端服务器配置中添加Vercel域名到允许列表

2. **API URL错误**
   - 解决方案: 检查`NEXT_PUBLIC_API_URL`环境变量是否正确
   - 确保rewrites配置正确指向后端服务

3. **代理配置问题**
   - 解决方案: 检查vercel.json中的rewrites规则
   - 确保路径模式正确匹配您的API端点

### 静态资源问题

如果静态资源（图像、CSS等）无法加载：

1. **路径问题**
   - 解决方案: 确保所有静态资源使用相对路径或以`/`开头的绝对路径
   - 更新`next.config.js`中的`basePath`（如果需要）

2. **图像优化问题**
   - 解决方案: 确保`next.config.js`中正确配置了`images.domains`
   - 如果使用外部图像，将其域名添加到允许列表

## 生产环境调整

成功部署后，建议进行以下调整：

1. **设置自定义域名**
   - 在Vercel项目设置中添加您的自定义域名
   - 配置DNS记录指向Vercel

2. **启用分析**
   - 在Vercel控制台中启用Analytics
   - 监控应用性能和使用情况

3. **配置缓存策略**
   - 通过vercel.json中的headers配置适当的缓存策略
   - 优化静态资源的缓存时间

## 持续部署

默认情况下，Vercel会在每次推送到主分支时自动重新部署。您可以:

1. 配置预览部署，用于测试拉取请求
2. 设置部署钩子，与CI/CD系统集成
3. 配置保护规则，限制部署到生产环境的条件

---

如需更多帮助，请参阅[Vercel官方文档](https://vercel.com/docs)或联系项目维护者。
