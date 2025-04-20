const { execSync } = require('child_process');
const fs = require('fs');

// 确保环境正确
process.env.NODE_ENV = 'production';

try {
  console.log('🚀 开始构建Next.js应用...');
  
  // 清理旧的构建文件
  if (fs.existsSync('.next')) {
    console.log('删除旧的.next目录...');
    fs.rmSync('.next', { recursive: true, force: true });
  }
  
  // 运行构建命令，不修改配置文件
  console.log('执行Next.js构建...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('✅ 构建完成!');
} catch (error) {
  console.error('❌ 构建失败:', error);
  process.exit(1);
}
