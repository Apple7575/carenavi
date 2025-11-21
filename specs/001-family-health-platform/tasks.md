# Tasks: 가족 건강 관리 웹 플랫폼

**Input**: Design documents from `/specs/001-family-health-platform/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/rest-api.yaml, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Based on plan.md, this is a Next.js 14 App Router project:
- **App routes**: `app/`
- **Components**: `components/`
- **Libraries**: `lib/`
- **Hooks**: `hooks/`
- **Types**: `types/`
- **Styles**: `styles/`
- **Database**: `supabase/`
- **Tests**: `__tests__/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 14 project with TypeScript and App Router in root directory
- [ ] T002 [P] Install core dependencies: @supabase/supabase-js, @tanstack/react-query, zod, tailwindcss
- [ ] T003 [P] Install UI dependencies: @radix-ui/react-*, lucide-react, recharts
- [ ] T004 [P] Configure Tailwind CSS with CareNavi design tokens in tailwind.config.js
- [ ] T005 [P] Create global styles with CSS custom properties in styles/global.css
- [ ] T006 [P] Configure ESLint and Prettier in .eslintrc.json and .prettierrc
- [ ] T007 [P] Setup TypeScript configuration in tsconfig.json
- [ ] T008 Create Next.js config with environment variables in next.config.js
- [ ] T009 Create .env.local.example with required environment variable templates
- [ ] T010 [P] Setup project structure: Create directories for components/, lib/, hooks/, types/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Database & Backend Setup

- [ ] T011 Initialize Supabase local development environment with supabase init
- [ ] T012 Create migration for users table in supabase/migrations/001_create_users.sql
- [ ] T013 Create migration for families table in supabase/migrations/002_create_families.sql
- [ ] T014 Create migration for family_members table in supabase/migrations/003_create_family_members.sql
- [ ] T015 Create migration for medications table in supabase/migrations/004_create_medications.sql
- [ ] T016 Create migration for medication_logs table in supabase/migrations/005_create_medication_logs.sql
- [ ] T017 Create migration for vitals table in supabase/migrations/006_create_vitals.sql
- [ ] T018 Create migration for health_reports table in supabase/migrations/007_create_health_reports.sql
- [ ] T019 Create migration for products table in supabase/migrations/008_create_products.sql
- [ ] T020 Create migration for tasks table in supabase/migrations/009_create_tasks.sql
- [ ] T021 Create database triggers and functions in supabase/migrations/010_create_triggers.sql
- [ ] T022 Create Row Level Security (RLS) policies for all tables in supabase/migrations/011_create_rls_policies.sql
- [ ] T023 Create seed data for testing in supabase/seed.sql
- [ ] T024 Run database migrations with supabase db reset

### Authentication & Core Services

- [ ] T025 [P] Create Supabase client for browser in lib/supabase/client.ts
- [ ] T026 [P] Create Supabase client for server components in lib/supabase/server.ts
- [ ] T027 [P] Create authentication middleware in lib/supabase/middleware.ts
- [ ] T028 Configure Supabase Auth providers (Kakao, Google) in Supabase Dashboard
- [ ] T029 [P] Create React Query client configuration in lib/react-query/client.ts
- [ ] T030 [P] Create React Query custom hooks utilities in lib/react-query/hooks.ts
- [ ] T031 [P] Generate TypeScript types from Supabase schema in types/database.ts
- [ ] T032 [P] Create API types from contracts/types.ts in types/api.ts
- [ ] T033 [P] Create domain entity types in types/entities.ts
- [ ] T034 [P] Create validation schemas with Zod in lib/utils/validation.ts
- [ ] T035 [P] Create date formatting utilities in lib/utils/date.ts
- [ ] T036 [P] Create className utility (cn) in lib/utils/cn.ts
- [ ] T037 [P] Create constants file with design tokens in lib/constants.ts

### UI Foundation (Shadcn/UI Components)

- [ ] T038 [P] Install Shadcn/UI CLI and initialize in components/ui/
- [ ] T039 [P] Add Button component from Shadcn/UI in components/ui/button.tsx
- [ ] T040 [P] Add Card components (Card, CardHeader, CardContent) in components/ui/card.tsx
- [ ] T041 [P] Add Input component in components/ui/input.tsx
- [ ] T042 [P] Add Checkbox component in components/ui/checkbox.tsx
- [ ] T043 [P] Add Tabs components in components/ui/tabs.tsx
- [ ] T044 [P] Add Dialog component in components/ui/dialog.tsx
- [ ] T045 [P] Add Toast/Toaster components in components/ui/toast.tsx
- [ ] T046 [P] Add Sheet component (mobile menu) in components/ui/sheet.tsx
- [ ] T047 [P] Add Avatar component in components/ui/avatar.tsx
- [ ] T048 [P] Add Badge component in components/ui/badge.tsx
- [ ] T049 [P] Add Select component in components/ui/select.tsx
- [ ] T050 [P] Add Label component in components/ui/label.tsx

### Layout Components

- [ ] T051 Create root layout with providers in app/layout.tsx
- [ ] T052 Create providers component (React Query, Toast) in app/providers.tsx
- [ ] T053 [P] Create desktop Sidebar component in components/layout/Sidebar.tsx
- [ ] T054 [P] Create mobile navigation component in components/layout/MobileNav.tsx
- [ ] T055 [P] Create Header component in components/layout/Header.tsx
- [ ] T056 Create auth layout in app/(auth)/layout.tsx
- [ ] T057 Create dashboard layout with sidebar in app/(dashboard)/layout.tsx

### Shared Components

- [ ] T058 [P] Create EmptyState component in components/shared/EmptyState.tsx
- [ ] T059 [P] Create LoadingSpinner component in components/shared/LoadingSpinner.tsx
- [ ] T060 [P] Create ErrorBoundary component in components/shared/ErrorBoundary.tsx

### Authentication Pages

- [ ] T061 Create login page in app/(auth)/login/page.tsx
- [ ] T062 Create OAuth callback handler in app/(auth)/callback/page.tsx
- [ ] T063 Create useAuth hook for authentication state in hooks/useAuth.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 가족 건강 대시보드 조회 (Priority: P1) 🎯 MVP

**Goal**: 사용자가 로그인하여 대시보드에서 가족 건강 상태 요약(오늘의 할 일, 가족 개요, 바이탈 차트)을 한눈에 확인할 수 있다

**Independent Test**: 테스트 사용자가 로그인하여 대시보드 접속 시, 개인화된 인사말, 오늘의 할 일 3개, 가족 구성원 3명의 건강 점수, 최근 7일 혈압 차트가 표시되면 완료

**Reference Design**: `reference/care99_dashboard/`

### API Endpoints for User Story 1

- [ ] T064 [P] [US1] Create GET /api/dashboard endpoint in app/api/dashboard/route.ts
- [ ] T065 [P] [US1] Create GET /api/users/profile endpoint in app/api/users/profile/route.ts
- [ ] T066 [P] [US1] Create PATCH /api/users/profile endpoint in app/api/users/profile/route.ts

### Data Layer for User Story 1

- [ ] T067 [P] [US1] Create useDashboard hook in hooks/useDashboard.ts
- [ ] T068 [P] [US1] Create useFamily hook in hooks/useFamily.ts
- [ ] T069 [P] [US1] Create useTasks hook in hooks/useTasks.ts

### UI Components for User Story 1

- [ ] T070 [P] [US1] Create TodaysSummary component in components/dashboard/TodaysSummary.tsx
- [ ] T071 [P] [US1] Create FamilyOverview component in components/dashboard/FamilyOverview.tsx
- [ ] T072 [P] [US1] Create VitalsChart component in components/dashboard/VitalsChart.tsx
- [ ] T073 [P] [US1] Create QuickActions component in components/dashboard/QuickActions.tsx
- [ ] T074 [P] [US1] Create FamilyMemberCard component in components/family/MemberCard.tsx

### Page Implementation for User Story 1

- [ ] T075 [US1] Create dashboard page (root) in app/(dashboard)/page.tsx
- [ ] T076 [US1] Integrate all dashboard components in app/(dashboard)/page.tsx
- [ ] T077 [US1] Add loading states and error handling to dashboard page
- [ ] T078 [US1] Add responsive layout (desktop sidebar, mobile hamburger menu)

**Checkpoint**: User Story 1 (Dashboard) is fully functional and testable independently

---

## Phase 4: User Story 2 - 약물 관리 및 복용 기록 (Priority: P2)

**Goal**: 사용자가 약물을 추가하고, 복용 여부를 체크하며, 복용 준수율을 달력으로 확인할 수 있다

**Independent Test**: 사용자가 약물 추가 → 복용 체크 → 달력에서 준수율(초록/노랑/빨강)을 확인할 수 있으면 완료

**Reference Design**: `reference/care99_medication_management/`

### API Endpoints for User Story 2

- [ ] T079 [P] [US2] Create GET /api/medications endpoint in app/api/medications/route.ts
- [ ] T080 [P] [US2] Create POST /api/medications endpoint in app/api/medications/route.ts
- [ ] T081 [P] [US2] Create PATCH /api/medications/[id] endpoint in app/api/medications/[id]/route.ts
- [ ] T082 [P] [US2] Create DELETE /api/medications/[id] endpoint in app/api/medications/[id]/route.ts
- [ ] T083 [P] [US2] Create GET /api/medications/[id]/logs endpoint in app/api/medications/[id]/logs/route.ts
- [ ] T084 [P] [US2] Create PATCH /api/medication-logs/[id] endpoint in app/api/medication-logs/[id]/route.ts

### Data Layer for User Story 2

- [ ] T085 [P] [US2] Create useMedications hook in hooks/useMedications.ts
- [ ] T086 [P] [US2] Create useMedicationLogs hook in hooks/useMedicationLogs.ts
- [ ] T087 [P] [US2] Create useToggleMedication hook with optimistic updates in hooks/useToggleMedication.ts

### UI Components for User Story 2

- [ ] T088 [P] [US2] Create MedicationList component in components/medications/MedicationList.tsx
- [ ] T089 [P] [US2] Create MedicationCard component in components/medications/MedicationCard.tsx
- [ ] T090 [P] [US2] Create AddMedicationDialog component in components/medications/AddMedicationDialog.tsx
- [ ] T091 [P] [US2] Create EditMedicationDialog component in components/medications/EditMedicationDialog.tsx
- [ ] T092 [P] [US2] Create AdherenceCalendar component in components/medications/AdherenceCalendar.tsx

### Page Implementation for User Story 2

- [ ] T093 [US2] Create medications page in app/(dashboard)/medications/page.tsx
- [ ] T094 [US2] Create medication detail page in app/(dashboard)/medications/[id]/page.tsx
- [ ] T095 [US2] Integrate tabs (전체/예정/놓침) in medications page
- [ ] T096 [US2] Add medication form validation with Zod
- [ ] T097 [US2] Implement checkbox toggle with optimistic UI updates
- [ ] T098 [US2] Add toast notifications for success/error actions

**Checkpoint**: User Story 2 (Medications) works independently - users can add/track medications

---

## Phase 5: User Story 3 - 바이탈 측정 데이터 기록 및 시각화 (Priority: P3)

**Goal**: 사용자가 혈압/혈당/체중 데이터를 입력하고, 시간 경과별 추세를 차트로 확인할 수 있다

**Independent Test**: 사용자가 혈압 데이터 입력 → 최근 30일 라인 차트 확인 → 정상 범위 벗어난 수치가 빨간색으로 표시되면 완료

**Reference Design**: `reference/care99_vitals_tracking/`

### API Endpoints for User Story 3

- [ ] T099 [P] [US3] Create GET /api/vitals endpoint in app/api/vitals/route.ts
- [ ] T100 [P] [US3] Create POST /api/vitals endpoint in app/api/vitals/route.ts

### Data Layer for User Story 3

- [ ] T101 [P] [US3] Create useVitals hook in hooks/useVitals.ts
- [ ] T102 [P] [US3] Create useCreateVital hook in hooks/useCreateVital.ts

### UI Components for User Story 3

- [ ] T103 [P] [US3] Create VitalInput component (form) in components/vitals/VitalInput.tsx
- [ ] T104 [P] [US3] Create TrendChart component (Recharts) in components/vitals/TrendChart.tsx
- [ ] T105 [P] [US3] Create VitalCard component in components/vitals/VitalCard.tsx
- [ ] T106 [P] [US3] Create BloodPressureForm component in components/vitals/BloodPressureForm.tsx
- [ ] T107 [P] [US3] Create BloodSugarForm component in components/vitals/BloodSugarForm.tsx
- [ ] T108 [P] [US3] Create WeightForm component in components/vitals/WeightForm.tsx

### Page Implementation for User Story 3

- [ ] T109 [US3] Create vitals tracking page in app/(dashboard)/vitals/page.tsx
- [ ] T110 [US3] Create vital logging page in app/(dashboard)/vitals/log/page.tsx
- [ ] T111 [US3] Implement tabs for vital types (혈압/혈당/체중)
- [ ] T112 [US3] Add vital value validation (normal ranges)
- [ ] T113 [US3] Implement chart highlighting for out-of-range values
- [ ] T114 [US3] Add CSV export functionality for vitals data

**Checkpoint**: User Story 3 (Vitals) works independently - users can log and visualize health metrics

---

## Phase 6: User Story 4 - 가족 구성원 관리 (Priority: P4)

**Goal**: 사용자가 가족 그룹을 생성하고, 구성원을 초대하며, 권한을 관리할 수 있다

**Independent Test**: 사용자가 구성원 추가 → 초대 링크 생성 → 다른 사용자가 링크로 가입하면 완료

### API Endpoints for User Story 4

- [ ] T115 [P] [US4] Create POST /api/families endpoint in app/api/families/route.ts
- [ ] T116 [P] [US4] Create GET /api/families/[id] endpoint in app/api/families/[id]/route.ts
- [ ] T117 [P] [US4] Create GET /api/families/[id]/members endpoint in app/api/families/[id]/members/route.ts
- [ ] T118 [P] [US4] Create POST /api/families/[id]/members endpoint in app/api/families/[id]/members/route.ts

### Data Layer for User Story 4

- [ ] T119 [P] [US4] Create useFamilyMembers hook in hooks/useFamilyMembers.ts
- [ ] T120 [P] [US4] Create useCreateFamily hook in hooks/useCreateFamily.ts
- [ ] T121 [P] [US4] Create useJoinFamily hook in hooks/useJoinFamily.ts

### UI Components for User Story 4

- [ ] T122 [P] [US4] Create MemberCard component in components/family/MemberCard.tsx
- [ ] T123 [P] [US4] Create AddMemberDialog component in components/family/AddMemberDialog.tsx
- [ ] T124 [P] [US4] Create InviteLink component in components/family/InviteLink.tsx
- [ ] T125 [P] [US4] Create PermissionSelect component in components/family/PermissionSelect.tsx

### Page Implementation for User Story 4

- [ ] T126 [US4] Create family management page in app/(dashboard)/family/page.tsx
- [ ] T127 [US4] Create family member detail page in app/(dashboard)/family/[memberId]/page.tsx
- [ ] T128 [US4] Implement invite code generation logic
- [ ] T129 [US4] Add clipboard copy functionality for invite link
- [ ] T130 [US4] Implement permission-based UI rendering

**Checkpoint**: User Story 4 (Family Management) works independently - multi-user collaboration enabled

---

## Phase 7: User Story 5 - AI 건강 리포트 생성 (Priority: P5)

**Goal**: 시스템이 월간 건강 데이터를 분석하여 AI 리포트를 생성하고, 사용자가 조회 및 PDF 다운로드 가능

**Independent Test**: 사용자가 리포트 생성 요청 → AI 리포트 조회 → PDF 다운로드하면 완료

### API Endpoints & Services for User Story 5

- [ ] T131 [P] [US5] Create OpenAI client in lib/openai/client.ts
- [ ] T132 [P] [US5] Create POST /api/ai/generate-report endpoint in app/api/ai/generate-report/route.ts
- [ ] T133 [P] [US5] Create GET /api/reports endpoint in app/api/reports/route.ts
- [ ] T134 [P] [US5] Create GET /api/reports/[id] endpoint in app/api/reports/[id]/route.ts

### Data Layer for User Story 5

- [ ] T135 [P] [US5] Create useReports hook in hooks/useReports.ts
- [ ] T136 [P] [US5] Create useGenerateReport hook in hooks/useGenerateReport.ts

### UI Components for User Story 5

- [ ] T137 [P] [US5] Create ReportList component in components/reports/ReportList.tsx
- [ ] T138 [P] [US5] Create ReportCard component in components/reports/ReportCard.tsx
- [ ] T139 [P] [US5] Create ReportDetail component (markdown rendering) in components/reports/ReportDetail.tsx
- [ ] T140 [P] [US5] Create GenerateReportDialog component in components/reports/GenerateReportDialog.tsx

### Page Implementation for User Story 5

- [ ] T141 [US5] Create reports list page in app/(dashboard)/reports/page.tsx
- [ ] T142 [US5] Create report detail page in app/(dashboard)/reports/[reportId]/page.tsx
- [ ] T143 [US5] Implement markdown-to-HTML rendering for report content
- [ ] T144 [US5] Add PDF export functionality (browser print)
- [ ] T145 [US5] Add loading state for async AI report generation

**Checkpoint**: User Story 5 (AI Reports) works independently - users get automated health insights

---

## Phase 8: User Story 6 - 건강 제품 스토어 탐색 (Priority: P6)

**Goal**: 사용자가 건강 제품을 탐색하고, 상세 정보 확인 후 외부 쇼핑몰로 이동할 수 있다

**Independent Test**: 사용자가 제품 목록 조회 → 카테고리 필터링 → 제품 상세 → 외부 링크 클릭하면 완료

### API Endpoints for User Story 6

- [ ] T146 [P] [US6] Create GET /api/products endpoint in app/api/products/route.ts
- [ ] T147 [P] [US6] Create GET /api/products/[id] endpoint in app/api/products/[id]/route.ts

### Data Layer for User Story 6

- [ ] T148 [P] [US6] Create useProducts hook in hooks/useProducts.ts

### UI Components for User Story 6

- [ ] T149 [P] [US6] Create ProductGrid component in components/store/ProductGrid.tsx
- [ ] T150 [P] [US6] Create ProductCard component in components/store/ProductCard.tsx
- [ ] T151 [P] [US6] Create ProductDetail component in components/store/ProductDetail.tsx
- [ ] T152 [P] [US6] Create CategoryFilter component in components/store/CategoryFilter.tsx

### Page Implementation for User Story 6

- [ ] T153 [US6] Create store page in app/(dashboard)/store/page.tsx
- [ ] T154 [US6] Create product detail page in app/(dashboard)/store/[productId]/page.tsx
- [ ] T155 [US6] Implement category filtering logic
- [ ] T156 [US6] Add pagination for product list
- [ ] T157 [US6] Implement external link navigation to shopping mall

**Checkpoint**: User Story 6 (Health Store) works independently - product discovery and referral enabled

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Testing

- [ ] T158 [P] Setup Jest and React Testing Library in jest.config.js
- [ ] T159 [P] Setup Playwright for E2E tests in playwright.config.ts
- [ ] T160 [P] Create test utilities and helpers in __tests__/utils/
- [ ] T161 [P] Add unit tests for utility functions in __tests__/unit/
- [ ] T162 [P] Add integration tests for API routes in __tests__/integration/
- [ ] T163 [P] Add E2E tests for critical user journeys in __tests__/e2e/

### Performance & Security

- [ ] T164 [P] Implement Next.js image optimization for all images
- [ ] T165 [P] Add React Query caching strategies for all hooks
- [ ] T166 [P] Implement bundle size optimization (code splitting, dynamic imports)
- [ ] T167 [P] Add input sanitization for all user inputs
- [ ] T168 [P] Implement rate limiting for API routes
- [ ] T169 [P] Add security headers in next.config.js

### Documentation & Deployment

- [ ] T170 [P] Validate all steps in quickstart.md work correctly
- [ ] T171 [P] Create README.md with project overview and setup
- [ ] T172 [P] Document environment variables in .env.local.example
- [ ] T173 [P] Setup Vercel deployment configuration in vercel.json
- [ ] T174 [P] Configure Supabase production instance
- [ ] T175 [P] Setup CI/CD pipeline for automated testing

### Accessibility & UX

- [ ] T176 [P] Add ARIA labels to all interactive components
- [ ] T177 [P] Implement keyboard navigation for all features
- [ ] T178 [P] Add focus states to all interactive elements
- [ ] T179 [P] Test with screen reader and fix issues
- [ ] T180 [P] Add loading skeletons for all async data fetches
- [ ] T181 [P] Implement error recovery UI for network failures

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion - MVP baseline
- **User Story 2 (Phase 4)**: Depends on Foundational completion - Independent of US1
- **User Story 3 (Phase 5)**: Depends on Foundational completion - Independent of US1/US2
- **User Story 4 (Phase 6)**: Depends on Foundational completion - Independent of US1/US2/US3
- **User Story 5 (Phase 7)**: Depends on Foundational completion - Uses data from US2/US3
- **User Story 6 (Phase 8)**: Depends on Foundational completion - Fully independent
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Independent, but appears in US1 dashboard
- **User Story 3 (P3)**: Can start after Foundational - Independent, but appears in US1 dashboard
- **User Story 4 (P4)**: Can start after Foundational - Independent, enhances US1/US2/US3
- **User Story 5 (P5)**: Can start after Foundational - Reads data from US2/US3 but testable with mocks
- **User Story 6 (P6)**: Can start after Foundational - Fully independent

### Within Each User Story

- API endpoints can run in parallel (marked [P])
- Data layer hooks can run in parallel (marked [P])
- UI components can run in parallel (marked [P])
- Page implementation happens after components are ready
- Integration and polish happens last

### Parallel Opportunities

- **Setup Phase**: All tasks marked [P] can run in parallel (T002-T010)
- **Foundational Phase**:
  - Database migrations can run sequentially (T011-T024)
  - All other foundational tasks marked [P] can run in parallel (T025-T063)
- **User Story Phases**: Once Foundational completes, ALL user stories (US1-US6) can start in parallel if team capacity allows
- **Within Each Story**: All tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1 (Dashboard)

```bash
# After Foundational phase completes, launch all API endpoints together:
Task T064: "Create GET /api/dashboard endpoint"
Task T065: "Create GET /api/users/profile endpoint"
Task T066: "Create PATCH /api/users/profile endpoint"

# Launch all hooks together:
Task T067: "Create useDashboard hook"
Task T068: "Create useFamily hook"
Task T069: "Create useTasks hook"

# Launch all components together:
Task T070: "Create TodaysSummary component"
Task T071: "Create FamilyOverview component"
Task T072: "Create VitalsChart component"
Task T073: "Create QuickActions component"
Task T074: "Create FamilyMemberCard component"

# Then integrate in page:
Task T075: "Create dashboard page"
Task T076: "Integrate all dashboard components"
```

---

## Parallel Example: Multiple User Stories

```bash
# With a team of 4 developers after Foundational phase:

Developer A: User Story 1 (Dashboard) - Tasks T064-T078
Developer B: User Story 2 (Medications) - Tasks T079-T098
Developer C: User Story 3 (Vitals) - Tasks T099-T114
Developer D: User Story 4 (Family) - Tasks T115-T130

# All stories complete independently and integrate via shared data model
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T010)
2. Complete Phase 2: Foundational (T011-T063) - CRITICAL
3. Complete Phase 3: User Story 1 (T064-T078)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

**Estimated MVP Time**: 2-3 weeks for solo developer

### Incremental Delivery

1. **Week 1-2**: Setup + Foundational → Foundation ready
2. **Week 3**: Add User Story 1 → Test independently → Deploy (MVP!)
3. **Week 4**: Add User Story 2 → Test independently → Deploy
4. **Week 5**: Add User Story 3 → Test independently → Deploy
5. **Week 6**: Add User Story 4 → Test independently → Deploy
6. **Week 7**: Add User Story 5 → Test independently → Deploy
7. **Week 8**: Add User Story 6 → Test independently → Deploy
8. **Week 9**: Polish phase → Final deployment

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With 3+ developers:

1. **Week 1**: Team completes Setup + Foundational together (T001-T063)
2. **Week 2-3**: Once Foundational done, split work:
   - Developer A: User Story 1 (T064-T078)
   - Developer B: User Story 2 (T079-T098)
   - Developer C: User Story 3 (T099-T114)
3. **Week 4**:
   - Developer A: User Story 4 (T115-T130)
   - Developer B: User Story 5 (T131-T145)
   - Developer C: User Story 6 (T146-T157)
4. **Week 5**: All developers: Polish phase (T158-T181)

Stories complete and integrate independently.

---

## Notes

- **[P] tasks**: Different files, no dependencies - safe to parallelize
- **[Story] label**: Maps task to specific user story for traceability
- **Each user story** should be independently completable and testable
- **Commit frequency**: After each task or logical group
- **Checkpoints**: Stop at any checkpoint to validate story independently
- **Reference designs**: Use Stitch designs as visual guides only - rebuild with Shadcn/UI
- **Design system**: Always use CareNavi design tokens from tailwind.config.js
- **Icons**: Use Lucide React only (NOT Material Symbols from Stitch)
- **Testing**: All tests are in Phase 9 (Polish) - not required for MVP

---

## Task Count Summary

- **Total Tasks**: 181
- **Phase 1 (Setup)**: 10 tasks
- **Phase 2 (Foundational)**: 53 tasks
- **Phase 3 (US1 Dashboard)**: 15 tasks
- **Phase 4 (US2 Medications)**: 20 tasks
- **Phase 5 (US3 Vitals)**: 16 tasks
- **Phase 6 (US4 Family)**: 16 tasks
- **Phase 7 (US5 Reports)**: 15 tasks
- **Phase 8 (US6 Store)**: 12 tasks
- **Phase 9 (Polish)**: 24 tasks

**Parallelizable Tasks**: 142 tasks marked [P] (78% of total)
**MVP Scope**: Phases 1-3 only (78 tasks, ~2-3 weeks solo)
**Full Feature Set**: All phases (181 tasks, ~8-9 weeks solo or ~5 weeks with 3-person team)
