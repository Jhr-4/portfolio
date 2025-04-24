# Implementation Guide: The Sage/Explorer/Creator

Welcome! This guide details the technical implementation of the portfolio, aligning with the **Sage/Explorer/Creator** brand archetype. It focuses on **clarity, precision, structured innovation, and accessibility** to create a professional and compelling experience for recruiters and visitors.

## Implementation

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS, CSS variables, shadcn/ui
- **Structure:**
  - src/app/: Pages, layout, global styles
  - src/components/: UI and navigation components
  - src/lib/: Utility functions
  - docs/: Design system and project docs
- **Dark theme:** Default, with all colors as CSS variables
- **Responsive:** Uses Tailwind grid/flex utilities
- **Accessibility:** All text and UI meet contrast and keyboard/focus standards
- **Add components:** Use shadcn/ui CLI or create in src/components/

## Core Technologies

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **Icons:** Google Material Icons, Lucide React
*   **Linting/Formatting:** ESLint, Prettier

## Project Structure

*   `src/app/`: Contains page routes, global layout (`layout.tsx`), and global styles (`globals.css`).
*   `src/components/`: Reusable React components.
    *   `src/components/ui/`: Unstyled components from shadcn/ui (Button, Card, etc.).
    *   `src/components/main-nav.tsx`: Main navigation (Server Component).
    *   `src/components/mobile-nav.tsx`: Mobile navigation (Client Component).
    *   `src/components/playground/`: Contains playground project registration and format definitions.
*   `src/lib/`: Utility functions (e.g., `cn` from shadcn/ui, as well as formatDate, debounce, etc. for future use).
*   `public/`: Static assets (images, icons).
*   `docs/`: Design system documentation.
*   Configuration files (`tailwind.config.mjs`, `tsconfig.json`, etc.) in the root.

## Digital Sandbox Implementation

The "Digital Sandbox" concept unifies both the Interactive Playground and Portfolio Collection sections of the site. This concept is implemented through several key elements:

### Unified Visual Design

Both the playground and projects pages share:

1. **Common Title:** "Welcome to my Digital Sandbox" appears at the top of both pages
2. **Tabbed Navigation:** A tab-like toggle component that allows users to switch between Interactive Playground and Portfolio Collection
3. **Shared Visual Language:** Both pages implement the same visual sandbox metaphor with grid lines, gradients, and animated elements

### Creative Sandbox Visual Component

This custom-built visual element was added to both pages to reinforce the sandbox concept:

**Key Features:**
- Grid lines representing a development environment
- Gradient "sand" texture at the bottom
- Animated concept words with contextually relevant terms (Explore/Build/Learn for playground, Design/Develop/Deploy for projects)
- Code element with a tag and blinking cursor

### Custom Animations

Simple animations are defined in globals.css to enhance the visual experience:
- A blinking cursor effect that mimics code editors
- Pulse animations using Tailwind's built-in utilities
- Animation delays for staggered effects

### Implementation in Page Structure

Both pages follow a similar structure:

1. Main title ("Welcome to my Digital Sandbox")
2. Toggle navigation between sections
3. Brief descriptive text
4. Creative sandbox visual
5. Content grid (project cards)

This creates a cohesive experience while still differentiating between experimental projects and portfolio work.

## Playground and Projects Section

The portfolio includes a unified "Digital Sandbox" concept that encompasses both the Interactive Playground projects and the Portfolio Collection. These sections share a consistent visual language but represent different aspects of the work:

### Shared Design Elements

1. **Page Title:** Both pages use "Welcome to my Digital Sandbox" as the title
2. **Toggle Navigation:** Users can switch between the Interactive Playground and Portfolio Collection
3. **Creative Sandbox Visual:** Both pages incorporate a creative visual element with:
   - Grid lines in the background representing a development environment
   - A gradient "sand" texture at the bottom 
   - Animated concept words with staggered pulse animations
   - A code-inspired element with a blinking cursor animation

### Interactive Playground Section

- **Purpose:** Showcases small, experimental interactive projects
- **Implementation:** Each playground project is fully contained within its own page
- **Project Card Grid:** Displays all available interactive projects with thumbnails
- **Launch Action:** Users can launch each interactive project in its own page
- **Featured Projects:** 
  - Coin Flip: A simple interactive game demonstrating state management
  - D3 Data Visualizations: Advanced data visualization exploring labor productivity trends

### Portfolio Collection Section

- **Purpose:** Showcases more polished external projects and collaborations
- **Implementation:** Uses a similar card-based grid layout
- **External Links:** Cards link to external project deployments when available

### Custom Animations

The project includes custom animations for enhanced visual interest:

```css
@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.animate-blink {
  animation: blink 1.2s infinite steps(1);
}

@keyframes spinner {
  to {transform: rotate(360deg);}
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 3px solid hsl(var(--muted)/0.2);
  border-top-color: hsl(var(--primary));
  animation: spinner 0.8s linear infinite;
}
```

The spinner animation is used for loading states in data visualizations, providing a consistent user experience while data is being fetched.

## D3.js Data Visualization Implementation

The portfolio includes an advanced data visualization project exploring the relationship between productivity growth and worker compensation from 1979-2024. This section details the technical implementation of this feature.

### Architecture Overview

1. **Integration Approach:** 
   - The visualization uses D3.js for direct SVG manipulation within React components
   - React manages component lifecycle while D3 handles the rendering of complex visualizations
   - TypeScript interfaces ensure type safety throughout the visualization components

2. **Chart Components:**
   - `LinePlot.tsx`: Renders time-series data with interactive hover effects
   - `BarChart.tsx`: Creates responsive bar charts with tooltip interactions
   - `PieChart.tsx`: Generates pie/donut charts with custom legends and accessible colors
   - All components share a consistent API pattern for reusability

3. **Data Flow:**
   - CSV data stored in `/public/csv/` directory
   - Components handle data fetching, parsing and validation internally
   - Error states and loading states managed within components
   - Data transformations performed within each component as needed

### Key Technical Features

1. **Responsive Design:**
   - Charts resize dynamically using ResizeObserver
   - Different layouts and optimizations for mobile vs. desktop
   - Consistent minimum dimensions to preserve readability
   - Horizontally scrollable on small screens when needed

2. **Accessibility:**
   - Screen reader support with ARIA labels and sr-only text
   - Keyboard navigation for interactive elements
   - Color contrast compliance with theme variables
   - Focus states for interactive elements

3. **Performance Optimizations:**
   - Efficient data handling with proper cleanup
   - Conditional rendering to prevent unnecessary redraws
   - SVG optimizations for smoother interactions
   - Debounced resize handling

4. **User Experience:**
   - Consistent loading states with custom spinner animation
   - Interactive tooltips with position awareness (stays within viewport)
   - Animated transitions between states
   - Consistent theme integration using CSS variables

### Styling Integration

The D3 visualizations are integrated with the design system:

1. **Color System Integration:**
   - Primary color used for main data series
   - Accent color for comparison data series
   - Muted colors for grid lines and secondary elements
   - Background and card colors for containers

2. **Typography Integration:**
   - Serif fonts for titles and headings
   - Sans-serif for data labels and explanatory text
   - Responsive font sizing based on viewport and chart dimensions

3. **Layout Integration:**
   - Charts follow the same spacing system as other components
   - Consistent padding and margins using the design system spacing scale
   - Proper card and border styling matching other components

### Interactive Narrative Structure

The D3 visualization project is structured as a narrative data story:

1. **Section Navigation:**
   - Tab-like navigation between three data story sections
   - Each section builds on insights from previous sections
   - Interactive links embedded in the narrative for progressive disclosure

2. **Content Sections:**
   - "Analyzing the Trend": Compares productivity growth with earnings/compensation
   - "Where Profits Go?": Examines corporate profits and productivity factors
   - "Key Takeaways": Summarizes findings with essential statistics

3. **Contextual Information:**
   - Each visualization is accompanied by explanatory text
   - Key statistics highlighted with strong tags
   - Data sources properly attributed

4. **User Controls:**
   - Interactive hover states for data exploration
   - Section navigation with smooth scrolling
   - Responsive controls that work across devices

## Navigation Structure

The site features a responsive navigation system that adapts to different screen sizes:

1. **Desktop Navigation (`main-nav.tsx`):**
   - Horizontal navigation bar with brand logo
   - Direct links to main sections (Home, About, Projects)
   - Server-side rendered for better performance

2. **Mobile Navigation (`mobile-nav.tsx`):**
   - Client-side component with dynamic import
   - Uses Sheet component for slide-out menu
   - Same routes as desktop navigation
   - Hamburger menu trigger with Lucide React icons

3. **Section Toggle:**
   - Within the Projects/Playground pages, users can toggle between sections
   - Visual indicators show the current active section

## Fonts and Icons

1. **Fonts:**
   - Primary font (sans): Inter from Google Fonts
   - Secondary font (serif): Source Serif 4 from Google Fonts
   - Set as CSS variables (`--font-sans`, `--font-serif`) and applied via Tailwind

2. **Icons:**
   - Google Material Icons (loaded via CDN in layout.tsx)
   - Lucide React for specific UI elements

## Dark Theme Implementation

The site uses a dark theme by default, with all colors defined as CSS variables directly on the root element:

```css
:root {
  --background: 224 71% 4%;      /* #111827 */
  --foreground: 215 20% 96%;     /* #F3F4F6 */
  --card: 222 47% 11%;           /* #1F2937 */
  --card-foreground: 215 20% 96%;/* #F3F4F6 */
  --primary: 217 91% 72%;        /* #60A5FA */
  --primary-foreground: 221 83% 18%; /* #1E3A8A */
  --accent: 170 70% 75%;         /* #5EEAD4 */
  --accent-foreground: 170 80% 20%; /* #115E59 */
  --muted: 217 33% 27%;          /* #374151 */
  --muted-foreground: 215 14% 65%; /* #9CA3AF */
  --border: 217 33% 27%;         /* #374151 */
  --input: 217 33% 27%;
  --ring: 217 91% 72%;           /* #60A5FA */
  --destructive: 0 72% 61%;      /* #F87171 */
  --destructive-foreground: 0 0% 100%;
  --radius: 0.5rem;
  --line-height-body: 1.7;
}
```

While `tailwind.config.mjs` is configured with `darkMode: "class"`, the project currently uses a single dark theme applied by default without theme switching functionality. All components leverage these CSS variables through Tailwind's color utilities like `bg-background`, `text-foreground`, etc.

## Styling Implementation

1.  **Tailwind CSS:** Utility classes are used directly in components for layout, spacing, typography, etc.
2.  **CSS Variables:** Colors and border radius are defined as CSS variables in `src/app/globals.css` under the `:root` selector, following shadcn/ui conventions.
3.  **`tailwind.config.mjs`:**
    *   Configured for dark mode (`darkMode: ["class"]`).
    *   Extends the theme to map CSS variables to Tailwind color names (e.g., `primary: "hsl(var(--primary))"`).
    *   Extends the theme for custom spacing scale.
    *   Configures fonts (`fontFamily`).
    *   Includes `tailwindcss-animate` plugin.
4.  **`globals.css`:**
    *   Imports Tailwind base, components, and utilities.
    *   Defines CSS variables for the dark theme.
    *   Applies base styles (body background/text, heading fonts, link styles, etc.) using `@layer base`.
    *   Removes default margins from headings/paragraphs.
5.  **`cn` Utility:** Used within components to merge default styles with variant or prop-based styles.

## Key Files for Theming

*   `docs/03-color-system.md`: Defines the color palette and rationale.
*   `docs/02-typography.md`: Defines font choices and base styles.
*   `src/app/globals.css`: Contains CSS variable definitions and base element styles.
*   `tailwind.config.mjs`: Configures Tailwind to use the CSS variables and custom scales.

## Adding New Components

1.  **Shadcn/ui:** Use the CLI: `npx shadcn-ui@latest add [component-name]`
2.  **Custom Component:**
    *   Create the file in `src/components/`.
    *   Use existing shadcn/ui components or HTML elements.
    *   Style using Tailwind utility classes.
    *   Use `cn` for conditional classes if needed.
    *   Determine if it needs to be a Client Component (`"use client"`) or Server Component (default).

## Metadata and SEO

The site includes comprehensive metadata for search engine optimization:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Jay Rana - Software Developer Portfolio",
    template: "%s | Jay Rana Portfolio",
  },
  description: "Showcasing my software development projects and skills. Explore my work in web development, problem-solving, and more.",
  authors: [{ name: "Jay Rana" }],
  keywords: ["software developer", "portfolio", "web development", "full stack", "react", "nextjs", "typescript", "projects", "Jay Rana", "personal website"]
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(var(--background))" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(var(--background))" },
  ],
  width: "device-width",
  initialScale: 1,
};
```

## Configuration Files

### Tailwind Configuration (`tailwind.config.mjs`)

This configuration needs to be updated to reflect the Sage/Explorer/Creator color system, typography, and spacing defined in `docs/02-typography.md`, `docs/03-color-system.md`, and `docs/04-spacing-layout.md`.

```typescript
// tailwind.config.mjs (Updated Example)
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Use class strategy
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define sans and serif based on docs/02-typography.md
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', '"Source Serif Pro"', 'serif'], // Example
      },
      colors: {
        // Define colors based on docs/03-color-system.md
        // Example using HSL variables defined in globals.css
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))", // Often set to primary
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Optional: Define if needed
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Teal/Emerald from docs/03
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Add specific shades if needed (e.g., primary-hover)
      },
      borderRadius: {
        // Align with shadcn/ui defaults or customize based on docs/04
        lg: "var(--radius)", // Example: 0.5rem
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        // Define spacing scale based on 4px/8px unit from docs/04
        // Example:
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        // ... add more as needed
      },
      container: {
        center: true,
        padding: "2rem", // Default padding
        screens: {
          "2xl": "1400px", // Max container width
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Ensure animate plugin is present for shadcn/ui
}
```

#### CSS Variables Implementation (`src/app/globals.css`)

Define the core color palette using HSL values in `globals.css` for light and dark modes, based on `docs/03-color-system.md`.

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Define Light Mode HSL values from docs/03 */
    --background: 0 0% 100%; /* White */
    --foreground: 222 84% 5%; /* Near Black */
    --muted: 215 20% 65%; /* Medium Gray */
    --muted-foreground: 215 16% 47%; /* Darker Gray */
    --popover: 0 0% 100%;
    --popover-foreground: 222 84% 5%;
    --card: 0 0% 100%;
    --card-foreground: 222 84% 5%;
    --border: 214 32% 91%; /* Light Gray */
    --input: 214 32% 91%;
    --primary: 217 91% 60%; /* Intelligent Blue (Tailwind blue-500) */
    --primary-foreground: 0 0% 100%; /* White */
    --secondary: 215 28% 17%; /* Optional: Darker Blue/Gray */
    --secondary-foreground: 0 0% 100%;
    --accent: 160 84% 39%; /* Teal/Emerald (Tailwind teal-500) */
    --accent-foreground: 0 0% 100%; /* Or a dark contrast color */
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --ring: 217 91% 60%; /* Primary color for focus rings */
    --radius: 0.5rem; /* Default border radius */

    /* Typography Variables from docs/02 */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-serif: 'Source Serif Pro', serif;
    --line-height-body: 1.7;
  }

  .dark {
    /* Define Dark Mode HSL values from docs/03 */
    --background: 222 47% 11%; /* Very Dark Blue/Gray (Tailwind gray-900) */
    --foreground: 210 40% 98%; /* Light Gray/Off-White */
    --muted: 217 33% 50%; /* Medium Gray */
    --muted-foreground: 215 20% 65%; /* Lighter Gray */
    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;
    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;
    --border: 217 33% 25%; /* Dark Gray */
    --input: 217 33% 25%;
    --primary: 217 91% 60%; /* Keep primary blue consistent or adjust slightly */
    --primary-foreground: 0 0% 100%;
    --secondary: 215 28% 25%; /* Optional: Slightly lighter dark blue/gray */
    --secondary-foreground: 0 0% 100%;
    --accent: 160 70% 45%; /* Adjust accent for dark mode contrast */
    --accent-foreground: 0 0% 100%;
    --destructive: 0 63% 51%;
    --destructive-foreground: 0 0% 100%;
    --ring: 217 91% 60%;
    /* Radius and fonts remain the same */
  }
}

@layer base {
  * {
    @apply border-border; /* Apply border color globally */
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
    line-height: var(--line-height-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Base Typography Styles from docs/02 */
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif font-semibold tracking-tight; /* Use Serif for headings */
  }

  h1 { @apply text-4xl lg:text-5xl xl:text-6xl; }
  h2 { @apply text-3xl lg:text-4xl; }
  h3 { @apply text-2xl lg:text-3xl; }
  h4 { @apply text-xl lg:text-2xl; }
  /* Add other heading styles as needed */

  p {
    @apply mb-4; /* Consistent paragraph spacing */
  }

  /* Add other base styles like links */
  a {
    @apply text-primary underline-offset-4 hover:underline;
  }
}
```

## Implementation Checklist

### 1. Typography Implementation

1.  **Install Fonts:** Ensure `Inter` and `Source Serif Pro` (or chosen alternatives) are installed via npm (`@fontsource-variable/inter`, `@fontsource/source-serif-pro`) as shown in `docs/02-typography.md`.
2.  **Load Fonts:** Import fonts in `src/app/layout.tsx` and assign CSS variables.
    ```typescript
    // src/app/layout.tsx
    import { Inter } from 'next/font/google';
    import { Source_Serif_Pro } from 'next/font/google'; // Example import
    import './globals.css';
    import { cn } from '@/lib/utils';

    const fontSans = Inter({
      subsets: ['latin'],
      variable: '--font-sans',
      display: 'swap',
    });

    const fontSerif = Source_Serif_Pro({ // Configure weights as needed
      subsets: ['latin'],
      weight: ['400', '600', '700'],
      variable: '--font-serif',
      display: 'swap',
    });

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="en" suppressHydrationWarning>
          <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontSerif.variable
          )}>
            {/* Add ThemeProvider if implementing dark mode toggle */}
            {children}
          </body>
        </html>
      );
    }
    ```
3.  **Apply Base Styles:** Ensure `globals.css` applies `var(--font-sans)` to `body` and `var(--font-serif)` to headings (`h1`-`h6`). Set base `line-height`. (Covered in CSS Variables section above).

### 2. Color System Implementation

1.  **Define CSS Variables:** Set up HSL color variables in `globals.css` for light and dark modes (Covered above).
2.  **Configure Tailwind:** Ensure `tailwind.config.mjs` references these CSS variables for `colors`, `borderColor`, `backgroundColor`, `textColor`, `ringColor`, etc. (Covered above).
3.  **Apply Colors:** Use Tailwind utility classes (`bg-background`, `text-foreground`, `text-primary`, `border-border`, `ring-ring`, `text-accent`) throughout components and pages.

### 3. Component Implementation (Sage/Explorer/Creator Alignment)

Refer to `docs/05-components.md` for detailed psychological principles. Apply styles consistently.

#### Example: Button (`src/components/ui/button.tsx`)

Ensure variants use the defined palette:

```typescript
// Simplified example within buttonVariants cva
variants: {
  variant: {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90", // Use primary color
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Use accent for hover
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost:
      "hover:bg-accent hover:text-accent-foreground", // Use accent for hover
    link:
      "text-primary underline-offset-4 hover:underline",
  },
  // ... sizes
},
```

#### Example: Card (`src/components/ui/card.tsx`)

Ensure card uses theme variables and appropriate spacing/rounding:

```tsx
// Simplified example within Card component
<div
  className={cn(
    "rounded-lg border bg-card text-card-foreground shadow-sm", // Use theme variables
    className
  )}
  {...props}
/>
```

#### Example: Main Navigation (`src/components/main-nav.tsx`)

Apply fonts, colors, and spacing.

```tsx
// Simplified example
<nav className="flex items-center justify-between p-4 md:px-8 border-b">
  <Link href="/" className="font-serif text-xl font-semibold text-primary">
    Your Name / Brand
  </Link>
  {/* Desktop Nav */}
  <div className="hidden md:flex items-center gap-6">
    {routes.map((route) => (
      <Link
        key={route.href}
        href={route.href}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {route.label}
      </Link>
    ))}
  </div>
  {/* Mobile Nav (Sheet Trigger) */}
  <div className="md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="font-serif">Navigation</SheetTitle>
        </SheetHeader>
        {/* ... Sheet links */}
      </SheetContent>
    </Sheet>
  </div>
</nav>
```

### 4. Content Implementation

- **Homepage (`src/app/page.tsx`):** Rewrite headings and text to be insightful, clear, and focused on skills/value proposition for recruiters. Use `font-serif` for main headings. Structure content logically using Cards or other layout elements, applying spacing from `docs/04-spacing-layout.md`.
- **About Page (`src/app/about/page.tsx`):** Reflect the Sage/Explorer/Creator journey – curiosity, learning, building.
- **Projects Page (`src/app/projects/page.tsx`):** This is critical. Use Cards or a similar structure to present projects clearly. For each project:
    - Use `font-serif` for the project title (`CardTitle`).
    - Clearly describe the problem, solution, and your role (Sage/Creator).
    - Highlight key technologies used (Precision).
    - Mention innovative aspects or challenges overcome (Explorer).
    - Include links to live demos or source code (Buttons with `primary` or `outline` variant).
    - Use the `accent` color sparingly for highlighting key results or technologies.

## Testing Protocol (Sage/Explorer/Creator Focus)

### 1. Visual & Functional Testing
- **Consistency:** Verify colors, fonts, spacing match the design system across all pages and components.
- **Responsiveness:** Test thoroughly on various screen sizes (mobile, tablet, desktop). Layout should adapt gracefully (`docs/04-spacing-layout.md`).
- **Interaction States:** Check hover, focus, active states for all interactive elements (buttons, links, inputs).
- **Browser Compatibility:** Test on major browsers (Chrome, Firefox, Safari, Edge).

### 2. Accessibility Testing (Clarity & Precision)
- **WCAG Compliance:** Use automated tools (axe-core) and manual checks to ensure AA compliance.
- **Contrast:** Verify all text meets contrast requirements (4.5:1 normal, 3:1 large) in both light and dark modes.
- **Keyboard Navigation:** Ensure all interactive elements are reachable and operable via keyboard.
- **Screen Reader:** Test with screen readers (NVDA, VoiceOver) for logical flow and clear labeling.
- **Semantic HTML:** Validate the use of correct HTML tags (headings, landmarks, lists).

### 3. Performance Testing (Efficiency)
- **Lighthouse:** Audit for Performance, Accessibility, Best Practices, SEO.
- **Core Web Vitals:** Monitor LCP, FID (or INP), CLS.
- **Bundle Size:** Analyze JavaScript bundle sizes; optimize where necessary.

### 4. Content & Messaging Review (Sage Voice)
- **Clarity:** Is the language clear, concise, and easy to understand for a recruiter audience?
- **Precision:** Is technical information accurate?
- **Insight:** Does the content convey expertise and thoughtful problem-solving?
- **Tone:** Does the voice align with the Sage/Explorer/Creator archetype (insightful, curious, competent)?

## Quality Assurance Checklist

- [ ] **Typography:** Fonts loaded correctly, hierarchy applied, line height optimal, responsive scaling works.
- [ ] **Colors:** Palette implemented correctly in light/dark modes, contrast ratios met, semantic colors used appropriately.
- [ ] **Layout & Spacing:** Consistent spacing applied, grid structure works, responsive breakpoints handled correctly, whitespace used effectively.
- [ ] **Components:** All components styled consistently, interaction states defined, accessibility features working.
- [ ] **Content:** Text updated to match brand voice, project descriptions are clear and compelling.
- [ ] **Accessibility:** WCAG AA met, keyboard navigation flawless, screen reader compatible.
- [ ] **Performance:** Lighthouse scores acceptable, Core Web Vitals healthy.
- [ ] **Functionality:** All links work, forms submit (if any), interactive elements behave as expected.

## Maintenance Guidelines

- **Consistency:** Adhere strictly to the defined typography, color, and spacing systems when adding new content or components.
- **Component Updates:** When updating shadcn/ui components, re-verify styling against the design system.
- **Documentation:** Keep these implementation docs (`06-implementation.md`) and related design docs (`01-05`) updated with any significant changes.
- **Regular Audits:** Periodically re-run accessibility and performance tests.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- Project Design Docs (`docs/01-05.md`)