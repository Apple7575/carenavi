'use client';

import * as React from 'react';
import { Bell, Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ title, onMenuClick, className }: HeaderProps) {
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
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4',
        'border-b border-border bg-background px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {/* Mobile menu button */}
      {onMenuClick && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      )}

      {/* Title */}
      {title && (
        <h1 className="flex-1 text-lg font-semibold text-gray-900 lg:text-xl">
          {title}
        </h1>
      )}

      {/* Spacer when no title */}
      {!title && <div className="flex-1" />}

      {/* Actions */}
      <div className="flex items-center gap-x-2">
        {/* User info */}
        {user && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">알림</span>
          {/* Notification badge */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-error" />
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="로그아웃"
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">로그아웃</span>
        </Button>
      </div>
    </header>
  );
}
