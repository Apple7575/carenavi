import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { formatDate } from '@/lib/utils/date';

interface TaskCardProps {
  task: any;
  onEdit: () => void;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-red-100 text-red-700',
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { updateTask, deleteTask, isDeleting } = useTasks();

  const handleToggle = (checked: boolean) => {
    updateTask({
      id: task.id,
      status: checked ? 'completed' : 'pending',
      completed_at: checked ? new Date().toISOString() : undefined,
    });
  };

  const handleDelete = () => {
    if (confirm('이 할 일을 삭제하시겠습니까?')) {
      deleteTask(task.id);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={handleToggle}
            className="mt-1"
          />
          <div className="flex-1">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {task.family_member.user.full_name}
            </p>
          </div>
          <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
            {task.priority === 'low' ? '낮음' : task.priority === 'medium' ? '보통' : '높음'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          {formatDate(task.due_date, 'long')}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-error hover:text-error"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
