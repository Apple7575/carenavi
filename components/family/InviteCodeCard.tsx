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
    <div className="relative overflow-hidden flex items-center justify-between p-6 rounded-xl bg-blue-50 border-2 border-blue-200 shadow-lg">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          초대 코드
        </p>
        <p className="text-3xl font-mono font-bold tracking-widest text-blue-600">
          {inviteCode}
        </p>
        <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
          이 코드를 가족에게 공유하여 초대하세요
        </p>
      </div>
      <Button
        variant="outline"
        size="lg"
        onClick={handleCopy}
        className={`ml-4 relative z-10 transition-all duration-200 ${
          copied
            ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
            : 'bg-white hover:bg-blue-50 border-blue-300 hover:border-blue-400'
        }`}
      >
        {copied ? (
          <>
            <Check className="h-5 w-5 mr-2" />
            복사됨!
          </>
        ) : (
          <>
            <Copy className="h-5 w-5 mr-2" />
            복사하기
          </>
        )}
      </Button>
    </div>
  );
}
