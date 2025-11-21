# Example: Dashboard Implementation Prompt

**Feature**: Dashboard (reference/care99_dashboard/)
**Date**: 2025-11-21
**Status**: Ready to implement

---

## Complete Prompt for /speckit.specify

Copy and paste the following into `/speckit.specify`:

```
지금부터 reference/care99_dashboard/ 에 있는 디자인을 구현할 거야.

### 우선순위 (Priority) - 반드시 이 순서대로 준수

1. **구조 (Structure) - 최우선 ⭐⭐⭐**:
   - 반드시 SpecKit 컴포넌트 분리 규칙 준수
   - Shadcn/UI 컴포넌트 사용 (Stitch 커스텀 코드 절대 복사 금지)
   - CareNavi 프로젝트 구조와 네이밍 컨벤션 준수
   - 헌법 원칙 I-VI 모두 준수 (.specify/memory/constitution.md)

2. **스타일링 (Styling) - 두 번째 ⭐⭐**:
   - 색상: 하드코딩 금지, CareNavi 디자인 토큰만 사용
     - primary: #3B82F6 (bg-primary, text-primary)
     - success: #10B981 (text-success)
     - warning: #F59E0B (text-warning)
     - error: #EF4444 (text-error)
   - 타이포그래피: tailwind.config.js에 정의된 Inter/Pretendard 폰트 사용
   - 스페이싱: Tailwind 유틸리티만 사용 (p-4, m-6, gap-4 등)
   - 아이콘: Material Symbols 절대 금지, Lucide React만 사용

3. **비주얼 (Visual) - 세 번째 ⭐**:
   - reference/care99_dashboard/screen.png의 레이아웃 패턴 참조
   - 정보 계층 구조 유지
   - 사용자 인터랙션 패턴 분석
   - 컴포넌트 배치와 비율 참고

---

### 기능 설명 (Feature Description)

가족 건강 관리 대시보드를 구현해야 해. 주요 기능은:

**사용자 스토리 (P1 - MVP)**:
"가족 돌봄이로서, 나는 대시보드에서 우리 가족의 건강 상태 요약을 보고 싶다. 그래서 주의가 필요한 문제를 빠르게 식별할 수 있다."

**주요 기능**:
1. 개인화된 인사말 (Good Morning, [User Name])
2. 오늘의 할 일 요약 (Today's Summary)
   - 약 복용 체크리스트
   - 바이탈 측정 리마인더
   - 처방전 재발급 알림
3. 가족 구성원 개요 (Family Overview)
   - 각 구성원의 건강 점수 표시
   - 상태 인디케이터 (Good/Fair/Needs Review)
   - 구성원 추가 기능
4. 바이탈 차트 (Quick View)
   - 혈압 (Blood Pressure)
   - 혈당 (Blood Sugar)
   - 간단한 트렌드 차트 (Recharts)
5. 빠른 액션 버튼 (Quick Actions)
   - Log Vitals
   - Log Medication

---

### 컴포넌트 매핑 (Component Mapping)

reference/care99_dashboard/code.html 분석 결과:

#### 1. 레이아웃 구조
```
┌─────────────┬───────────────────────────────────┐
│             │  Header (Greeting)                 │
│   Sidebar   ├───────────────────────────────────┤
│             │  ┌──────────┬──────────────────┐  │
│  - Dashboard│  │ Today's  │ Family Overview  │  │
│  - Meds     │  │ Summary  │                  │  │
│  - Vitals   │  └──────────┴──────────────────┘  │
│  - Appts    │  ┌──────────┬──────────────────┐  │
│  - Family   │  │ Blood    │ Blood Sugar      │  │
│             │  │ Pressure │                  │  │
│  Settings   │  └──────────┴──────────────────┘  │
│  Help       │  Quick Actions                     │
└─────────────┴───────────────────────────────────┘
```

#### 2. Shadcn/UI 컴포넌트 매핑
| Stitch 요소 | Shadcn/UI 컴포넌트 | 비고 |
|------------|-------------------|-----|
| Sidebar | Custom + Sheet | Desktop: static, Mobile: Sheet |
| Card wrapper | Card, CardHeader, CardContent | 모든 섹션에 사용 |
| Checkbox list | Checkbox | Today's Summary tasks |
| Avatar + Score | Avatar + Badge | Family members |
| Line chart | Recharts LineChart | Vitals visualization |
| Action buttons | Button | variant="default", variant="secondary" |

#### 3. 아이콘 매핑 (Material Symbols → Lucide React)
| Stitch Icon | Lucide Icon | 사용 위치 |
|------------|-------------|----------|
| grid_view | LayoutGrid | Dashboard nav |
| medication | Pill | Medications nav |
| vital_signs | Activity | Vitals nav |
| calendar | Calendar | Appointments nav |
| group | Users | Family Circle nav |
| settings | Settings | Settings nav |
| help | HelpCircle | Help nav |
| add | Plus | Add Member button |
| monitoring | Activity | Log Vitals icon |
| medication | Pill | Log Medication icon |

#### 4. 색상 매핑 (Stitch → CareNavi)
| Stitch 색상 | CareNavi 토큰 | Tailwind 클래스 |
|-----------|--------------|----------------|
| #2563EB (primary) | #3B82F6 | bg-primary, text-primary |
| #22c55e (green) | #10B981 | text-success |
| #f59e0b (amber) | #F59E0B | text-warning |
| #ef4444 (red) | #EF4444 | text-error |
| #f8f9fc (bg) | #F9FAFB | bg-gray-50 |
| #FFFFFF (card) | #FFFFFF | bg-white |
| #111827 (text) | #111827 | text-gray-900 |
| #6b7280 (subtext) | #6B7280 | text-gray-500 |

#### 5. 데이터 엔티티
```typescript
// User
{
  id: string
  name: string
  role: 'caregiver' | 'patient'
  avatarUrl?: string
}

// FamilyMember
{
  id: string
  name: string
  healthScore: number (0-100)
  status: 'good' | 'fair' | 'needs_review'
  avatarUrl?: string
}

// Task
{
  id: string
  description: string
  assignedTo: string (FamilyMember.name)
  completed: boolean
  dueTime?: string
}

// Vital
{
  id: string
  type: 'blood_pressure' | 'blood_sugar'
  value: string (e.g., "122/80", "95")
  unit: string
  timestamp: Date
  trendData: Array<{ date: string, value: number }>
}
```

---

### 헌법 준수 체크리스트 (Constitution Compliance)

- [ ] **Principle I (User-Centric Design)**:
  - P1 사용자 스토리 작성 (가족 건강 요약 보기)
  - 독립적으로 테스트 가능
  - 독립적으로 배포 가능

- [ ] **Principle II (Independent Testability)**:
  - Given-When-Then 시나리오 작성
  - 예: "Given 가족 구성원 3명이 있을 때, When 대시보드에 접속하면, Then 모든 구성원의 건강 점수가 표시된다"

- [ ] **Principle III (Documentation-First)**:
  - spec.md 먼저 생성
  - plan.md로 기술 컨텍스트 문서화
  - data-model.md로 엔티티 정의

- [ ] **Principle IV (Specification Before Implementation)**:
  - 구현 전 계획 승인 완료
  - 모든 "NEEDS CLARIFICATION" 해결
  - tasks.md 생성 후 리뷰

- [ ] **Principle V (Incremental Delivery)**:
  - P1 스토리만으로 동작하는 MVP 구성
  - 추가 기능은 P2, P3로 분리

- [ ] **Principle VI (Design System Consistency)**:
  - Shadcn/UI 컴포넌트만 사용
  - Lucide React 아이콘만 사용
  - CareNavi 디자인 토큰만 사용
  - 색상 하드코딩 절대 금지

---

### 금지 사항 (DO NOT)

절대 하지 말아야 할 것들:

❌ **NEVER**:
1. reference/care99_dashboard/code.html 코드 복사-붙여넣기
2. Stitch의 인라인 Tailwind config 사용
3. Material Symbols 아이콘 임포트
4. 색상 하드코딩 (예: `className="bg-[#2563EB]"`)
5. SpecKit 워크플로우 건너뛰기 (바로 구현하지 말 것)
6. 커스텀 Tailwind 컴포넌트 만들기 (Shadcn/UI 우선)

---

### 참조 문서 (Reference Documentation)

구현 전 반드시 확인:

- ✅ Constitution: `.specify/memory/constitution.md` v1.2.0
- ✅ Design System: `.specify/design-system/README.md`
- ✅ Reference Guide: `reference/README.md`
- ✅ Prompt Template: `.specify/templates/reference-prompt-template.md`
- ✅ Global CSS: `styles/global.css`
- ✅ Tailwind Config: `tailwind.config.js`

---

### 구현 시작

이제 /speckit.specify를 실행해서 spec.md를 생성하고,
이후 /speckit.plan → /speckit.tasks → /speckit.implement 순서로 진행해.

구조 > 스타일링 > 비주얼 순서를 절대 잊지 말 것!
```

---

## After Implementation Checklist

Implementation이 완료되면 다음을 확인:

- [ ] 모든 컴포넌트가 Shadcn/UI를 사용하는가?
- [ ] 모든 아이콘이 Lucide React인가?
- [ ] 색상이 모두 CareNavi 토큰을 사용하는가?
- [ ] 레이아웃이 reference/care99_dashboard/screen.png와 유사한가?
- [ ] P1 사용자 스토리가 독립적으로 동작하는가?
- [ ] 헌법 원칙 I-VI를 모두 준수하는가?

---

## Quick Start

```bash
# 1. 이 프롬프트를 복사
# 2. 터미널에서 실행
/speckit.specify "[위의 전체 프롬프트 붙여넣기]"

# 3. spec.md 생성 확인
# 4. 계획 생성
/speckit.plan

# 5. 작업 생성
/speckit.tasks

# 6. 구현
/speckit.implement
```

---

## Notes

- 이 프롬프트는 `.specify/templates/reference-prompt-template.md`를 기반으로 작성되었습니다
- Dashboard는 P1 우선순위이므로 가장 먼저 구현해야 합니다
- 모든 참조 디자인 구현 시 이 패턴을 따르세요
