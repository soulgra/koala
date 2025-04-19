import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// 创建认证上下文
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

// 身份验证提供者组件
export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 监听身份验证状态变化
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      // 根据身份验证状态更新会话Cookie
      if (user) {
        // 用户已登录，获取Firebase令牌并发送到后端
        user.getIdToken().then(token => {
          // 将令牌发送到后端API以验证和创建会话
          fetch('/api/auth/firebase-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
        });
      }
    });

    // 在组件卸载时取消订阅
    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义钩子以使用认证上下文
export const useFirebaseAuth = () => useContext(AuthContext);
