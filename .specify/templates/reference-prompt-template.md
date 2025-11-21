# Reference Design Implementation Prompt Template

**Purpose**: Ensures Stitch reference designs are implemented following SpecKit structure and CareNavi design system

**Version**: 1.0.0
**Last Updated**: 2025-11-21

## Usage

When implementing any feature from the `reference/` directory, use this prompt template to ensure constitutional compliance.

---

## Template

```
지금부터 reference/[REFERENCE_PATH]/ 에 있는 디자인을 구현할 거야.

### 우선순위 (Priority)

1. **구조 (Structure) - 최우선**:
   - 반드시 SpecKit 컴포넌트 분리 규칙 준수
   - Shadcn/UI 컴포넌트 사용 (Stitch 커스텀 코드 절대 복사 금지)
   - CareNavi 프로젝트 구조와 네이밍 컨벤션 준수
   - 헌법 원칙 I-VI 모두 준수

2. **스타일링 (Styling) - 두 번째**:
   - 색상: 하드코딩 금지, CareNavi 디자인 토큰 사용 (--color-primary, bg-primary 등)
   - 타이포그래피: tailwind.config.js에 정의된 폰트와 크기 사용
   - 스페이싱: Tailwind 스페이싱 유틸리티 사용 (p-*, m-*, gap-*)
   - 아이콘: Material Symbols 대신 Lucide React 사용

3. **비주얼 (Visual) - 세 번째**:
   - Stitch 디자인의 레이아웃 패턴 참조
   - 정보 계층 구조 유지
   - 사용자 인터랙션 패턴 분석
   - 컴포넌트 배치와 비율 참고

### 구현 방식 (Implementation Approach)

**DO (해야 할 것)**:
- [ ] reference/[REFERENCE_PATH]/screen.png 이미지를 시각적 가이드로 사용
- [ ] 레이아웃 구조 분석 후 Shadcn/UI 컴포넌트로 재구성
- [ ] 모든 색상을 CareNavi 디자인 토큰으로 매핑
- [ ] 아이콘을 Lucide React로 교체
- [ ] SpecKit 워크플로우 준수: /speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement

**DO NOT (하지 말아야 할 것)**:
- [ ] ❌ reference/[REFERENCE_PATH]/code.html에서 코드 복사-붙여넣기
- [ ] ❌ Stitch의 인라인 Tailwind 설정 사용
- [ ] ❌ Material Symbols 아이콘 사용
- [ ] ❌ 색상 하드코딩 (#2563EB 같은 hex 값 직접 사용)
- [ ] ❌ SpecKit 워크플로우 건너뛰기

### 컴포넌트 매핑 (Component Mapping)

reference/[REFERENCE_PATH]/code.html을 분석해서 다음을 추출:
1. **레이아웃 구조**: [Grid/Flex 구조, 섹션 나누기]
2. **주요 컴포넌트**: [Card, Button, Input 등 식별]
3. **Shadcn/UI 매핑**: [Stitch 요소 → Shadcn/UI 컴포넌트]
4. **아이콘 매핑**: [Material Symbols → Lucide React]
5. **색상 매핑**: [Stitch 색상 → CareNavi 토큰]

### 헌법 준수 확인 (Constitution Compliance)

- [ ] Principle I (User-Centric Design): 우선순위가 지정된 독립적인 사용자 스토리 생성
- [ ] Principle II (Independent Testability): Given-When-Then 수락 시나리오 포함
- [ ] Principle III (Documentation-First): spec.md, plan.md 먼저 생성
- [ ] Principle IV (Specification Before Implementation): 구현 전 계획 승인 완료
- [ ] Principle V (Incremental Delivery): P1 스토리가 독립 실행 가능한 MVP
- [ ] Principle VI (Design System Consistency): CareNavi 디자인 토큰만 사용

### 참조 문서 (Reference Documentation)

- Constitution: `.specify/memory/constitution.md` v1.2.0
- Design System: `.specify/design-system/README.md`
- Reference Guide: `reference/README.md`
- Global CSS: `styles/global.css`
- Tailwind Config: `tailwind.config.js`

이제 구현을 시작해.
```

---

## Examples

### Example 1: Dashboard Implementation

```
지금부터 reference/care99_dashboard/ 에 있는 디자인을 구현할 거야.

### 우선순위 (Priority)

1. **구조 (Structure) - 최우선**:
   - 반드시 SpecKit 컴포넌트 분리 규칙 준수
   - Shadcn/UI 컴포넌트 사용 (Stitch 커스텀 코드 절대 복사 금지)
   - CareNavi 프로젝트 구조와 네이밍 컨벤션 준수
   - 헌법 원칙 I-VI 모두 준수

2. **스타일링 (Styling) - 두 번째**:
   - 색상: 하드코딩 금지, CareNavi 디자인 토큰 사용 (--color-primary, bg-primary 등)
   - 타이포그래피: tailwind.config.js에 정의된 폰트와 크기 사용
   - 스페이싱: Tailwind 스페이싱 유틸리티 사용 (p-*, m-*, gap-*)
   - 아이콘: Material Symbols 대신 Lucide React 사용

3. **비주얼 (Visual) - 세 번째**:
   - Stitch 디자인의 레이아웃 패턴 참조
   - 정보 계층 구조 유지
   - 사용자 인터랙션 패턴 분석
   - 컴포넌트 배치와 비율 참고

### 구현 방식 (Implementation Approach)

**DO (해야 할 것)**:
- [x] reference/care99_dashboard/screen.png 이미지를 시각적 가이드로 사용
- [x] 레이아웃 구조 분석 후 Shadcn/UI 컴포넌트로 재구성
- [x] 모든 색상을 CareNavi 디자인 토큰으로 매핑
- [x] 아이콘을 Lucide React로 교체
- [x] SpecKit 워크플로우 준수: /speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement

**DO NOT (하지 말아야 할 것)**:
- [x] ❌ reference/care99_dashboard/code.html에서 코드 복사-붙여넣기
- [x] ❌ Stitch의 인라인 Tailwind 설정 사용
- [x] ❌ Material Symbols 아이콘 사용
- [x] ❌ 색상 하드코딩 (#2563EB 같은 hex 값 직접 사용)
- [x] ❌ SpecKit 워크플로우 건너뛰기

### 컴포넌트 매핑 (Component Mapping)

reference/care99_dashboard/code.html을 분석해서 다음을 추출:

1. **레이아웃 구조**:
   - 왼쪽 고정 사이드바 (256px)
   - 메인 콘텐츠 영역 (flex-1)
   - Grid 레이아웃: 2열 (Today's Summary + Family Overview)
   - 하단: 2열 Vitals 카드

2. **주요 컴포넌트**:
   - Sidebar navigation
   - Welcome header (greeting + description)
   - Card components (summary, family, vitals)
   - Checkbox list (tasks)
   - Avatar display (family members with scores)
   - Line charts (Recharts)
   - Button components (Quick Actions)

3. **Shadcn/UI 매핑**:
   - Sidebar → Custom sidebar + Sheet (mobile)
   - Card wrapper → Shadcn/UI Card
   - Checkbox items → Shadcn/UI Checkbox
   - Buttons → Shadcn/UI Button
   - Charts → Recharts LineChart

4. **아이콘 매핑**:
   - grid_view → LayoutGrid
   - medication → Pill
   - vital_signs → Activity
   - calendar → Calendar
   - group → Users
   - settings → Settings
   - help → HelpCircle
   - add → Plus

5. **색상 매핑**:
   - primary (#2563EB) → bg-primary (#3B82F6)
   - status-green (#22c55e) → text-success (#10B981)
   - status-amber (#f59e0b) → text-warning (#F59E0B)
   - status-red (#ef4444) → text-error (#EF4444)
   - background-light (#f8f9fc) → bg-gray-50 (#F9FAFB)

### 헌법 준수 확인 (Constitution Compliance)

- [x] Principle I: 대시보드 사용자 스토리 생성 (P1: 가족 건강 요약 보기)
- [x] Principle II: Given-When-Then 시나리오 포함
- [x] Principle III: spec.md, plan.md 먼저 생성
- [x] Principle IV: 계획 승인 후 구현
- [x] Principle V: P1이 독립 실행 가능
- [x] Principle VI: CareNavi 디자인 토큰만 사용

이제 구현을 시작해.
```

### Example 2: Medication Management Implementation

```
지금부터 reference/care99_medication_management/ 에 있는 디자인을 구현할 거야.

[Same priority structure and guidelines as above]

### 컴포넌트 매핑 (Component Mapping)

1. **레이아웃 구조**:
   - 사이드바 + 메인 콘텐츠
   - 상단: 페이지 제목 + Add Medication 버튼
   - 탭 인터페이스 (All, Scheduled, Missed)
   - 약물 목록 (카드 형태)

2. **주요 컴포넌트**:
   - Tab navigation
   - Medication card (이름, 복용 시간, 상태)
   - Avatar/Icon display
   - Status badges

3. **Shadcn/UI 매핑**:
   - Tabs → Shadcn/UI Tabs
   - Card → Shadcn/UI Card
   - Badge → Shadcn/UI Badge
   - Button → Shadcn/UI Button

[Continue with icon and color mappings...]

이제 구현을 시작해.
```

---

## Notes

- This template enforces constitutional compliance (v1.2.0)
- Always prioritize: Structure > Styling > Visual
- Never skip SpecKit workflow
- Document all mappings in spec.md and plan.md
- When in doubt, ask for clarification before implementing

---

## Related Documentation

- [Constitution](./../memory/constitution.md) - Design Reference Standards section
- [Reference Guide](./../../reference/README.md) - Comprehensive usage guide
- [Design System](./../design-system/README.md) - CareNavi design tokens
