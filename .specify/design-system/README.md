# CareNavi Design System

**Version**: 1.1.0
**Last Updated**: 2025-11-21
**Status**: Active

## Overview

The CareNavi design system provides a cohesive visual language and component library for building clean, trustworthy, and medical-grade user interfaces. All design decisions are codified in the [CareNavi Constitution](./../memory/constitution.md) (Principle VI: Design System Consistency).

## Design Aesthetic

**Core Values**: Clean, Medical, Trustworthy

- **Clean**: Minimal visual clutter, generous white space, clear information hierarchy
- **Medical**: Professional appearance, accessibility-focused, data visualization clarity
- **Trustworthy**: Consistent patterns, predictable interactions, reliable feedback

## Quick Start

### 1. Import Global Styles

```tsx
// In your root component (e.g., app/layout.tsx, pages/_app.tsx)
import '@/styles/global.css';
```

### 2. Configure Tailwind CSS

The [tailwind.config.js](../../tailwind.config.js) is pre-configured with CareNavi design tokens. Ensure it's in your project root.

### 3. Use Design Tokens

```tsx
// ✅ CORRECT: Use Tailwind classes or CSS variables
<button className="bg-primary text-white rounded-md px-4 py-2">
  Click Me
</button>

// ✅ CORRECT: Use CSS custom properties
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Content
</div>

// ❌ INCORRECT: Never hardcode values
<button style={{ backgroundColor: '#3B82F6' }}>
  Click Me
</button>
```

## Color Palette

### Primary Accent - Blue Shade

**Purpose**: Interactive elements, primary actions, chart highlights, links

```css
/* Main primary color */
--color-primary: #3B82F6 (blue-500)

/* Variants */
--color-primary-50: #EFF6FF   /* Very light backgrounds */
--color-primary-100: #DBEAFE  /* Light backgrounds */
--color-primary-500: #3B82F6  /* Main accent */
--color-primary-600: #2563EB  /* Hover states */
--color-primary-700: #1D4ED8  /* Active/pressed states */
```

**Tailwind Classes**: `bg-primary`, `text-primary`, `border-primary`, `hover:bg-primary-600`

**Use Cases**:
- Primary buttons
- Links and anchors
- Selected/active states
- Chart main data series
- Icons for primary actions
- Focus rings

### Background Colors

**Purpose**: Page backgrounds, card surfaces, clean open feeling

```css
--color-background: #FFFFFF          /* Main background (pure white) */
--color-background-secondary: #F9FAFB /* Secondary background (gray-50) */
```

**Tailwind Classes**: `bg-white`, `bg-gray-50`

**Use Cases**:
- Main page background: `bg-gray-50`
- Card/modal surfaces: `bg-white`
- Alternating table rows: `bg-gray-50`

### Neutral Gray Scale

**Purpose**: Text, borders, dividers, secondary UI elements

```css
--color-gray-50: #F9FAFB    /* Very light backgrounds */
--color-gray-200: #E5E7EB   /* Borders, dividers */
--color-gray-400: #9CA3AF   /* Tertiary text, placeholders */
--color-gray-500: #6B7280   /* Secondary text */
--color-gray-900: #111827   /* Primary text */
```

**Tailwind Classes**: `text-gray-900`, `text-gray-500`, `border-gray-200`

**Use Cases**:
- Primary text: `text-gray-900`
- Secondary text (labels, descriptions): `text-gray-500`
- Tertiary text (placeholders, hints): `text-gray-400`
- Borders: `border-gray-200`
- Disabled states: `bg-gray-100 text-gray-400`

### Status Colors

**Purpose**: User feedback, notifications, alerts, data visualization

```css
--color-success: #10B981  /* green-500 */
--color-warning: #F59E0B  /* amber-500 */
--color-error: #EF4444    /* red-500 */
--color-info: #3B82F6     /* blue-500 - same as primary */
```

**Tailwind Classes**: `bg-success`, `text-error`, `border-warning`

**Use Cases**:
- Success messages, completed states: `text-success`
- Warnings, caution states: `text-warning`
- Errors, destructive actions: `text-error`
- Informational messages: `text-info`

## Typography

### Font Families

**Primary**: Inter (preferred) or Pretendard
**Fallback**: System sans-serif stack
**Monospace**: SF Mono, Monaco, Fira Code

```css
--font-sans: 'Inter', 'Pretendard', -apple-system, ...
--font-mono: 'SF Mono', 'Monaco', 'Fira Code', ...
```

**Setup**:

```tsx
// In your HTML head or layout component
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Or use Next.js font optimization:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Type Scale

| Size | Tailwind | CSS Value | Use Case |
|------|----------|-----------|----------|
| xs | `text-xs` | 12px / 0.75rem | Fine print, badges, labels |
| sm | `text-sm` | 14px / 0.875rem | Secondary text, table cells |
| base | `text-base` | 16px / 1rem | Body text (default) |
| lg | `text-lg` | 18px / 1.125rem | Emphasized body text |
| xl | `text-xl` | 20px / 1.25rem | Subheadings |
| 2xl | `text-2xl` | 24px / 1.5rem | H3 headings |
| 3xl | `text-3xl` | 30px / 1.875rem | H2 headings |
| 4xl | `text-4xl` | 36px / 2.25rem | H1 headings, page titles |
| 5xl | `text-5xl` | 48px / 3rem | Hero text, marketing |

### Font Weights

| Weight | Tailwind | CSS Value | Use Case |
|--------|----------|-----------|----------|
| Normal | `font-normal` | 400 | Body text |
| Medium | `font-medium` | 500 | Emphasized text, labels |
| Semibold | `font-semibold` | 600 | Headings, buttons |
| Bold | `font-bold` | 700 | Strong emphasis |

### Typography Hierarchy

```tsx
// Page Title (H1)
<h1 className="text-4xl font-semibold text-gray-900">
  Patient Dashboard
</h1>

// Section Title (H2)
<h2 className="text-3xl font-semibold text-gray-900">
  Recent Activity
</h2>

// Subsection Title (H3)
<h3 className="text-2xl font-semibold text-gray-900">
  Vital Signs
</h3>

// Body Text
<p className="text-base text-gray-900">
  Regular body text content goes here.
</p>

// Secondary Text
<p className="text-sm text-gray-500">
  Additional information or descriptions.
</p>

// Tertiary Text
<span className="text-xs text-gray-400">
  Fine print or metadata.
</span>
```

## Spacing & Layout

### Spacing Scale

Use Tailwind's spacing utilities (`p-*`, `m-*`, `gap-*`) based on the scale:

| Token | Value | Tailwind | Use Case |
|-------|-------|----------|----------|
| 1 | 4px | `p-1`, `m-1` | Tight spacing |
| 2 | 8px | `p-2`, `m-2` | Small gaps |
| 3 | 12px | `p-3`, `m-3` | Compact padding |
| 4 | 16px | `p-4`, `m-4` | Standard padding |
| 6 | 24px | `p-6`, `m-6` | Card padding (default) |
| 8 | 32px | `p-8`, `m-8` | Section spacing |
| 12 | 48px | `p-12`, `m-12` | Large sections |

### Layout Dimensions

```css
--sidebar-width-desktop: 16rem (256px)
--navbar-height-mobile: 4rem (64px)
--content-max-width: 1280px (80rem)
```

**Tailwind Classes**: `w-sidebar`, `h-navbar`, `max-w-content`

### Border Radius

| Token | Value | Tailwind | Use Case |
|-------|-------|----------|----------|
| sm | 4px | `rounded-sm` | Small elements, badges |
| md | 6px | `rounded-md` | Buttons, inputs (default) |
| lg | 8px | `rounded-lg` | Cards, modals |
| xl | 12px | `rounded-xl` | Large cards |
| full | 9999px | `rounded-full` | Pills, avatars |

### Shadows

| Token | Tailwind | Use Case |
|-------|----------|----------|
| sm | `shadow-sm` | Subtle depth, input focus |
| md | `shadow-md` | Cards, dropdowns (default) |
| lg | `shadow-lg` | Modals, popovers |
| xl | `shadow-xl` | Large overlays, sheets |

## UI Components

### Component Library

**Primary**: [Shadcn/UI](https://ui.shadcn.com/) (Radix UI based)

Shadcn/UI provides accessible, composable primitives that integrate perfectly with our Tailwind configuration.

**Installation**:

```bash
npx shadcn-ui@latest init
```

When prompted, use these settings:
- Style: Default
- Base color: Blue
- CSS variables: Yes

**Commonly Used Components**:
- Button
- Card
- Input
- Label
- Select
- Dialog
- Sheet (for mobile menu)
- Toast (for notifications)
- Accordion
- Tabs
- Table

### Icons

**Library**: [Lucide React](https://lucide.dev/)

```bash
npm install lucide-react
```

**Usage**:

```tsx
import { User, Settings, ChevronRight } from 'lucide-react';

<User className="w-5 h-5 text-primary" />
<Settings className="w-4 h-4 text-gray-500" />
<ChevronRight className="w-6 h-6" />
```

**Icon Sizes**:
- Small: `w-4 h-4` (16px) - inline with text
- Medium: `w-5 h-5` (20px) - buttons, list items
- Large: `w-6 h-6` (24px) - prominent actions

### Charts & Data Visualization

**Library**: [Recharts](https://recharts.org/)

```bash
npm install recharts
```

**Color Guidelines**:
- Primary data series: `--color-primary` (#3B82F6)
- Secondary series: `--color-gray-500` (#6B7280)
- Positive trends: `--color-success` (#10B981)
- Negative trends: `--color-error` (#EF4444)
- Neutral: `--color-gray-400` (#9CA3AF)

**Example**:

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

<LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
  <XAxis dataKey="date" stroke="#6B7280" />
  <YAxis stroke="#6B7280" />
  <Tooltip />
  <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
</LineChart>
```

## Layout Patterns

### Desktop Layout

**Pattern**: Persistent left sidebar navigation

```tsx
<div className="flex min-h-screen">
  {/* Sidebar - 256px wide */}
  <aside className="hidden lg:block w-sidebar bg-white border-r border-gray-200">
    <nav className="p-4">
      {/* Navigation items */}
    </nav>
  </aside>

  {/* Main content */}
  <main className="flex-1 bg-gray-50">
    <div className="max-w-content mx-auto p-6">
      {/* Page content */}
    </div>
  </main>
</div>
```

### Mobile Layout

**Pattern**: Top navigation bar with hamburger menu (Sheet component)

```tsx
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

<div className="lg:hidden">
  {/* Mobile navbar - 64px tall */}
  <header className="h-navbar bg-white border-b border-gray-200 flex items-center px-4">
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left">
        <nav>
          {/* Navigation items */}
        </nav>
      </SheetContent>
    </Sheet>

    <h1 className="ml-4 text-lg font-semibold">CareNavi</h1>
  </header>

  <main className="bg-gray-50">
    {/* Page content */}
  </main>
</div>
```

### Responsive Breakpoints

| Breakpoint | Width | Tailwind | Target Devices |
|------------|-------|----------|----------------|
| xs | 375px | `xs:` | iPhone SE (minimum) |
| sm | 640px | `sm:` | Small tablets |
| md | 768px | `md:` | iPad portrait |
| lg | 1024px | `lg:` | iPad landscape, small desktops |
| xl | 1280px | `xl:` | Desktop |
| 2xl | 1536px | `2xl:` | Large desktop |

**Mobile-First Approach**:

```tsx
// Base styles apply to mobile (375px+)
// Then progressively enhance for larger screens
<div className="p-4 lg:p-6 xl:p-8">
  <h1 className="text-2xl lg:text-3xl xl:text-4xl">
    Responsive Heading
  </h1>
</div>
```

## User Feedback

### Toast Notifications

Use Shadcn/UI Toast component for user feedback:

```bash
npx shadcn-ui@latest add toast
```

**Usage**:

```tsx
import { useToast } from '@/components/ui/use-toast';

const { toast } = useToast();

// Success
toast({
  title: 'Success',
  description: 'Your changes have been saved.',
  variant: 'default',
});

// Error
toast({
  title: 'Error',
  description: 'Something went wrong. Please try again.',
  variant: 'destructive',
});

// Info
toast({
  title: 'Information',
  description: 'Your session will expire in 5 minutes.',
});
```

### Loading States

Use consistent loading indicators:

```tsx
import { Loader2 } from 'lucide-react';

// Spinning loader
<Loader2 className="w-5 h-5 animate-spin text-primary" />

// Button loading state
<button disabled className="bg-primary text-white px-4 py-2 rounded-md">
  <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
  Loading...
</button>
```

## Component Examples

### Card

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Patient Information</CardTitle>
    <CardDescription>View and manage patient details</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>
```

### Button

```tsx
import { Button } from '@/components/ui/button';

// Primary action
<Button variant="default" size="default">
  Save Changes
</Button>

// Secondary action
<Button variant="secondary">
  Cancel
</Button>

// Destructive action
<Button variant="destructive">
  Delete
</Button>

// With icon
<Button>
  <Plus className="w-4 h-4 mr-2" />
  Add Patient
</Button>
```

### Input

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
  />
</div>
```

## Accessibility

All components MUST meet WCAG 2.1 AA standards:

- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements focusable and operable
- **Focus Indicators**: Visible focus rings using `focus:ring-2 focus:ring-primary`
- **Screen Readers**: Semantic HTML, ARIA labels where needed
- **Touch Targets**: Minimum 44x44px for mobile interactions

## Do's and Don'ts

### ✅ DO

- Use Tailwind classes or CSS custom properties
- Follow the type scale for consistent hierarchy
- Use Shadcn/UI components for complex interactions
- Apply focus states to all interactive elements
- Test on mobile devices (minimum iPhone SE)
- Use the primary blue color for all interactive elements
- Maintain generous white space for clean aesthetic
- Use Recharts with primary color for data visualization

### ❌ DON'T

- Hardcode color values directly in components
- Mix different icon libraries
- Create custom buttons when Shadcn/UI provides them
- Use CSS-in-JS libraries that conflict with Tailwind
- Ignore mobile breakpoints
- Use colors outside the defined palette
- Create dense, cluttered layouts
- Override Shadcn/UI component styles without justification

## Resources

- **Constitution**: [.specify/memory/constitution.md](./../memory/constitution.md)
- **Global CSS**: [styles/global.css](../../styles/global.css)
- **Tailwind Config**: [tailwind.config.js](../../tailwind.config.js)
- **Shadcn/UI Docs**: https://ui.shadcn.com/
- **Lucide Icons**: https://lucide.dev/
- **Recharts Docs**: https://recharts.org/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

## Changelog

### Version 1.1.0 (2025-11-21)

- Initial design system establishment
- Defined color palette (primary blue #3B82F6, gray scale, status colors)
- Specified typography (Inter/Pretendard, type scale, weights)
- Documented UI component stack (Shadcn/UI, Lucide, Recharts)
- Established layout patterns (desktop sidebar, mobile hamburger)
- Created global.css with CSS custom properties
- Created tailwind.config.js with design tokens
- Aligned with CareNavi Constitution v1.1.0
