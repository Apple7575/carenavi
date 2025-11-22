import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  relationship: string;
  health_score: number;
  status: 'good' | 'fair' | 'needs_review';
  user: {
    full_name: string;
    email: string;
  };
}

interface FamilyOverviewProps {
  members: FamilyMember[];
}

export function FamilyOverview({ members }: FamilyOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-success';
      case 'fair':
        return 'bg-warning';
      case 'needs_review':
        return 'bg-error';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good':
        return '양호';
      case 'fair':
        return '보통';
      case 'needs_review':
        return '주의 필요';
      default:
        return '알 수 없음';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (members.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>가족 구성원</CardTitle>
          <CardDescription>등록된 가족 구성원의 건강 상태를 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Users}
            title="등록된 가족이 없습니다"
            description="가족을 초대하여 건강을 함께 관리하세요"
            actionLabel="가족 초대하기"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <CardTitle className="text-lg">가족 구성원</CardTitle>
        <CardDescription className="text-gray-600">
          총 {members.length}명의 건강 상태
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 hover:border-blue-200 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                  <AvatarImage src="" alt={member.user.full_name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                    {getInitials(member.user.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    {member.user.full_name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                    <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                    {member.relationship}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {member.health_score}점
                  </p>
                  <p className="text-xs text-gray-500">건강 점수</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${getStatusColor(member.status)} shadow-sm`}
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {getStatusText(member.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
