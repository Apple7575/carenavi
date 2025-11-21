<!--
Sync Impact Report:
Version: 1.1.0 → 1.2.0
Change Type: MINOR - Design reference guidelines added

Modified Principles: N/A
Added Sections:
  - Design Reference Standards (under Quality Standards)
  - Reference directory usage guidelines

Removed Sections: N/A

Templates Reviewed:
  ✅ .specify/templates/spec-template.md - Aligned (user stories, prioritization, independent testing)
  ✅ .specify/templates/plan-template.md - Aligned (constitution check gate, complexity tracking)
  ✅ .specify/templates/tasks-template.md - Aligned (user story organization, test-first approach)
  ✅ .specify/templates/checklist-template.md - Not reviewed (empty template)

New Artifacts Created:
  ✅ reference/README.md - Stitch design reference documentation (13 screens cataloged)

Previous Version (1.1.0) Artifacts:
  ✅ global.css - CSS custom properties for design tokens
  ✅ tailwind.config.js - Tailwind CSS configuration with CareNavi design system
  ✅ .specify/design-system/README.md - Design system documentation

Follow-up TODOs: N/A
-->

# CareNavi Constitution

## Core Principles

### I. User-Centric Design

Every feature MUST begin with prioritized user stories that are independently testable and deliverable. Each user story represents a standalone slice of value that can be:
- Developed independently
- Tested independently
- Deployed independently
- Demonstrated independently

**Rationale**: Independent user stories enable true incremental delivery, reduce risk through smaller changes, and ensure each development cycle delivers measurable user value. This prevents "big bang" releases and allows early validation of assumptions.

### II. Independent Testability

Each user story MUST include acceptance scenarios in Given-When-Then format. Every story must define how it can be verified independently without requiring other stories to be complete.

**Rationale**: Independent testability ensures feature completeness can be objectively measured, enables parallel development by multiple team members, and prevents false dependencies between features. It forces clarity about what "done" means.

### III. Documentation-First

Design artifacts MUST be created before implementation begins:
- `spec.md`: User scenarios, requirements, success criteria
- `plan.md`: Technical context, architecture, constitution compliance
- `data-model.md`: Entity definitions and relationships (when data is involved)
- `contracts/`: Interface specifications (APIs, CLIs, etc.)
- `tasks.md`: Dependency-ordered implementation checklist

All documentation MUST use technology-agnostic language in requirements while being technology-specific in implementation details.

**Rationale**: Front-loaded documentation catches design flaws early when they're cheap to fix, creates shared understanding across the team, and serves as evergreen reference that stays synchronized with implementation through the SpecKit workflow.

### IV. Specification Before Implementation

Implementation MUST NOT begin until:
1. Feature specification (`spec.md`) is complete with prioritized user stories
2. Implementation plan (`plan.md`) passes constitution check
3. All "NEEDS CLARIFICATION" items are resolved
4. Task list (`tasks.md`) is generated and reviewed

**Rationale**: Upfront specification prevents rework from unclear requirements, ensures constitutional compliance is verified before resource investment, and creates a clear roadmap that can be estimated and tracked.

### V. Incremental Delivery

Features MUST be structured to deliver in priority order (P1 → P2 → P3...). The highest priority user story (P1) MUST constitute a viable MVP that delivers standalone value. Each subsequent priority level MUST be independently deployable without breaking prior functionality.

**Rationale**: Incremental delivery enables early user feedback on the most valuable features first, reduces time-to-value, and allows project scope to flex without abandoning working functionality.

### VI. Design System Consistency

All UI implementations MUST adhere to the CareNavi design system defined in this constitution. Design tokens MUST be used through CSS custom properties or Tailwind CSS configuration—never hardcoded values.

**Design Aesthetic**: Clean, Medical, Trustworthy

**Color Palette**:
- Primary Accent: `#3B82F6` (blue-500) - buttons, links, icons, chart highlights
- Background: `#F9FAFB` (gray-50) or `#FFFFFF` (white) - clean, open feeling
- Supporting colors derived from Tailwind CSS gray and blue scales

**Typography**:
- Font Family: Inter or Pretendard (sans-serif)
- Font sizes follow Tailwind CSS scale for consistency
- Hierarchy: Large/clear headings, medium body text, small but readable secondary text

**UI Components**:
- Component Library: Shadcn/UI (Radix UI based)
- Icons: Lucide React
- Charts: Recharts (using primary blue accent)
- Base Layout: Card components with proper padding

**Layout Patterns**:
- Desktop: Persistent left sidebar navigation
- Mobile: Top navigation bar with hamburger menu (Sheet component)
- Responsive: Mobile-first approach, optimized for iPhone to wide desktop monitors

**User Feedback**:
- Toast notifications for success/error/info messages

**Rationale**: Consistent design systems ensure professional appearance, reduce decision fatigue, improve accessibility through tested components, and accelerate development by providing a shared visual language. Medical applications require extra attention to trustworthiness and clarity.

## Technology Stack

### Required Technologies

**Frontend Framework**: React with TypeScript
**Styling**: Tailwind CSS with CSS custom properties for design tokens
**UI Components**: Shadcn/UI (Radix UI primitives)
**Icons**: Lucide React
**Charts**: Recharts
**State Management**: (To be determined per feature requirements)
**Routing**: (To be determined based on application type)

### Platform Targets

**Primary**: Desktop web application (modern browsers)
**Secondary**: Mobile responsive (iOS Safari, Android Chrome)
**Minimum Support**: iPhone SE (375px) to 4K desktop (3840px)

## Development Workflow

### Planning Phase

1. **Feature Specification** (`/speckit.specify`):
   - User runs command with natural language feature description
   - System generates `spec.md` with prioritized user stories (P1, P2, P3...)
   - Each story includes independent test criteria and acceptance scenarios
   - Unclear requirements marked as "NEEDS CLARIFICATION"

2. **Clarification** (`/speckit.clarify`) - Optional:
   - If spec contains underspecified areas, run to generate targeted questions
   - Answers are encoded back into the specification
   - Repeat until no "NEEDS CLARIFICATION" items remain

3. **Implementation Planning** (`/speckit.plan`):
   - Generates `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`
   - Performs constitution check against all principles
   - Includes complexity tracking table for any justified violations
   - Documents technical context and project structure

4. **Analysis** (`/speckit.analyze`) - Optional:
   - Non-destructive consistency check across spec.md, plan.md, tasks.md
   - Validates cross-artifact alignment before implementation begins

5. **Task Generation** (`/speckit.tasks`):
   - Creates dependency-ordered `tasks.md` organized by user story
   - Each phase maps to a user story for independent implementation
   - Tests (if requested) are explicitly marked and appear before implementation
   - Foundation phase identified as blocking prerequisite for all user stories

### Implementation Phase

6. **Execution** (`/speckit.implement`):
   - Processes tasks in dependency order
   - Respects parallel execution markers [P]
   - Each checkpoint represents a fully functional user story
   - Can stop at any checkpoint for independent validation/deployment

7. **Checklist Validation** (`/speckit.checklist`) - Optional:
   - Generates custom quality/compliance checklist for feature
   - Based on constitution principles and project-specific requirements

8. **Issue Tracking** (`/speckit.taskstoissues`) - Optional:
   - Converts tasks.md into dependency-ordered GitHub issues
   - Enables distributed team collaboration and tracking

### Workflow Rules

- Specification phase (steps 1-5) MUST complete before implementation begins
- Constitution check MUST pass before research phase; re-check after design phase
- Any complexity violations MUST be documented with justification in plan.md
- User stories MUST remain independently testable throughout implementation
- Each checkpoint MUST represent a deployable, demonstrable increment

## Quality Standards

### Documentation Quality

- All requirements use MUST/SHOULD language with clear rationale
- No unexplained placeholder tokens (e.g., [NEEDS CLARIFICATION]) in final artifacts
- Technical context fully specified (language, dependencies, platform, testing, constraints)
- Edge cases explicitly documented
- Success criteria are measurable and technology-agnostic

### Code Quality

- Test-first approach enforced when tests are explicitly requested
- Tests MUST fail before implementation begins
- Complexity additions require justification (see Complexity Tracking in plan.md)
- Code structure MUST match documented architecture in plan.md
- Error handling and logging MUST be included for user story operations

### Implementation Quality

- Exact file paths required in task descriptions
- Each user story includes clear independent test description
- Checkpoints mark fully functional, testable story completion
- Parallel tasks marked [P] MUST have no file or dependency conflicts
- Foundation phase completion required before any user story work begins

### Design Reference Standards

**Reference Material Location**: `reference/` directory contains Stitch-generated designs

**Usage Rules**:
- Reference designs are **visual guides only** - NEVER copy code directly
- ALL implementations MUST use CareNavi design system and SpecKit workflow
- Reference `screen.png` images to understand layout and user interactions
- Analyze `code.html` files only to extract:
  - Layout structure and component hierarchy
  - Interactive element patterns
  - Data entity requirements
  - Information architecture
- Rebuild ALL components using Shadcn/UI (NOT custom Tailwind from Stitch)
- Replace Material Symbols icons with Lucide React equivalents
- Apply CareNavi color tokens (NOT Stitch hardcoded values)
- Document reference mapping in feature specification

**Workflow Integration**:
1. Reference design screenshot in `/speckit.specify` prompt
2. Include reference path in spec.md "Design Reference" section
3. Map Stitch components to Shadcn/UI in plan.md
4. Justify any deviations from reference in Complexity Tracking

**Constitutional Violations**:
- Copying Stitch code without SpecKit workflow is a MAJOR violation
- Bypassing design system tokens is grounds for implementation rejection
- Skipping user story creation for reference features violates Principle I

See `reference/README.md` for detailed reference usage guidelines.

## Governance

### Constitutional Authority

This constitution supersedes all other development practices, guidelines, and preferences. When conflicts arise between this constitution and other documentation, the constitution prevails.

### Amendment Process

1. Amendments require:
   - Clear documentation of the change and rationale
   - Version bump following semantic versioning (MAJOR.MINOR.PATCH)
   - Update to LAST_AMENDED_DATE (ISO 8601 format: YYYY-MM-DD)
   - Sync Impact Report prepended to constitution file
   - Validation that all dependent templates remain consistent

2. Version Bump Rules:
   - **MAJOR**: Backward incompatible changes (principle removal/redefinition, workflow breaking changes)
   - **MINOR**: New principles added, materially expanded guidance, new mandatory sections
   - **PATCH**: Clarifications, wording improvements, typo fixes, non-semantic refinements

3. Amendment Execution:
   - Run `/speckit.constitution` with proposed changes
   - System validates consistency across all templates
   - System generates Sync Impact Report documenting affected artifacts
   - Manual review of flagged templates required before ratification

### Compliance Review

- Every feature MUST include constitution check gate in plan.md (before Phase 0 research)
- Constitution check MUST be re-run after Phase 1 design
- All violations MUST be justified in Complexity Tracking table
- Unjustified complexity additions are grounds for plan rejection
- Pull requests MUST verify constitutional compliance before merge

### Runtime Guidance

For AI agents and developers using this system:
- Primary guidance source: This constitution file (`.specify/memory/constitution.md`)
- Command-specific guidance: `.claude/commands/speckit.*.md` files
- Template guidance: `.specify/templates/*.md` files (contains ACTION REQUIRED comments)
- When guidance conflicts, constitution principles override all other sources

**Version**: 1.2.0 | **Ratified**: 2025-11-21 | **Last Amended**: 2025-11-21
