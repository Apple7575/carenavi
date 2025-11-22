'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Home, Users, Pill, Activity, CheckSquare, Package, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: '대시보드',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: '가족 관리',
    href: '/family',
    icon: Users,
  },
  {
    name: '복약 관리',
    href: '/medications',
    icon: Pill,
  },
  {
    name: '건강 지표',
    href: '/vitals',
    icon: Activity,
  },
  {
    name: '할 일',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    name: '제품 관리',
    href: '/products',
    icon: Package,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      className={cn(
        'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col',
        'w-64 bg-white border-r border-gray-200 shadow-sm',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">CareNavi</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-y-7 overflow-y-auto px-4 py-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex gap-x-3 rounded-md px-3 py-2 text-sm font-medium leading-6',
                    'transition-colors duration-200',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Settings & User */}
        <div className="space-y-1">
          <Link
            href="/settings"
            className={cn(
              'group flex gap-x-3 rounded-md px-3 py-2 text-sm font-medium leading-6',
              'text-gray-700 hover:text-primary hover:bg-gray-50',
              'transition-colors duration-200'
            )}
          >
            <Settings className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-primary" />
            설정
          </Link>

          {/* User Profile */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-x-3 px-3 py-2">
              <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback>{user?.email?.[0]?.toUpperCase() || '사'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email?.split('@')[0] || '사용자'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-x-3 px-3 py-2 text-sm text-gray-700 hover:text-primary"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="h-5 w-5 text-gray-400" />
              로그아웃
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
