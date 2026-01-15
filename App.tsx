
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { Layout } from './components/Layout.tsx';
import { reinitializeSupabaseClient } from './services/supabaseClient.ts';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Users from './pages/Users.tsx';
import Stores from './pages/Stores.tsx';
import Tasks from './pages/Tasks.tsx';
import SuperAdmin from './pages/SuperAdmin.tsx';
import Settings from './pages/Settings.tsx';

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
    <div className="w-10 h-10 border-4 border-slate-900 dark:border-slate-100 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // 确保 Supabase 客户端使用最新配置
    console.log('🚀 App 启动，检查配置...');
    const url = localStorage.getItem('SUPABASE_URL');
    const key = localStorage.getItem('SUPABASE_ANON_KEY');
    console.log('  URL:', url);
    console.log('  Key:', key ? `${key.substring(0, 30)}... (长度: ${key.length})` : '未配置');
    
    reinitializeSupabaseClient();
    
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // 监听 storage 事件（跨标签页同步）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'SUPABASE_URL' || e.key === 'SUPABASE_ANON_KEY') {
        console.log('📡 检测到配置变化，重新初始化客户端');
        reinitializeSupabaseClient();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (isLoggedIn === null) return <LoadingFallback />;

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <HashRouter>
        <Layout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/admin" element={<SuperAdmin />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
