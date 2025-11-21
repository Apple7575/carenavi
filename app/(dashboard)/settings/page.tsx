'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-500 mt-1">계정 및 앱 설정을 관리하세요</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>프로필 설정</CardTitle>
            </div>
            <CardDescription>개인 정보를 업데이트하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="hong@example.com" disabled />
            </div>
            <Button>저장</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>알림 설정</CardTitle>
            </div>
            <CardDescription>알림 수신 설정을 변경하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">복약 알림</p>
                <p className="text-sm text-gray-500">복약 시간에 알림을 받습니다</p>
              </div>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">건강 지표 알림</p>
                <p className="text-sm text-gray-500">건강 지표 기록 알림</p>
              </div>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">할 일 알림</p>
                <p className="text-sm text-gray-500">마감일 전 알림을 받습니다</p>
              </div>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
            <Button>저장</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>보안 설정</CardTitle>
            </div>
            <CardDescription>비밀번호를 변경하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">현재 비밀번호</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">새 비밀번호</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">비밀번호 확인</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>비밀번호 변경</Button>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>테마 설정</CardTitle>
            </div>
            <CardDescription>앱 테마를 선택하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="radio" name="theme" id="light" defaultChecked />
                <Label htmlFor="light" className="cursor-pointer">라이트 모드</Label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="theme" id="dark" />
                <Label htmlFor="dark" className="cursor-pointer">다크 모드</Label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="theme" id="system" />
                <Label htmlFor="system" className="cursor-pointer">시스템 설정 따르기</Label>
              </div>
            </div>
            <Button>저장</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
