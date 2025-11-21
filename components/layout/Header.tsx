'use client';

import * as React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ title, onMenuClick, className }: HeaderProps) {
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
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">알림</span>
          {/* Notification badge */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-error" />
        </Button>
      </div>
    </header>
  );
}
