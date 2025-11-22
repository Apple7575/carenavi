import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill, Activity, UserPlus, Sparkles } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: '복약 기록',
      description: '오늘의 복약을 기록하세요',
      icon: Pill,
      href: '/medications',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
    },
    {
      title: '건강 지표 입력',
      description: '혈압, 혈당 등을 기록하세요',
      icon: Activity,
      href: '/vitals',
      color: 'text-success',
      bgColor: 'bg-green-50',
    },
    {
      title: 'AI 스토어',
      description: 'AI 맞춤 건강 제품 추천',
      icon: Sparkles,
      href: '/store',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: '가족 초대',
      description: '가족을 초대하여 함께 관리하세요',
      icon: UserPlus,
      href: '/family',
      color: 'text-info',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>빠른 작업</CardTitle>
        <CardDescription>자주 사용하는 기능에 빠르게 접근하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <div
                  className="w-full h-auto p-4 flex items-start gap-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <Icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
