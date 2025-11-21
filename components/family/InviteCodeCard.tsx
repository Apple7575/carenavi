'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface InviteCodeCardProps {
  inviteCode: string;
}

export function InviteCodeCard({ inviteCode }: InviteCodeCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
      <div>
        <p className="text-sm text-gray-600 mb-1">초대 코드</p>
        <p className="text-2xl font-mono font-bold tracking-wider">{inviteCode}</p>
        <p className="text-xs text-gray-500 mt-1">
          이 코드를 가족에게 공유하여 초대하세요
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="ml-4"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            복사됨
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            복사
          </>
        )}
      </Button>
    </div>
  );
}
