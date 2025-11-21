# CareNavi Design Reference

**Source**: Stitch AI Design Tool
**Project Name**: care99 (임시명) → CareNavi (실제 프로젝트명)
**Created**: 2025-11-21
**Status**: Reference Material (DO NOT copy directly)

## ⚠️ Important Guidelines

This directory contains **reference designs** from Stitch. These are NOT to be used directly in the codebase.

### How to Use This Reference

1. **DO NOT copy-paste** code from `code.html` files directly into the project
2. **DO analyze** the designs to understand:
   - Layout patterns
   - Component structure
   - User interactions
   - Information hierarchy
3. **DO implement** using CareNavi's design system and SpecKit workflow
4. **DO reference** `screen.png` images when implementing features

### Constitutional Compliance

All implementations MUST follow:
- [CareNavi Constitution](./../.specify/memory/constitution.md) v1.1.0
- [Design System](./../.specify/design-system/README.md)
- SpecKit workflow (`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`)

## 📁 Reference Inventory

Total screens: 13 (each with `code.html` + `screen.png`)

### 1. Authentication & Onboarding

| Screen | Path | Purpose |
|--------|------|---------|
| Landing Page | `care99_landing_page/` | Marketing page, value proposition |
| Social Login | `care99_social_login/` | Authentication flow |
| Profile Setup | `care99_profile_setup/` | User onboarding |

### 2. Family Management

| Screen | Path | Purpose |
|--------|------|---------|
| Create Family | `care99_create/join_family/` | Family group creation |
| Family Management | `care99_family_management/` | Manage family members |

### 3. Core Features

| Screen | Path | Purpose |
|--------|------|---------|
| Dashboard | `care99_dashboard/` | Main health overview |
| Medication Management | `care99_medication_management/` | Medication tracking |
| Vitals Tracking | `care99_vitals_tracking/` | Health metrics overview |
| Log Blood Pressure | `care99_log_blood_pressure/` | Specific vital entry |
| Family Member Report | `care99_family_member_adherence_&_report/` | Individual health report |

### 4. Additional Features

| Screen | Path | Purpose |
|--------|------|---------|
| Root Layout | `care99_root_layout/` | App shell, navigation |
| AI Health Roadmap | `care99_ai_health_roadmap/` | AI-driven health planning |
| Health Store | `care99_health_store/` | Health products/services |

## 🎨 Design System Analysis

### Stitch vs CareNavi Design Tokens

| Element | Stitch (care99) | CareNavi | Action |
|---------|----------------|----------|--------|
| Primary Color | `#2563EB` | `#3B82F6` | ✅ Use CareNavi |
| Font | Inter | Inter/Pretendard | ✅ Compatible |
| Background | `#f8f9fc` | `#F9FAFB` | ✅ Similar, use CareNavi |
| Border Radius | 0.5rem default | 0.375rem (md) | ⚠️ Adjust to CareNavi |
| Icons | Material Symbols | Lucide React | ⚠️ Replace with Lucide |
| Components | Custom Tailwind | Shadcn/UI | ⚠️ Use Shadcn/UI |

### Key Observations

#### ✅ Compatible Elements
- Color scheme is very close (blue primary, gray scale)
- Typography (Inter font family)
- Layout patterns (sidebar navigation, card-based design)
- Responsive approach

#### ⚠️ Needs Adaptation
- Replace Material Symbols icons with Lucide React
- Rebuild components using Shadcn/UI instead of custom Tailwind
- Adjust border radius to match CareNavi standards
- Use CareNavi's exact color tokens from constitution

## 🔄 Implementation Workflow

### For Each Screen/Feature

1. **Specification Phase**
   ```bash
   /speckit.specify "Implement [feature name] based on reference/care99_[feature]/"
   ```

2. **Reference the Design**
   - Open `reference/care99_[feature]/screen.png` in IDE
   - Review `reference/care99_[feature]/code.html` for:
     - Layout structure
     - Component hierarchy
     - Interactive elements
     - Data requirements

3. **Planning Phase**
   ```bash
   /speckit.plan
   ```
   - Translate Stitch design into SpecKit architecture
   - Map to CareNavi components (Shadcn/UI)
   - Identify data entities
   - Define API contracts (if needed)

4. **Implementation Phase**
   ```bash
   /speckit.tasks
   /speckit.implement
   ```
   - Build using CareNavi design system
   - Use Shadcn/UI components
   - Apply Tailwind classes from tailwind.config.js
   - Replace icons with Lucide React

## 📝 Feature Mapping Template

When implementing a reference design, document:

```markdown
## [Feature Name]

**Reference**: `reference/care99_[feature]/`
**Screenshot**: ![Design](reference/care99_[feature]/screen.png)

### Design Elements to Extract
- Layout: [describe grid/flex structure]
- Components: [list cards, buttons, inputs, etc.]
- Interactions: [list user actions]
- Data: [list data entities needed]

### CareNavi Implementation
- [ ] Component: Use Shadcn/UI [component]
- [ ] Icons: Replace Material Symbols with Lucide [icon]
- [ ] Colors: Use CareNavi tokens (--color-primary, etc.)
- [ ] Layout: Apply CareNavi spacing/padding standards
```

## 🎯 Priority Implementation Order

Based on typical health app user flows:

### Phase 1: MVP (P1)
1. **Root Layout** - App shell, navigation
2. **Dashboard** - Main health overview
3. **Family Management** - Add/manage family members

### Phase 2: Core Features (P2)
4. **Medication Management** - Track medications
5. **Vitals Tracking** - Overview of health metrics
6. **Log Blood Pressure** - Specific vital entry

### Phase 3: Extended Features (P3)
7. **Family Member Report** - Individual analytics
8. **Profile Setup** - User onboarding
9. **Authentication** - Social login, landing page

### Phase 4: Advanced Features (P4)
10. **AI Health Roadmap** - AI-driven insights
11. **Health Store** - Marketplace integration

## 🚫 Anti-Patterns to Avoid

### ❌ DO NOT
- Copy-paste HTML from `code.html` files
- Use inline Tailwind config from Stitch
- Use Material Symbols icons
- Hardcode colors (use CareNavi design tokens)
- Skip SpecKit workflow
- Create features without user stories

### ✅ DO
- Use reference as visual guide
- Rebuild components with Shadcn/UI
- Use Lucide React icons
- Apply CareNavi design system
- Follow SpecKit workflow
- Create prioritized user stories for each feature

## 📚 Related Documentation

- [CareNavi Constitution](./../.specify/memory/constitution.md) - Governance and principles
- [Design System](./../.specify/design-system/README.md) - Color, typography, components
- [Global CSS](./../styles/global.css) - Design tokens
- [Tailwind Config](./../tailwind.config.js) - Tailwind customization

## 🔍 Quick Reference Checklist

Before implementing any reference design, verify:

- [ ] User stories created (`/speckit.specify`)
- [ ] Implementation plan generated (`/speckit.plan`)
- [ ] Constitution check passed
- [ ] Design system alignment verified
- [ ] Components identified in Shadcn/UI
- [ ] Icons mapped to Lucide React
- [ ] Tasks generated (`/speckit.tasks`)
- [ ] Reference screenshot reviewed

## 📞 Example Implementation

### Dashboard Feature

**Reference**: `reference/care99_dashboard/`

**User Story (P1)**:
> As a family caregiver, I want to see a summary of my family's health status on the dashboard, so I can quickly identify any issues requiring attention.

**Implementation Approach**:

1. **Layout Analysis** (from screen.png):
   - Left sidebar navigation (matches CareNavi layout pattern ✅)
   - Main content area with greeting
   - Grid layout: Today's Summary + Family Overview
   - Bottom row: Vitals cards (Blood Pressure, Blood Sugar)
   - Quick Actions buttons

2. **Component Mapping**:
   - Sidebar: Shadcn/UI Sheet (mobile) + static sidebar (desktop)
   - Cards: Shadcn/UI Card component
   - Checkboxes: Shadcn/UI Checkbox
   - Buttons: Shadcn/UI Button
   - Charts: Recharts Line chart
   - Icons: Lucide React (Activity, Pill, Heart, Calendar, Users, Settings, HelpCircle)

3. **Color Mapping**:
   - Primary blue: Use `bg-primary` (CareNavi #3B82F6)
   - Status colors: Use `text-success`, `text-warning`, `text-error`
   - Background: Use `bg-gray-50`
   - Cards: Use `bg-white`

4. **Data Entities**:
   - User (name, role)
   - FamilyMember (name, healthScore, status, avatar)
   - Task (description, assignee, completed)
   - Vital (type, value, unit, timestamp, trend)

5. **Tasks**:
   ```markdown
   - [ ] T001 Create User model
   - [ ] T002 Create FamilyMember model
   - [ ] T003 Create Task model
   - [ ] T004 Create Vital model
   - [ ] T005 Implement DashboardLayout component
   - [ ] T006 Implement TodaysSummary component
   - [ ] T007 Implement FamilyOverview component
   - [ ] T008 Implement VitalsCard component with Recharts
   - [ ] T009 Implement QuickActions component
   ```

## 🔄 Changelog

### 2025-11-21
- Initial documentation created
- Cataloged 13 reference screens from Stitch
- Mapped design system differences
- Established implementation workflow
- Created priority order for features
