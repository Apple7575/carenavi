'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFamily } from '@/hooks/useFamily';

interface JoinFamilyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinFamilyDialog({ open, onOpenChange }: JoinFamilyDialogProps) {
  const { joinFamily, isJoining, joinError } = useFamily();
  const [inviteCode, setInviteCode] = React.useState('');
  const [relationship, setRelationship] = React.useState('family');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinFamily({ invite_code: inviteCode, relationship });
    if (!joinError) {
      onOpenChange(false);
      setInviteCode('');
      setRelationship('family');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>가족 참여하기</DialogTitle>
          <DialogDescription>
            초대 코드를 입력하여 기존 가족에 참여하세요
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite_code">초대 코드 *</Label>
            <Input
              id="invite_code"
              placeholder="8자리 코드 입력"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              maxLength={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">관계 *</Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger id="relationship">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">부모</SelectItem>
                <SelectItem value="child">자녀</SelectItem>
                <SelectItem value="spouse">배우자</SelectItem>
                <SelectItem value="sibling">형제/자매</SelectItem>
                <SelectItem value="grandparent">조부모</SelectItem>
                <SelectItem value="family">가족</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {joinError && (
            <p className="text-sm text-error">{joinError.message}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isJoining}>
              참여하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
