"use client";

import React from 'react';

// 简化的认证包装器，仅用于静态导出
export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
