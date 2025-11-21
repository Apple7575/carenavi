# Quick Start: CareNavi 로컬 개발 환경 설정

**Feature**: 001-family-health-platform
**Date**: 2025-11-21
**Estimated Time**: 30-45 minutes

이 가이드는 CareNavi 프로젝트를 로컬 환경에서 실행하기 위한 단계별 설정 방법을 설명합니다.

## Prerequisites

다음 도구가 설치되어 있어야 합니다:

- **Node.js**: 20.x 이상 ([다운로드](https://nodejs.org/))
- **npm**: 10.x 이상 (Node.js와 함께 설치됨)
- **Git**: 최신 버전 ([다운로드](https://git-scm.com/))
- **Supabase CLI**: 최신 버전 ([설치 가이드](https://supabase.com/docs/guides/cli))

확인:
```bash
node --version  # v20.0.0 이상
npm --version   # v10.0.0 이상
git --version   # 최신 버전
supabase --version  # 최신 버전
```

## Step 1: 프로젝트 클론

```bash
# 저장소 클론
git clone https://github.com/YOUR_ORG/carenavi.git
cd carenavi

# 의존성 설치
npm install
```

## Step 2: Supabase 로컬 환경 설정

### 2.1 Supabase 로컬 인스턴스 시작

```bash
# Docker가 실행 중인지 확인
docker --version

# Supabase 로컬 환경 시작 (처음 실행 시 Docker 이미지 다운로드)
supabase start
```

실행 결과에서 다음 정보를 확인하고 메모하세요:
```
API URL: http://localhost:54321
GraphQL URL: http://localhost:54321/graphql/v1
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
Inbucket URL: http://localhost:54324
JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.2 데이터베이스 마이그레이션 실행

```bash
# 마이그레이션 실행 (테이블 생성)
supabase db reset

# 마이그레이션 상태 확인
supabase migration list
```

### 2.3 시드 데이터 삽입

```bash
# 시드 데이터 삽입 (테스트용 사용자, 가족, 약물 등)
supabase db seed
```

## Step 3: 환경 변수 설정

### 3.1 `.env.local` 파일 생성

```bash
# .env.local.example 파일을 복사
cp .env.local.example .env.local
```

### 3.2 환경 변수 편집

`.env.local` 파일을 열고 다음 값을 입력하세요:

```bash
# Supabase (로컬 개발)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Step 2.1에서 확인한 anon key

# OpenAI (AI 리포트 생성)
OPENAI_API_KEY=sk-... # https://platform.openai.com/api-keys 에서 발급

# App 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**중요**: `.env.local` 파일은 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)

## Step 4: Next.js 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

첫 화면에서 다음을 확인:
- ✅ 로그인 페이지가 표시됨
- ✅ "카카오로 시작하기" 버튼이 표시됨 (아직 동작하지 않음)

## Step 5: 테스트 사용자로 로그인

### 5.1 Supabase Studio에서 테스트 사용자 확인

1. [http://localhost:54323](http://localhost:54323) 접속 (Supabase Studio)
2. 왼쪽 메뉴에서 **Authentication** 클릭
3. **Users** 탭에서 시드 데이터로 생성된 사용자 확인

### 5.2 로그인

시드 데이터에 생성된 테스트 계정:
- **Email**: `caregiver@test.com`
- **Password**: `test1234`

로그인 후 대시보드 확인:
- ✅ "안녕하세요, [사용자 이름]님" 인사말
- ✅ 오늘의 할 일 목록
- ✅ 가족 구성원 카드
- ✅ 바이탈 차트 (혈압, 혈당)

## Step 6: 데이터베이스 탐색 (선택 사항)

### Supabase Studio에서 데이터 확인

1. [http://localhost:54323](http://localhost:54323) 접속
2. 왼쪽 메뉴에서 **Table Editor** 클릭
3. 다음 테이블 확인:
   - `users`: 사용자 정보
   - `families`: 가족 그룹
   - `family_members`: 가족 구성원
   - `medications`: 약물
   - `medication_logs`: 복용 기록
   - `vitals`: 바이탈 측정값
   - `health_reports`: 건강 리포트
   - `products`: 건강 제품
   - `tasks`: 할 일

### SQL Editor에서 쿼리 실행

1. 왼쪽 메뉴에서 **SQL Editor** 클릭
2. 다음 쿼리 실행:

```sql
-- 모든 가족 구성원과 건강 점수 조회
SELECT
  fm.nickname,
  fm.health_score,
  fm.status,
  u.full_name,
  u.email
FROM family_members fm
JOIN users u ON fm.user_id = u.id
ORDER BY fm.health_score DESC;
```

## Step 7: 주요 기능 테스트

### 7.1 약물 추가

1. 사이드바에서 **약물 관리** 클릭
2. **약물 추가** 버튼 클릭
3. 다음 정보 입력:
   - 약물명: "비타민 D"
   - 용량: "1000IU"
   - 복용 빈도: "하루 1회"
   - 복용 시간: "08:00"
   - 시작일: 오늘 날짜
4. **저장** 클릭
5. ✅ 약물 목록에 새 약물이 표시됨

### 7.2 약물 복용 체크

1. 약물 목록에서 체크박스 클릭
2. ✅ 체크 표시 및 "복용 완료" 상태 확인
3. 대시보드로 이동
4. ✅ 오늘의 할 일에서 해당 약물이 완료 처리됨

### 7.3 바이탈 측정값 추가

1. 사이드바에서 **바이탈 추적** 클릭
2. **바이탈 기록** 버튼 클릭
3. 혈압 입력:
   - 유형: 혈압
   - 수축기: 122
   - 이완기: 80
   - 측정 시각: 현재 시각
4. **저장** 클릭
5. ✅ 차트에 새 데이터 포인트 표시

### 7.4 AI 리포트 생성

1. 사이드바에서 **AI 리포트** 클릭
2. **리포트 생성** 버튼 클릭
3. 가족 구성원 선택
4. 기간 선택 (최근 30일)
5. **생성** 클릭
6. ✅ 로딩 인디케이터 표시
7. ✅ 리포트 생성 완료 후 상세 페이지 이동

## Troubleshooting

### 문제 1: Supabase 시작 실패

**증상**: `supabase start` 실행 시 에러

**해결**:
```bash
# Docker가 실행 중인지 확인
docker ps

# Supabase 중지 후 재시작
supabase stop
supabase start
```

### 문제 2: 마이그레이션 실패

**증상**: `supabase db reset` 실행 시 에러

**해결**:
```bash
# Supabase 완전히 중지
supabase stop --no-backup

# 볼륨 삭제 후 재시작
docker volume prune -f
supabase start
supabase db reset
```

### 문제 3: Next.js 빌드 에러

**증상**: `npm run dev` 실행 시 TypeScript 에러

**해결**:
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# TypeScript 캐시 삭제
rm -rf .next
npm run dev
```

### 문제 4: 환경 변수 인식 안 됨

**증상**: "Supabase URL is not defined" 에러

**해결**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일 내용이 올바른지 확인
3. Next.js 개발 서버 재시작:
```bash
# Ctrl+C로 서버 중지 후
npm run dev
```

### 문제 5: OpenAI API 키 에러

**증상**: AI 리포트 생성 시 "Invalid API key" 에러

**해결**:
1. [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) 접속
2. 새 API 키 생성
3. `.env.local`의 `OPENAI_API_KEY` 업데이트
4. Next.js 서버 재시작

## 다음 단계

로컬 환경 설정이 완료되었습니다! 이제 다음을 진행할 수 있습니다:

### 개발자를 위한 리소스

1. **아키텍처 이해**:
   - [plan.md](./plan.md): 기술 스택 및 프로젝트 구조
   - [data-model.md](./data-model.md): 데이터베이스 스키마
   - [contracts/rest-api.yaml](./contracts/rest-api.yaml): API 명세

2. **코드 탐색**:
   - `app/(dashboard)/page.tsx`: 대시보드 페이지 (P1 MVP)
   - `components/dashboard/`: 대시보드 컴포넌트
   - `lib/supabase/client.ts`: Supabase 클라이언트 설정
   - `hooks/useDashboard.ts`: 대시보드 데이터 훅

3. **개발 워크플로우**:
   ```bash
   # 새 기능 개발
   git checkout -b feature/new-feature

   # 개발
   npm run dev

   # 테스트 실행
   npm run test

   # 빌드 확인
   npm run build

   # 커밋
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

4. **테스트**:
   ```bash
   # 유닛/통합 테스트
   npm run test

   # 테스트 커버리지
   npm run test:coverage

   # E2E 테스트 (Playwright)
   npm run test:e2e
   ```

5. **Storybook** (컴포넌트 개발):
   ```bash
   # Storybook 시작
   npm run storybook
   ```

### 디자이너를 위한 리소스

1. **디자인 시스템**:
   - [.specify/design-system/README.md](../../.specify/design-system/README.md)
   - [reference/README.md](../../reference/README.md): Stitch 참조 디자인

2. **CareNavi 디자인 토큰**:
   - Primary: `#3B82F6` (blue-500)
   - Background: `#F9FAFB` (gray-50)
   - Font: Inter 또는 Pretendard

3. **참조 디자인**:
   - `reference/care99_dashboard/`: 대시보드 디자인
   - `reference/care99_medication/`: 약물 관리 디자인
   - `reference/care99_vitals/`: 바이탈 추적 디자인

## 유용한 명령어

```bash
# Supabase
supabase status              # 상태 확인
supabase db reset            # DB 초기화 (마이그레이션 + 시드)
supabase db diff             # 스키마 변경 확인
supabase migration new name  # 새 마이그레이션 생성
supabase gen types typescript # TypeScript 타입 생성

# Next.js
npm run dev                  # 개발 서버
npm run build                # 프로덕션 빌드
npm run start                # 프로덕션 서버
npm run lint                 # ESLint 실행
npm run type-check           # TypeScript 타입 체크

# 테스트
npm run test                 # Jest 테스트
npm run test:watch           # Watch 모드
npm run test:e2e             # Playwright E2E

# 유틸리티
npm run format               # Prettier 포맷팅
npm run clean                # 캐시 삭제
```

## 도움이 필요하신가요?

- **문서**: [spec.md](./spec.md), [plan.md](./plan.md)
- **이슈 리포트**: GitHub Issues
- **슬랙**: #carenavi-dev 채널
- **SpecKit 헌법**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md)

---

**Happy Coding!** 🚀
