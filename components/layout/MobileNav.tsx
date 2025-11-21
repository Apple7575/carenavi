'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Home, Users, Pill, Activity, CheckSquare } from 'lucide-react';

const navigation = [
  {
    name: '홈',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: '가족',
    href: '/family',
    icon: Users,
  },
  {
    name: '복약',
    href: '/medications',
    icon: Pill,
  },
  {
    name: '건강',
    href: '/vitals',
    icon: Activity,
  },
  {
    name: '할일',
    href: '/tasks',
    icon: CheckSquare,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background border-t border-border">
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1',
                'transition-colors duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-900'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5',
                  isActive ? 'text-primary' : 'text-gray-400'
                )}
              />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
