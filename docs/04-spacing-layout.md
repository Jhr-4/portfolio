# Spacing & Layout System

## Core Principles

*   **Consistency:** Use a defined scale for margins, padding, and gaps.
*   **Hierarchy:** Use spacing to group related elements and separate unrelated ones.
*   **Responsiveness:** Adapt spacing for different screen sizes.

## Spacing Scale (Tailwind Defaults + Config)

Based on a 4px unit (Tailwind's `1` = `0.25rem` = `4px`). The `tailwind.config.mjs` extends this scale:

```javascript
// tailwind.config.mjs excerpt
 theme: {
    extend: {
      spacing: {
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
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '16': '64px',
        // ... etc.
      },
    },
  },
```

Use Tailwind utility classes like `p-4`, `m-8`, `gap-6`, `space-y-4`.

**Important Note:** Base styles in `globals.css` remove default margins from headings (`h1`-`h6`) and paragraphs (`p`). Apply vertical spacing explicitly using margin utilities (`mt-`, `mb-`) or the `space-y-*` utility on parent containers.

## Layout

*   **Container:** A centered container with horizontal padding is available via the `container` class (defined in `tailwind.config.mjs`). Max width is `1400px` (`2xl`).
    *   Usage: `<div class="container mx-auto px-4">...</div>` (Padding can be adjusted/overridden).
*   **Grid:** Use Tailwind's grid utilities (`grid`, `grid-cols-*`, `gap-*`) for multi-column layouts (e.g., project cards).
*   **Flexbox:** Use Flexbox utilities (`flex`, `items-*`, `justify-*`, `gap-*`) for component layout and alignment.

## Responsive Design

Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) to adjust spacing, layout, and typography based on screen size.

Example: `p-4 md:p-8` (More padding on medium screens and up).

## Psychological Foundation

Our layout and spacing system is designed for **clarity, intuitive navigation, and focused presentation**, reflecting the **Sage's** need for accessible knowledge, the **Explorer's** journey through information, and the **Creator's** appreciation for elegant structure. While prioritizing intellectual precision and showcasing innovation, we ensure the experience is **comfortable and inclusive** for all users. Structure and ample whitespace are used to reduce cognitive load, making complex information approachable and ensuring recruiters can easily find and digest key content.

## Spacing Scale:
*   Utilizes a consistent **8px base unit** (or 4px for finer detail) to establish a clear, predictable rhythm and visual structure, enhancing comfort through familiarity.
*   Scale provides deliberate hierarchical steps (e.g., 8, 16, 24, 32, 48, 64px...) guiding the eye naturally.
*   **Generous whitespace** is fundamental, used intentionally to:
    *   Improve **readability** and **reduce cognitive load**, making content more comfortable and accessible (Sage/Inclusivity).
    *   Create **visual breathing room**, preventing overwhelm and promoting a calm, focused experience (Comfort/Creator).
    *   Enhance the **focus** on key projects and information (Sage/Creator).
*   Responsive adjustments ensure comfortable and effective spacing across all device sizes, promoting inclusivity.

## Grid System:
*   Employs a **structured multi-column grid** (e.g., 12-column) on larger screens, providing an organized yet flexible foundation for presenting diverse content clearly. (*Creator/Sage*)
*   Defaults to a **clear, single-column layout on mobile**, ensuring core content is accessible and comfortable to navigate on any device. (*Inclusivity/Mobile-First*)
*   Establishes **clear visual hierarchy** through considered placement and alignment, making the site intuitive and easy to scan for all users. (*Sage/Inclusivity*)
*   Utilizes **sufficient padding and margins** consistently to ensure elements are well-separated, contributing to a clean, approachable, and comfortable interface free from clutter. (*Comfort/Creator*)

## Guidelines:
*   **Prioritize Clarity & Readability:** Ensure text is easily legible for all users by providing adequate spacing, line height, and avoiding overly wide text columns. This makes content accessible and comfortable to consume. (*Sage/Inclusivity/Comfort*)
*   **Structure for Effortless Scanning:** Design clear visual pathways using headings, whitespace, and consistent patterns so recruiters (and all users) can quickly and comfortably locate relevant information. (*Sage/Comfort*)
*   **Use Whitespace for Comfort & Focus:** Treat whitespace as an active element to balance the layout, reduce visual noise, and create a more relaxed, focused, and professional viewing experience. (*Creator/Comfort*)
*   **Showcase Work Thoughtfully:** Use the grid's flexibility to present projects clearly and engagingly, ensuring visual interest doesn't compromise usability or clarity. (*Explorer/Creator*)
*   **Maintain Consistency:** Apply spacing and alignment rules uniformly for a predictable, polished, and trustworthy user experience. (*Sage/Creator/Comfort*)
*   **Ensure Universal Access (Responsiveness):** Layouts must adapt fluidly and logically to all viewport sizes, guaranteeing a consistent, comfortable, and equitable experience regardless of the device used. (*Inclusivity/Explorer*)

# Spacing & Layout

- **Scale:** 4px/8px base (Tailwind spacing scale extended in config).
- **Container:** Centered, max-w-4xl/1400px, px-4 default.
- **Grid:** Used for project cards (1-2 columns responsive).
- **Flex:** Used for nav and skill tags.
- **No default margins:** Use Tailwind utilities for vertical spacing.
- **Whitespace:** Used intentionally for clarity and focus.