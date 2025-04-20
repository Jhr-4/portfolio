# Color System

## Primary Color Palette

Our color system is designed to reflect the Sage/Explorer/Creator archetype with a thoughtful balance of intellectual depth, curiosity, and innovation.

### Core Colors

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|---------------|-------|
| Primary | `#4361EE` | bg-primary | Primary buttons, active states, links |
| Primary Dark | `#3A56D4` | bg-primary-dark | Hover states, accents |
| Secondary | `#4CC9F0` | bg-secondary | Secondary elements, highlights |
| Accent | `#F72585` | bg-accent | Call-to-action, important highlights |
| Background | `#F8FAFC` | bg-background | Page background |
| Foreground | `#0F172A` | text-foreground | Primary text color |

### Neutral Palette

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|---------------|-------|
| White | `#FFFFFF` | bg-white | Card backgrounds, UI elements |
| Gray-100 | `#F1F5F9` | bg-gray-100 | Alternative backgrounds, borders |
| Gray-200 | `#E2E8F0` | bg-gray-200 | Dividers, disabled states |
| Gray-300 | `#CBD5E1` | bg-gray-300 | Secondary borders, disabled text |
| Gray-400 | `#94A3B8` | text-gray-400 | Secondary text, placeholders |
| Gray-500 | `#64748B` | text-gray-500 | Tertiary text, helper text |
| Gray-600 | `#475569` | text-gray-600 | Supporting text |
| Gray-700 | `#334155` | text-gray-700 | Secondary headings |
| Gray-800 | `#1E293B` | text-gray-800 | Primary headings |
| Gray-900 | `#0F172A` | text-gray-900 | High-emphasis text |
| Black | `#020617` | text-black | Highest contrast text |

### Semantic Colors

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|---------------|-------|
| Success | `#10B981` | text-green-500 | Success messages, positive actions |
| Warning | `#F59E0B` | text-amber-500 | Warnings, attention required |
| Error | `#EF4444` | text-red-500 | Errors, destructive actions |
| Info | `#3B82F6` | text-blue-500 | Informational messages, hints |

## Color Application

### Text Colors

- **Primary Text**: Gray-900 for high-contrast reading
- **Secondary Text**: Gray-600 for supporting information
- **Tertiary/Helper Text**: Gray-500 for less important information
- **Interactive Text**: Primary color for links and interactive elements
- **Inverse Text**: White for text on dark backgrounds

### UI Element Colors

- **Primary Buttons**: Primary color with white text
- **Secondary Buttons**: White with Primary color border and text
- **Card Backgrounds**: White with subtle shadows
- **Hover States**: 10% darker than base component color
- **Active States**: 15% darker than base component color
- **Disabled States**: Gray-200 with Gray-400 text

### Dark Mode Adaptations

For dark mode, we invert the luminance while maintaining hues:

- **Background**: `#0F172A` (Gray-900)
- **Foreground**: `#F8FAFC` (Gray-100)
- **Surface**: `#1E293B` (Gray-800)
- **Border**: `#334155` (Gray-700)

## Color Accessibility

All color combinations have been tested to ensure:

- **WCAG 2.1 AA Compliance**: Minimum 4.5:1 contrast for normal text
- **WCAG 2.1 AAA Compliance**: 7:1 contrast for important text elements
- **Colorblind-friendly**: Tested for all forms of color blindness

## Color with Material Icons

When implementing Google Material UI icons:

1. **Icon Color Consistency**:
   - Icons should use the same color as adjacent text for visual harmony
   - Action icons should use the primary or accent color
   - Informational icons should use the appropriate semantic color

2. **Icon/Background Contrast**:
   - Ensure icons maintain proper contrast against their backgrounds
   - Use filled icons on light backgrounds and outlined icons on dark backgrounds when appropriate

3. **Color Combinations**:
   - Primary + White: Core actions and navigation
   - Secondary + Gray-800: Supporting information
   - Accent + White: Featured calls-to-action

## Color Implementation in Tailwind

Our color system is implemented in Tailwind's configuration:

```js
// Example from tailwind.config.mjs
const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  primary: {
    DEFAULT: '#4361EE',
    dark: '#3A56D4',
  },
  secondary: '#4CC9F0',
  accent: '#F72585',
  background: '#F8FAFC',
  foreground: '#0F172A',
  // ...additional colors
}
```