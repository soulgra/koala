import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// 检查JWT必要配置
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in the environment variables.');
}

if (!process.env.FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not set in the environment variables.');
}

// 开发环境下的测试邮件传输器
let transporter: nodemailer.Transporter;

// 如果没有设置邮件凭据，则使用测试账户或控制台输出
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn(
    'Email credentials not set. Using console output for emails in development mode.'
  );

  // 创建一个模拟的邮件传输器，它只会将邮件内容打印到控制台
  transporter = {
    sendMail: async (options: any) => {
      console.log('========== EMAIL WOULD BE SENT ==========');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('Content:', options.html ? '(HTML Content)' : options.text);
      console.log('Verification Link would be included in the email');
      console.log('========================================');
      return { accepted: [options.to], rejected: [] };
    },
  } as any;
} else {
  // 使用实际的邮件传输器
  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Function to create a JWT token
const createVerificationToken = (userId: string): string => {
  return jwt.sign(
    { userId, purpose: 'email_verification' },
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  );
};

// Email template
const verificationEmailTemplate = (
  username: string,
  verificationLink: string
): string => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .header {
      background-color: #000;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #000;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Mamora!</h1>
    </div>
    <div class="content">
      <h2>Hey ${username},</h2>
      <p>Thanks for signing up for Mamora! Please verify your email address to start using our services.</p>
      <p>This link will expire in 8 hours.</p>
      <a href="${verificationLink}" class="button">Verify Email Address</a>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Mamora. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// Send verification email
export const sendVerificationEmail = async (
  email: string,
  username: string,
  userId: string
): Promise<boolean> => {
  const verificationToken = createVerificationToken(userId);
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER
        ? `"Mamora" <${process.env.EMAIL_USER}>`
        : `"Mamora" <no-reply@mamora.app>`,
      to: email,
      subject: 'Verify your Mamora account',
      html: verificationEmailTemplate(username, verificationLink),
    });

    // 如果是开发环境，直接在控制台显示验证链接
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('---------------------------------------------');
      console.log('开发环境验证链接:', verificationLink);
      console.log('复制上面的链接到浏览器以验证账户');
      console.log('---------------------------------------------');
    }

    return true;
  } catch (error) {
    console.error(
      'Failed to send verification email:',
      (error as Error).message
    );
    return false;
  }
};
