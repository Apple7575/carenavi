import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { useFamily } from '@/hooks/useFamily';

interface FamilyMemberCardProps {
  member: any;
}

export function FamilyMemberCard({ member }: FamilyMemberCardProps) {
  const { removeMember, isRemoving } = useFamily();

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-success';
      case 'fair': return 'bg-warning';
      case 'needs_review': return 'bg-error';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return '양호';
      case 'fair': return '보통';
      case 'needs_review': return '주의 필요';
      default: return '알 수 없음';
    }
  };

  const handleRemove = () => {
    if (confirm(`${member.user.full_name}님을 가족에서 제거하시겠습니까?`)) {
      removeMember(member.id);
    }
  };

  const isSelf = member.relationship === 'self';

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{getInitials(member.user.full_name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{member.user.full_name}</h3>
              {isSelf && <Badge variant="outline">본인</Badge>}
            </div>
            <p className="text-sm text-gray-500">{member.relationship}</p>
            <p className="text-xs text-gray-400 mt-1">{member.user.email}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{member.health_score}점</p>
            <div className="flex items-center gap-2 mt-1">
              <div className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`} />
              <span className="text-xs text-gray-600">{getStatusText(member.status)}</span>
            </div>
          </div>

          {!isSelf && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-error hover:text-error"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
