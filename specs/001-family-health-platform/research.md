# Technical Research: 가족 건강 관리 웹 플랫폼

**Date**: 2025-11-21
**Feature**: 001-family-health-platform
**Purpose**: 기술 스택 선택 근거 및 구현 패턴 조사

## Executive Summary

Next.js 14 App Router + Supabase + React Query 조합으로 가족 건강 관리 플랫폼을 구축합니다. 이 조합은 빠른 개발 속도, 우수한 DX, 그리고 의료 데이터 보안 요구사항을 동시에 만족합니다.

---

## 1. Next.js 14 App Router

### Decision: Next.js 14.2+ with App Router 채택

### Rationale

**선택한 이유**:
1. **서버 컴포넌트 기본 지원**: 초기 로드 속도 개선 (대시보드 SSR)
2. **파일 시스템 라우팅**: 직관적인 프로젝트 구조
3. **내장 API Routes**: 별도 백엔드 서버 불필요
4. **이미지 최적화**: 자동 WebP 변환, Lazy loading
5. **Vercel 완벽 통합**: 원클릭 배포

**Pages Router 대비 장점**:
- 서버/클라이언트 컴포넌트 명확한 분리
- Streaming SSR 지원 (Suspense)
- 레이아웃 중첩 (Layout nesting)
- 더 나은 코드 스플리팅

### Implementation Pattern

```typescript
// app/(dashboard)/layout.tsx - 서버 컴포넌트
export default async function DashboardLayout({ children }: { children: React.Node }) {
  const { data: user } = await getUser(); // 서버에서 실행

  return (
    <div className="flex">
      <Sidebar user={user} />
      <main>{children}</main>
    </div>
  );
}

// app/(dashboard)/page.tsx - 서버 컴포넌트
export default async function DashboardPage() {
  const medications = await getMedications(); // 서버에서 실행

  return (
    <div>
      <TodaysSummary medications={medications} />
      <FamilyOverview /> {/* 클라이언트 컴포넌트 */}
    </div>
  );
}

// components/dashboard/FamilyOverview.tsx - 클라이언트 컴포넌트
'use client';

export function FamilyOverview() {
  const { data } = useQuery({ queryKey: ['family'] }); // 클라이언트에서 실행
  return <div>{/* JSX */}</div>;
}
```

### Best Practices

1. **서버 컴포넌트 우선**: 상태가 없고 SEO가 중요한 컴포넌트는 서버 컴포넌트로
2. **클라이언트 컴포넌트 최소화**: `'use client'` 지시어는 필요한 곳에만
3. **데이터 페칭 위치**:
   - 초기 로드 데이터: 서버 컴포넌트에서
   - 사용자 인터랙션 데이터: React Query로 클라이언트에서
4. **레이아웃 계층**:
   ```
   app/layout.tsx (루트)
   └── app/(dashboard)/layout.tsx (사이드바)
       └── app/(dashboard)/medications/page.tsx
   ```

### Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Vite + React Router | 빠른 HMR, 단순 | SSR 없음, SEO 약함 | 건강 정보 SEO 필요 |
| Next.js Pages Router | 안정적, 문서 많음 | 구식 패턴 | App Router가 미래 |
| Remix | 뛰어난 UX, 네트워크 중심 | 생태계 작음 | Vercel 통합 부족 |

---

## 2. Supabase

### Decision: Supabase (PostgreSQL + Auth + Storage)

### Rationale

**선택한 이유**:
1. **PostgreSQL 기반**: 관계형 DB로 의료 데이터 무결성 보장
2. **Row Level Security (RLS)**: 가족별 데이터 자동 격리
3. **내장 인증**: 소셜 로그인 (Kakao, Google) 쉽게 설정
4. **실시간 구독**: WebSocket으로 약물 복용 알림 등
5. **무료 티어 관대**: 초기 스타트업에 적합

### Database Schema Pattern

```sql
-- 가족별 데이터 격리 (RLS 정책)
CREATE POLICY "Users can only see own family data"
ON medications
FOR SELECT
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);

-- 복합 인덱스 (쿼리 최적화)
CREATE INDEX idx_medications_user_date
ON medication_logs(medication_id, taken_at DESC);

-- 자동 타임스탬프
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON medications
FOR EACH ROW
EXECUTE FUNCTION trigger_set_updated_at();
```

### Authentication Flow

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 소셜 로그인
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${location.origin}/auth/callback`
  }
});
```

### Best Practices

1. **RLS 항상 활성화**: 모든 테이블에 RLS 정책 설정
2. **타입 안전성**: `supabase gen types typescript` 로 자동 생성
3. **서버 vs 클라이언트**:
   - 서버 컴포넌트: `createServerClient`
   - 클라이언트 컴포넌트: `createBrowserClient`
4. **마이그레이션 관리**: `supabase/migrations/` 디렉토리에 버전 관리

### Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Firebase | 구글 생태계, 대규모 | NoSQL, 쿼리 제한 | 관계형 데이터 필요 |
| PlanetScale | 무한 스케일, 브랜치 | 비쌈, ForeignKey 없음 | 복잡도 과다 |
| Prisma + Railway | 유연성 최대 | 인증 직접 구축 | 개발 시간 많이 소요 |

---

## 3. React Query (TanStack Query)

### Decision: TanStack React Query 5.x

### Rationale

**선택한 이유**:
1. **서버 상태 전문**: 캐싱, 동기화, 리페칭 자동화
2. **Optimistic Updates**: 약물 복용 체크 즉시 반영
3. **SSR 지원**: Next.js App Router와 통합 우수
4. **DevTools**: 쿼리 상태 디버깅 쉬움
5. **TypeScript**: 타입 안전성 보장

### Implementation Pattern

```typescript
// lib/react-query/client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      gcTime: 5 * 60 * 1000, // 5분
      refetchOnWindowFocus: false,
    },
  },
});

// hooks/useMedications.ts
export function useMedications(userId: string) {
  return useQuery({
    queryKey: ['medications', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    },
  });
}

// hooks/useToggleMedication.ts
export function useToggleMedication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, taken }: { id: string; taken: boolean }) => {
      const { error } = await supabase
        .from('medication_logs')
        .insert({ medication_id: id, status: taken ? 'taken' : 'skipped' });

      if (error) throw error;
    },
    onMutate: async ({ id, taken }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['medications'] });
      const previous = queryClient.getQueryData(['medications']);

      queryClient.setQueryData(['medications'], (old: any[]) =>
        old.map(m => m.id === id ? { ...m, taken } : m)
      );

      return { previous };
    },
    onError: (err, variables, context) => {
      // 실패 시 롤백
      queryClient.setQueryData(['medications'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}
```

### Best Practices

1. **쿼리 키 계층 구조**:
   ```typescript
   ['medications'] // 모든 약물
   ['medications', userId] // 특정 사용자
   ['medications', userId, 'adherence'] // 준수율
   ```
2. **SSR Hydration**:
   ```typescript
   // app/providers.tsx
   'use client';

   export function Providers({ children }: { children: React.ReactNode }) {
     const [queryClient] = useState(() => new QueryClient());

     return (
       <QueryClientProvider client={queryClient}>
         {children}
       </QueryClientProvider>
     );
   }
   ```
3. **에러 처리**: React Error Boundary와 통합
4. **리페칭 전략**:
   - 대시보드: 30초마다 자동 리페칭
   - 약물 목록: 사용자 액션 후에만
   - 차트 데이터: 1분 캐싱

### Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| SWR | 가볍다, Next.js 팀 제작 | 기능 적음 | Optimistic UI 약함 |
| Zustand | 단순, 작음 | 서버 상태 미흡 | 건강 데이터는 서버 중심 |
| Context API | 내장 | 성능 이슈, 캐싱 없음 | 리렌더링 과다 |

---

## 4. Shadcn/UI

### Decision: Shadcn/UI (Radix UI 기반)

### Rationale

**선택한 이유**:
1. **접근성 (a11y)**: WCAG 2.1 AA 기본 준수 (의료 앱 필수)
2. **커스터마이징**: 코드 복사 방식, 100% 제어 가능
3. **Radix UI 기반**: 안정적인 primitives
4. **CareNavi 디자인 시스템**: Tailwind로 색상 토큰 쉽게 적용
5. **TypeScript**: 타입 안전성

### Installation & Setup

```bash
npx shadcn-ui@latest init

# 필요한 컴포넌트만 설치
npx shadcn-ui@latest add button card input checkbox tabs dialog toast sheet
```

### Customization for CareNavi

```typescript
// components/ui/button.tsx (Shadcn 생성 후 수정)
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-600", // CareNavi primary
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        destructive: "bg-error text-white hover:bg-red-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Component Mapping (Stitch → Shadcn/UI)

| Stitch 참조 | Shadcn/UI 컴포넌트 | 용도 |
|-------------|-------------------|------|
| Card wrapper | Card, CardHeader, CardContent | 모든 섹션 래퍼 |
| Checkbox list | Checkbox | 약물 복용 체크 |
| Avatar + Score | Avatar + Badge | 가족 구성원 |
| Action buttons | Button (variant 다양) | 빠른 액션 |
| Input forms | Input + Label | 데이터 입력 |
| Tabs | Tabs | 약물 관리 탭 |
| Modal | Dialog | 약물 추가 |
| Mobile menu | Sheet | 햄버거 메뉴 |
| Notifications | Toast | 성공/에러 메시지 |

### Best Practices

1. **항상 Shadcn 컴포넌트 사용**: 커스텀 버튼/인풋 만들지 말 것
2. **접근성 속성 보존**: `aria-*` 속성 제거하지 말 것
3. **스타일 확장은 Tailwind로**:
   ```tsx
   <Button className="w-full mt-4">저장</Button>
   ```
4. **아이콘은 Lucide React**:
   ```tsx
   import { Pill, Activity, Users } from 'lucide-react';
   <Button><Pill className="w-4 h-4 mr-2" />약물 추가</Button>
   ```

### Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Material-UI | 성숙함, 많은 컴포넌트 | 무거움, 커스터마이징 어려움 | CareNavi 디자인과 안 맞음 |
| Chakra UI | 접근성 좋음 | 번들 크기 큼 | Tailwind와 충돌 |
| Headless UI | 가벼움 | 스타일 없음 | Shadcn이 더 완성도 높음 |

---

## 5. Recharts

### Decision: Recharts 2.x

### Rationale

**선택한 이유**:
1. **React 네이티브**: JSX로 차트 구성
2. **반응형**: 컨테이너 크기 자동 감지
3. **커스터마이징**: CareNavi 색상 쉽게 적용
4. **SSR 지원**: Next.js와 호환
5. **경량**: 번들 크기 적당 (~50KB gzipped)

### Implementation Pattern

```typescript
// components/dashboard/VitalsChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function VitalsChart({ data }: { data: VitalData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="date"
          stroke="#6B7280"
          style={{ fontSize: 12 }}
        />
        <YAxis stroke="#6B7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem'
          }}
        />
        <Line
          type="monotone"
          dataKey="systolic"
          stroke="#3B82F6"  // CareNavi primary
          strokeWidth={2}
          name="수축기"
        />
        <Line
          type="monotone"
          dataKey="diastolic"
          stroke="#10B981"  // success green
          strokeWidth={2}
          name="이완기"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Color Coding for Health Data

```typescript
// lib/utils/vitals.ts
export function getBloodPressureColor(systolic: number, diastolic: number) {
  if (systolic >= 140 || diastolic >= 90) {
    return '#EF4444'; // error - 고혈압
  } else if (systolic >= 130 || diastolic >= 85) {
    return '#F59E0B'; // warning - 주의
  } else {
    return '#10B981'; // success - 정상
  }
}
```

### Best Practices

1. **항상 ResponsiveContainer 사용**: 반응형 필수
2. **SSR 처리**:
   ```tsx
   import dynamic from 'next/dynamic';

   const VitalsChart = dynamic(() => import('./VitalsChart'), {
     ssr: false, // 차트는 클라이언트에서만 렌더링
   });
   ```
3. **데이터 포맷**: 날짜는 YYYY-MM-DD 형식으로 정규화
4. **성능 최적화**: 최근 90일 데이터만 표시 (pagination)

### Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Chart.js | 많은 차트 유형 | React 통합 어색함 | JSX 없음 |
| Victory | 애니메이션 좋음 | 무거움 | 번들 크기 |
| D3.js | 완전한 제어 | 학습 곡선 가파름 | 오버엔지니어링 |

---

## 6. OpenAI GPT-4o-mini

### Decision: GPT-4o-mini for AI Health Reports

### Rationale

**선택한 이유**:
1. **비용 효율적**: GPT-4보다 15배 저렴 ($0.15 / 1M input tokens)
2. **충분한 품질**: 구조화된 리포트 생성에 적합
3. **빠른 응답**: 평균 2초 이내
4. **한국어 지원**: 의료 용어 번역 우수
5. **128K 컨텍스트**: 3개월 건강 데이터 한 번에 처리

### Implementation Pattern

```typescript
// app/api/ai/generate-report/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { familyId, month } = await request.json();

  // Supabase에서 건강 데이터 가져오기
  const vitals = await getVitals(familyId, month);
  const medications = await getMedications(familyId, month);

  const prompt = `
당신은 가정의학과 전문의입니다. 다음 가족의 건강 데이터를 분석하여 월간 리포트를 작성해주세요.

## 바이탈 데이터
${JSON.stringify(vitals, null, 2)}

## 약물 복용 기록
${JSON.stringify(medications, null, 2)}

다음 형식으로 작성:
1. 요약 (3-4문장)
2. 구성원별 분석
3. 개선 권장사항
4. 다음 달 목표

의료 전문 용어는 이해하기 쉽게 설명해주세요.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return Response.json({
    report: completion.choices[0].message.content
  });
}
```

### Prompt Engineering Best Practices

1. **구조화된 프롬프트**: 명확한 섹션 구분
2. **예시 제공**: Few-shot learning으로 품질 향상
3. **온도 설정**: 0.7 (창의적이지만 안정적)
4. **토큰 제한**: 2000 (약 1500 단어, 리포트에 충분)

### Cost Estimation

```
월간 리포트 1개:
- Input: ~2,000 tokens (건강 데이터) = $0.0003
- Output: ~2,000 tokens (리포트) = $0.0006
- Total per report: ~$0.001

1,000 사용자 x 월 1회 = $1/월
```

### Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| GPT-4 | 최고 품질 | 비쌈 ($30/1M tokens) | 비용 부담 |
| Claude 3 Haiku | 빠름, 저렴 | API 접근성 | OpenAI 더 안정적 |
| Gemini Pro | 무료 | 품질 낮음 | 의료 용어 오류 |

---

## 7. Deployment & DevOps

### Decision: Vercel for Deployment

### Rationale

**선택한 이유**:
1. **Next.js 최적화**: 자동 캐싱, Edge Functions
2. **원클릭 배포**: GitHub 연동 자동 배포
3. **프리뷰 배포**: PR마다 미리보기 URL
4. **환경 변수**: UI로 쉽게 관리
5. **CDN**: 전세계 Edge Network

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
```

### Environment Variables

```bash
# .env.local.example
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx... # 서버 전용

# OpenAI
OPENAI_API_KEY=sk-xxx

# Next.js
NEXT_PUBLIC_APP_URL=https://carenavi.vercel.app
```

### Performance Monitoring

- **Vercel Analytics**: 코어 웹 바이탈 자동 수집
- **Sentry**: 에러 추적 (선택사항)
- **PostHog**: 사용자 행동 분석 (선택사항)

### Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Netlify | 관대한 무료 티어 | Next.js 최적화 약함 | ISR 제한 |
| AWS Amplify | 스케일링 우수 | 설정 복잡 | DX 나쁨 |
| Railway | 간단함 | Next.js 전문성 부족 | 비쌈 |

---

## 8. Testing Strategy

### Decision: Jest + React Testing Library + Playwright

### Rationale

**선택한 이유**:
1. **Jest**: React 표준, 빠름
2. **RTL**: 사용자 관점 테스트
3. **Playwright**: 크로스 브라우저 E2E

### Test Pyramid

```
       /\
      /  \     E2E (10%)
     /    \    Playwright
    /------\
   /        \  Integration (30%)
  /          \ Jest + RTL
 /------------\
/              \ Unit (60%)
----------------  Jest
```

### Example Tests

```typescript
// __tests__/unit/useMedications.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useMedications } from '@/hooks/useMedications';

test('useMedications fetches data', async () => {
  const { result } = renderHook(() => useMedications('user-123'));

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toHaveLength(3);
});

// __tests__/integration/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(dashboard)/page';

test('renders today summary', async () => {
  render(<DashboardPage />);

  expect(await screen.findByText("오늘의 할 일")).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});

// __tests__/e2e/medication-flow.spec.ts
import { test, expect } from '@playwright/test';

test('add medication flow', async ({ page }) => {
  await page.goto('/medications');
  await page.click('button:has-text("약물 추가")');

  await page.fill('input[name="name"]', '아스피린');
  await page.fill('input[name="dosage"]', '100mg');
  await page.click('button:has-text("저장")');

  await expect(page.locator('text=아스피린')).toBeVisible();
});
```

---

## 9. Security Considerations

### Authentication Security

1. **Row Level Security (RLS)**: 모든 테이블에 적용
2. **HTTPS Only**: Supabase, Vercel 모두 기본 HTTPS
3. **JWT Tokens**: 짧은 만료 시간 (1시간)
4. **CSRF Protection**: Next.js 미들웨어에서 처리

### Data Privacy

1. **HIPAA 가이드라인 참고** (완전 준수 아님):
   - 데이터 암호화 (at rest, in transit)
   - 접근 로그 기록
   - 정기 백업 (Supabase 자동)
2. **개인정보 최소 수집**: 필수 정보만
3. **데이터 보관 기간**: 5년 (사용자 삭제 요청 시 즉시 삭제)

### Input Validation

```typescript
// lib/utils/validation.ts
import { z } from 'zod';

export const medicationSchema = z.object({
  name: z.string().min(1, '약물 이름을 입력하세요').max(100),
  dosage: z.string().min(1, '복용량을 입력하세요'),
  times: z.array(z.string()).min(1, '복용 시간을 선택하세요'),
  days: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])),
});

export const vitalSchema = z.object({
  type: z.enum(['blood_pressure', 'blood_sugar', 'weight']),
  systolic: z.number().min(50).max(300).optional(),
  diastolic: z.number().min(30).max(200).optional(),
  value: z.number().positive(),
  unit: z.string(),
});
```

---

## 10. Performance Optimization

### Bundle Size Optimization

1. **Dynamic Imports**:
   ```typescript
   const ReportPDF = dynamic(() => import('./ReportPDF'), { ssr: false });
   ```
2. **Tree Shaking**: ESM imports만 사용
3. **Image Optimization**: Next.js Image 컴포넌트
4. **Code Splitting**: Route 기반 자동 분할

### Caching Strategy

```typescript
// Next.js 캐싱
export const revalidate = 300; // 5분

// React Query 캐싱
staleTime: 60 * 1000, // 1분
gcTime: 5 * 60 * 1000, // 5분

// Supabase 캐싱
// RLS로 인해 서버 사이드 캐싱 제한적, React Query에 의존
```

### Database Optimization

1. **인덱스**: 자주 조회하는 컬럼에 인덱스
2. **Pagination**: 무한 스크롤 대신 페이지네이션
3. **Select 최적화**: 필요한 컬럼만 조회
4. **Join 최소화**: 필요시에만 JOIN, 대부분 개별 쿼리

---

## Conclusion

선택된 기술 스택 (Next.js 14 + Supabase + React Query + Shadcn/UI + Recharts + GPT-4o-mini + Vercel)은 다음을 만족합니다:

✅ **빠른 개발**: Supabase로 백엔드 시간 단축
✅ **우수한 DX**: TypeScript + React Query + Shadcn/UI
✅ **성능**: SSR + 캐싱 + CDN
✅ **보안**: RLS + 인증 + 입력 검증
✅ **비용 효율**: 무료 티어로 초기 운영 가능
✅ **확장성**: Vercel + Supabase 스케일링 지원

**Next Phase**: Phase 1 - 데이터 모델 및 API 계약 설계
