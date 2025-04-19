import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Firebase token not provided' },
        { status: 400 }
      );
    }

    // 调用后端API，使用Firebase令牌验证用户并获取会话令牌
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/firebase-auth`,
      { firebaseToken: token },
      { withCredentials: true }
    );

    // 如果后端返回了会话令牌，将其设置为Cookie
    if (response.data.token) {
      // 设置身份验证Cookie
      cookies().set({
        name: 'auth_token',
        value: response.data.token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7天
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Failed to authenticate with backend' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Firebase login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
