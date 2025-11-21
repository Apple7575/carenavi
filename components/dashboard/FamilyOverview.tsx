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
    <Card>
      <CardHeader>
        <CardTitle>가족 구성원</CardTitle>
        <CardDescription>
          총 {members.length}명의 건강 상태
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt={member.user.full_name} />
                  <AvatarFallback>
                    {getInitials(member.user.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {member.user.full_name}
                  </p>
                  <p className="text-sm text-gray-500">{member.relationship}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {member.health_score}점
                  </p>
                  <p className="text-xs text-gray-500">건강 점수</p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`}
                  />
                  <span className="text-xs text-gray-600">
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
