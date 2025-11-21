'use client';

import * as React from 'react';
import { Users, UserPlus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFamily } from '@/hooks/useFamily';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { FamilyMemberCard } from '@/components/family/FamilyMemberCard';
import { CreateFamilyDialog } from '@/components/family/CreateFamilyDialog';
import { JoinFamilyDialog } from '@/components/family/JoinFamilyDialog';
import { InviteCodeCard } from '@/components/family/InviteCodeCard';

export default function FamilyPage() {
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = React.useState(false);
  const { data: members, isLoading, error } = useFamily();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="가족 정보를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8 p-6">
        <EmptyState
          icon={Users}
          title="데이터를 불러올 수 없습니다"
          description="잠시 후 다시 시도해 주세요"
        />
      </Card>
    );
  }

  const hasFamily = members && members.length > 0;
  const inviteCode = hasFamily && members[0].family ? members[0].family.invite_code : null;
  const familyName = hasFamily && members[0].family ? members[0].family.name : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">가족 관리</h1>
          <p className="text-gray-500 mt-1">가족 구성원을 초대하고 관리하세요</p>
        </div>
        {!hasFamily && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              가족 참여
            </Button>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Home className="h-4 w-4 mr-2" />
              가족 만들기
            </Button>
          </div>
        )}
      </div>

      {!hasFamily ? (
        <Card className="p-12">
          <EmptyState
            icon={Users}
            title="등록된 가족이 없습니다"
            description="새로운 가족을 만들거나 기존 가족에 참여하세요"
          />
          <div className="flex justify-center gap-3 mt-6">
            <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              가족 참여
            </Button>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Home className="h-4 w-4 mr-2" />
              가족 만들기
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Family Name & Invite Code */}
          <Card>
            <CardHeader>
              <CardTitle>{familyName}</CardTitle>
              <CardDescription>가족 구성원 {members.length}명</CardDescription>
            </CardHeader>
            <CardContent>
              <InviteCodeCard inviteCode={inviteCode!} />
            </CardContent>
          </Card>

          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle>가족 구성원</CardTitle>
              <CardDescription>
                건강 상태와 정보를 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member: any) => (
                  <FamilyMemberCard key={member.id} member={member} />
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Dialogs */}
      <CreateFamilyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <JoinFamilyDialog
        open={joinDialogOpen}
        onOpenChange={setJoinDialogOpen}
      />
    </div>
  );
}
