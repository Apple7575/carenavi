# Implementation Plan: 가족 건강 관리 웹 플랫폼

**Branch**: `master` | **Date**: 2025-11-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-family-health-platform/spec.md`

## Summary

CareNavi는 40대 자녀가 부모님과 가족 구성원의 건강을 관리할 수 있는 웹 플랫폼입니다. 대시보드에서 약물 복용, 바이탈 측정 현황을 한눈에 확인하고, 복용 준수율과 건강 지표 추세를 시각화하여 가족 건강을 체계적으로 관리합니다.

**기술 접근**: Next.js 14 App Router로 구축된 풀스택 웹 애플리케이션으로, Supabase를 백엔드로 사용하여 인증, 데이터베이스, 실시간 동기화를 처리합니다. React Query로 서버 상태를 관리하고, Shadcn/UI로 접근성 높은 UI를 구성하며, Recharts로 건강 데이터를 시각화합니다.

## Technical Context

**Language/Version**: TypeScript 5.3+, Node.js 20+
**Framework**: Next.js 14.2+ (App Router, React 18+, Server Components)
**Primary Dependencies**:
- Supabase Client (@supabase/supabase-js 2.x) - 인증, DB, 스토리지
- TanStack React Query 5.x - 서버 상태 관리, 캐싱
- Shadcn/UI (Radix UI 기반) - UI 컴포넌트
- Lucide React - 아이콘
- Recharts 2.x - 차트 시각화
- Tailwind CSS 3.4+ - 스타일링
- Zod - 스키마 검증

**Storage**: Supabase PostgreSQL (관계형 데이터베이스, Row Level Security 적용)
**Authentication**: Supabase Auth (소셜 로그인: Kakao, Google)
**Testing**: Jest + React Testing Library (유닛/통합 테스트), Playwright (E2E)
**Target Platform**: 웹 브라우저 (Chrome, Safari, Firefox 최신 2개 버전)
**Project Type**: Web (Next.js App Router SSR/CSR 하이브리드)

**Performance Goals**:
- 초기 페이지 로드(LCP): < 2.5초
- 상호작용 지연(FID): < 100ms
- 누적 레이아웃 이동(CLS): < 0.1
- 대시보드 데이터 로드: < 2초
- API 응답 시간: < 500ms (p95)
- 동시 사용자: 1,000명 (초기 목표)

**Constraints**:
- 모바일 최소 지원: iPhone SE (375px 너비)
- 데스크톱 최대 지원: 4K (3840px 너비)
- 브라우저 호환성: ES2020+
- 데이터 보관: 최소 5년 (의료 데이터 표준)
- HIPAA 가이드라인 참고 (완전 준수는 아님)
- 네트워크 필수 (오프라인 모드 없음)

**Scale/Scope**:
- MVP: 6개 주요 화면 (대시보드, 약물, 바이탈, 가족, 리포트, 스토어)
- 예상 사용자: 초기 100명, 6개월 내 1,000명
- 데이터 볼륨: 사용자당 평균 10MB/년
- API 엔드포인트: 약 20개

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: User-Centric Design ✅

- **P1 MVP**: 대시보드 (독립적으로 가치 제공)
- **P2-P6**: 약물 관리 → 바이탈 → 가족 → AI 리포트 → 스토어 (각각 독립 배포 가능)
- 모든 스토리가 Given-When-Then 형식의 수락 시나리오 포함
- **준수**: 명세서에 6개 우선순위별 사용자 스토리 정의됨

### Principle II: Independent Testability ✅

- 각 사용자 스토리마다 "독립 테스트" 섹션 명시
- P1 대시보드만으로 테스트 가능: 더미 데이터로 조회 확인
- P2 약물 관리: 약물 추가 → 복용 체크 → 준수율 확인
- **준수**: 모든 스토리가 독립적으로 검증 가능

### Principle III: Documentation-First ✅

- `spec.md`: 완료 (6개 사용자 스토리, 28개 기능 요구사항)
- `plan.md`: 이 문서 (기술 컨텍스트, 아키텍처)
- `data-model.md`: Phase 1에서 생성 예정
- `contracts/`: Phase 1에서 생성 예정
- **준수**: 모든 필수 문서 계획됨

### Principle IV: Specification Before Implementation ✅

- 명세서 작성 완료 및 품질 체크리스트 통과
- [NEEDS CLARIFICATION] 없음
- 계획 단계 진행 중 (구현 전)
- **준수**: 명세 → 계획 → 구현 순서 준수

### Principle V: Incremental Delivery ✅

- P1 (대시보드)이 독립 실행 가능한 MVP
- P2-P6 각각 독립 배포 가능
- 각 단계마다 체크포인트 존재
- **준수**: 점진적 가치 전달 구조

### Principle VI: Design System Consistency ✅

- Shadcn/UI 컴포넌트 사용 (Radix UI 기반)
- Lucide React 아이콘
- CareNavi 디자인 토큰 (#3B82F6 primary, Tailwind 변수)
- Stitch 참조 디자인 5개 매핑 계획
- **준수**: 헌법 정의 디자인 시스템 사용

### ⚠️ 잠재적 복잡도 증가

**없음** - 모든 원칙 준수, 추가 정당화 불필요

## Project Structure

### Documentation (this feature)

```text
specs/001-family-health-platform/
├── plan.md              # 이 문서 (기술 계획)
├── spec.md              # 기능 명세서 (완료)
├── research.md          # Phase 0: 기술 조사 (생성 예정)
├── data-model.md        # Phase 1: 데이터 모델 (생성 예정)
├── quickstart.md        # Phase 1: 빠른 시작 가이드 (생성 예정)
├── contracts/           # Phase 1: API 계약 (생성 예정)
│   ├── rest-api.yaml    # REST API 스펙 (OpenAPI 3.0)
│   └── types.ts         # TypeScript 타입 정의
├── checklists/
│   └── requirements.md  # 명세서 품질 체크리스트 (완료)
└── tasks.md             # Phase 2: /speckit.tasks로 생성
```

### Source Code (repository root)

Next.js 14 App Router 구조:

```text
carenavi/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 인증 레이아웃 그룹
│   │   ├── login/
│   │   │   └── page.tsx          # 로그인 페이지
│   │   └── callback/
│   │       └── page.tsx          # OAuth 콜백
│   ├── (dashboard)/              # 대시보드 레이아웃 그룹
│   │   ├── layout.tsx            # 사이드바 레이아웃
│   │   ├── page.tsx              # 대시보드 (/)
│   │   ├── medications/
│   │   │   ├── page.tsx          # 약물 관리
│   │   │   └── [id]/
│   │   │       └── page.tsx      # 약물 상세
│   │   ├── vitals/
│   │   │   ├── page.tsx          # 바이탈 추적
│   │   │   └── log/
│   │   │       └── page.tsx      # 바이탈 기록
│   │   ├── family/
│   │   │   ├── page.tsx          # 가족 관리
│   │   │   └── [memberId]/
│   │   │       └── page.tsx      # 구성원 상세
│   │   ├── reports/
│   │   │   ├── page.tsx          # 리포트 목록
│   │   │   └── [reportId]/
│   │   │       └── page.tsx      # 리포트 상세
│   │   └── store/
│   │       ├── page.tsx          # 건강 스토어
│   │       └── [productId]/
│   │           └── page.tsx      # 제품 상세
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   └── route.ts          # 인증 핸들러
│   │   ├── ai/
│   │   │   └── generate-report/
│   │   │       └── route.ts      # AI 리포트 생성
│   │   └── webhooks/
│   │       └── route.ts          # Supabase 웹훅
│   ├── layout.tsx                # 루트 레이아웃
│   ├── globals.css               # 글로벌 스타일 (Tailwind imports)
│   └── providers.tsx             # React Query, Context Providers
│
├── components/                   # React 컴포넌트
│   ├── ui/                       # Shadcn/UI 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── checkbox.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   ├── sheet.tsx             # 모바일 메뉴
│   │   └── ...
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── Sidebar.tsx           # 데스크톱 사이드바
│   │   ├── MobileNav.tsx         # 모바일 네비게이션
│   │   └── Header.tsx            # 헤더
│   ├── dashboard/                # 대시보드 컴포넌트
│   │   ├── TodaysSummary.tsx
│   │   ├── FamilyOverview.tsx
│   │   ├── VitalsChart.tsx
│   │   └── QuickActions.tsx
│   ├── medications/              # 약물 컴포넌트
│   │   ├── MedicationList.tsx
│   │   ├── MedicationCard.tsx
│   │   ├── AddMedicationDialog.tsx
│   │   └── AdherenceCalendar.tsx
│   ├── vitals/                   # 바이탈 컴포넌트
│   │   ├── VitalInput.tsx
│   │   ├── TrendChart.tsx
│   │   └── VitalCard.tsx
│   ├── family/                   # 가족 컴포넌트
│   │   ├── MemberCard.tsx
│   │   ├── AddMemberDialog.tsx
│   │   └── InviteLink.tsx
│   └── shared/                   # 공통 컴포넌트
│       ├── EmptyState.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── lib/                          # 유틸리티, 설정
│   ├── supabase/
│   │   ├── client.ts             # Supabase 클라이언트
│   │   ├── server.ts             # 서버용 클라이언트
│   │   └── middleware.ts         # 인증 미들웨어
│   ├── react-query/
│   │   ├── client.ts             # React Query 설정
│   │   └── hooks.ts              # 커스텀 훅
│   ├── openai/
│   │   └── client.ts             # OpenAI API 클라이언트
│   ├── utils/
│   │   ├── cn.ts                 # className 유틸
│   │   ├── date.ts               # 날짜 포맷팅
│   │   └── validation.ts         # Zod 스키마
│   └── constants.ts              # 상수 정의
│
├── hooks/                        # Custom React Hooks
│   ├── useDashboard.ts
│   ├── useMedications.ts
│   ├── useVitals.ts
│   ├── useFamily.ts
│   └── useAuth.ts
│
├── types/                        # TypeScript 타입
│   ├── database.ts               # Supabase 생성 타입
│   ├── api.ts                    # API 요청/응답 타입
│   └── entities.ts               # 도메인 엔티티 타입
│
├── styles/                       # 스타일
│   └── global.css                # CareNavi 디자인 토큰
│
├── public/                       # 정적 파일
│   ├── images/
│   └── fonts/
│
├── __tests__/                    # 테스트
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── supabase/                     # Supabase 설정
│   ├── migrations/               # DB 마이그레이션
│   └── seed.sql                  # 시드 데이터
│
├── .env.local.example            # 환경 변수 예시
├── next.config.js                # Next.js 설정
├── tailwind.config.js            # CareNavi Tailwind 설정 (기존)
├── tsconfig.json                 # TypeScript 설정
└── package.json                  # 의존성
```

**Structure Decision**: Next.js 14 App Router의 파일 시스템 기반 라우팅을 활용하여 기능별로 명확하게 분리된 구조를 채택합니다. `(auth)`와 `(dashboard)` 라우트 그룹을 사용하여 레이아웃을 분리하고, 컴포넌트는 기능별 디렉토리로 구성하여 유지보수성을 높입니다.

## Complexity Tracking

> **헌법 준수 위반 없음 - 이 섹션 비워둠**

## Phase 0: Research ✅ 완료

**문서**: [research.md](./research.md)

완료된 연구 주제:
- ✅ Next.js 14 App Router 서버/클라이언트 컴포넌트 패턴
- ✅ Supabase Row Level Security 설정 (가족별 데이터 격리)
- ✅ React Query SSR 설정
- ✅ Shadcn/UI 설치 및 테마 커스터마이징
- ✅ Recharts SSR 처리
- ✅ OpenAI GPT-4o-mini API 통합
- ✅ Vercel 배포 최적화
- ✅ Testing 전략 (Jest, RTL, Playwright)
- ✅ Security 고려사항
- ✅ Performance 최적화

## Phase 1: Design & Contracts ✅ 완료

생성 완료:
- ✅ `data-model.md`: 9개 엔티티 정의 완료
  - User, Family, FamilyMember, Medication, MedicationLog, Vital, HealthReport, Product, Task
  - RLS 정책 포함
  - 트리거 및 함수 정의
  - 마이그레이션 순서 명시
- ✅ `contracts/rest-api.yaml`: 22개 API 엔드포인트 (OpenAPI 3.0)
  - Dashboard, Users, Families, Medications, Vitals, Reports, Products, Tasks
- ✅ `contracts/types.ts`: TypeScript 타입 정의
  - 모든 엔티티 타입
  - Request/Response 타입
  - 유틸리티 함수 및 Type Guards
- ✅ `quickstart.md`: 로컬 개발 환경 설정 가이드
  - Supabase 로컬 설정
  - 환경 변수 구성
  - 개발 서버 실행
  - 테스트 계정 로그인
  - Troubleshooting

## Next Steps

1. ✅ Phase 0 연구 완료 → `research.md` 생성됨
2. ✅ Phase 1 설계 완료 → `data-model.md`, `contracts/` 생성됨
3. **다음**: `/speckit.tasks` 실행 → `tasks.md` 생성
4. `/speckit.implement` 실행 → 실제 구현 시작
