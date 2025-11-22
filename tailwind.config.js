/**
 * CareNavi Tailwind CSS Configuration
 * Design System: Clean, Medical, Trustworthy
 *
 * This configuration extends Tailwind CSS with CareNavi-specific design tokens.
 * All values align with the CareNavi Constitution (v1.1.0).
 *
 * @see .specify/memory/constitution.md - Design System Consistency principle
 * @see styles/global.css - CSS custom properties
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      /**
       * ========================================================================
       * Color Palette - CareNavi Design System
       * ========================================================================
       */
      colors: {
        // Semantic color naming for Shadcn/UI compatibility
        border: 'hsl(var(--color-border) / <alpha-value>)',
        input: 'hsl(var(--color-border) / <alpha-value>)',
        ring: 'hsl(var(--color-primary) / <alpha-value>)',
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-text-primary) / <alpha-value>)',

        // Primary accent color - Blue (Trustworthy, Medical)
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
          foreground: '#FFFFFF',
        },

        // Neutral gray scale - Supporting colors
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },

        // Status colors
        success: {
          DEFAULT: '#10B981', // green-500
          light: '#D1FAE5',   // green-100
          dark: '#065F46',    // green-800
        },
        warning: {
          DEFAULT: '#F59E0B', // amber-500
          light: '#FEF3C7',   // amber-100
          dark: '#92400E',    // amber-800
        },
        error: {
          DEFAULT: '#EF4444', // red-500
          light: '#FEE2E2',   // red-100
          dark: '#991B1B',    // red-800
        },
        info: {
          DEFAULT: '#3B82F6', // blue-500 - same as primary
          light: '#DBEAFE',   // blue-100
          dark: '#1E40AF',    // blue-800
        },

        // Shadcn/UI semantic colors
        secondary: {
          DEFAULT: '#F3F4F6', // gray-100
          foreground: '#111827', // gray-900
        },
        destructive: {
          DEFAULT: '#EF4444', // red-500
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F9FAFB', // gray-50
          foreground: '#6B7280', // gray-500
        },
        accent: {
          DEFAULT: '#EFF6FF', // blue-50
          foreground: '#1E40AF', // blue-800
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#111827', // gray-900
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#111827', // gray-900
        },
      },

      /**
       * ========================================================================
       * Typography - CareNavi Design System
       * ========================================================================
       */
      fontFamily: {
        sans: [
          'Inter',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Fira Code',
          'Fira Mono',
          'Roboto Mono',
          'monospace',
        ],
      },

      fontSize: {
        // Following Tailwind defaults with explicit line heights
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
      },

      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      /**
       * ========================================================================
       * Spacing & Layout - CareNavi Design System
       * ========================================================================
       */
      spacing: {
        // Extend Tailwind's default spacing scale with custom values
        sidebar: '16rem',     // 256px - desktop sidebar width
        navbar: '4rem',       // 64px - mobile navbar height
      },

      maxWidth: {
        'content': '1280px',  // 80rem - max content width
      },

      /**
       * ========================================================================
       * Border Radius
       * ========================================================================
       */
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },

      /**
       * ========================================================================
       * Shadows - Glassmorphism & Clean Design
       * ========================================================================
       */
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        // Glassmorphism micro shadow
        glass: '0 2px 8px 0 rgba(31, 38, 135, 0.07)',
      },

      /**
       * ========================================================================
       * Animation & Transitions
       * ========================================================================
       */
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },

      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
      },

      /**
       * ========================================================================
       * Keyframes & Animations for Shadcn/UI
       * ========================================================================
       */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
      },

      /**
       * ========================================================================
       * Screens (Breakpoints) - Mobile-First Approach
       * ========================================================================
       * Minimum support: iPhone SE (375px) to 4K desktop (3840px)
       */
      screens: {
        'xs': '375px',   // iPhone SE (minimum support)
        'sm': '640px',   // Small tablets
        'md': '768px',   // iPad portrait
        'lg': '1024px',  // iPad landscape, small desktops
        'xl': '1280px',  // Desktop
        '2xl': '1536px', // Large desktop
        '3xl': '1920px', // Full HD
        '4xl': '2560px', // 2K
        '5xl': '3840px', // 4K
      },
    },
  },
  plugins: [
    // Uncomment after installing: npm install tailwindcss-animate
    // require('tailwindcss-animate'),

    // Add other plugins as needed:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
