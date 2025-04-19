import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware';
import { callService } from '../service/call.service';
import {
  getUserDetails,
  getWalletData,
  signInService,
  signInWithGoogleService,
  signUpService,
  verifyEmail,
} from '../service/user.service';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

userRouter.post('/signup', async (req, res) => {
  return await callService(signUpService, req, res);
});

userRouter.post('/signin', async (req, res) => {
  await callService(signInService, req, res);
});

userRouter.post('/google-signin', async (req, res) => {
  await callService(signInWithGoogleService, req, res);
});

userRouter.post('/verify-email', async (req, res) => {
  await callService(verifyEmail, req, res);
});

userRouter.get('/me', authMiddleware, async (req, res) => {
  await callService(getUserDetails, req, res);
});

userRouter.get('/wallet', authMiddleware, async (req, res) => {
  await callService(getWalletData, req, res);
});

// Firebase身份验证处理程序
const firebaseAuth = async (req: Request, res: Response) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({ error: 'Firebase token is required' });
    }

    // 这里应该添加Firebase Admin SDK的验证逻辑
    // 目前为了测试，我们只返回成功
    console.log('Firebase token received:', firebaseToken);

    // 生成JWT令牌，与普通登录相同
    const token = 'test-token'; // 应该使用JWT签名生成真实令牌

    // 返回JWT令牌
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Firebase authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 添加Firebase验证路由
userRouter.post('/firebase-auth', firebaseAuth);

export default userRouter;
