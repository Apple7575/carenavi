import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>CareNavi</CardTitle>
          <CardDescription>가족 건강 관리 플랫폼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            부모님과 가족의 건강을 체계적으로 관리하세요.
          </p>
          <div className="flex gap-2">
            <Button className="w-full">시작하기</Button>
            <Button variant="outline" className="w-full">
              로그인
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
