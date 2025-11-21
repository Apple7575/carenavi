'use client';

import * as React from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTasks } from '@/hooks/useTasks';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskDialog } from '@/components/tasks/TaskDialog';

export default function TasksPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<any>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all');

  const { data: tasks, isLoading, error } = useTasks(
    selectedStatus === 'all' ? undefined : selectedStatus
  );

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="할 일을 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8 p-6">
        <EmptyState
          icon={CheckSquare}
          title="데이터를 불러올 수 없습니다"
          description="잠시 후 다시 시도해 주세요"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">할 일</h1>
          <p className="text-gray-500 mt-1">가족 구성원의 할 일을 관리하세요</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          할 일 추가
        </Button>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="pending">대기중</TabsTrigger>
          <TabsTrigger value="in_progress">진행중</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus}>
          {!tasks || tasks.length === 0 ? (
            <Card className="p-12">
              <EmptyState
                icon={CheckSquare}
                title="등록된 할 일이 없습니다"
                description="할 일을 추가하여 관리를 시작하세요"
                actionLabel="할 일 추가하기"
                onAction={() => setIsDialogOpen(true)}
              />
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task: any) => (
                <TaskCard key={task.id} task={task} onEdit={() => handleEdit(task)} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={handleClose}
        task={selectedTask}
      />
    </div>
  );
}
