import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Users, Pill, CheckSquare, Package, Heart } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Activity,
      title: '건강 지표 추적',
      description: '혈압, 혈당, 체중 등을 기록하고 추이를 확인하세요',
    },
    {
      icon: Pill,
      title: '복약 관리',
      description: '복약 일정을 등록하고 알림을 받아보세요',
    },
    {
      icon: Users,
      title: '가족 공유',
      description: '가족 구성원을 초대하여 함께 건강을 관리하세요',
    },
    {
      icon: CheckSquare,
      title: '할 일 관리',
      description: '검진, 운동 등 건강 관련 할 일을 체계적으로 관리하세요',
    },
    {
      icon: Package,
      title: '제품 재고',
      description: '의료용품과 생필품의 재고를 추적하세요',
    },
    {
      icon: Heart,
      title: '건강 점수',
      description: '가족 구성원의 건강 상태를 한눈에 파악하세요',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900">CareNavi</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">가족 건강 관리 플랫폼</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            부모님과 가족의 건강을 체계적으로 관리하고,
            <br />
            더 건강한 내일을 준비하세요
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                대시보드 시작하기
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8">
                로그인
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary-50">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-gray-500 text-sm">
          <p>© 2025 CareNavi. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
