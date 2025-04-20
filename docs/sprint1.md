# Sprint 1: Portfolio Foundation

**Goal:** Establish the core structure and home page for a personal software developer portfolio website.

**Key Features:**

1.  **Project Setup:**
    *   Initialize Next.js project with TypeScript.
    *   Set up Tailwind CSS for styling.
    *   Integrate shadcn/ui for basic components (Button, Card).
    *   Configure basic linting and formatting (ESLint, Prettier).

2.  **Layout & Navigation:**
    *   Create a main layout (`layout.tsx`) including a header/navigation component (`MainNav`).
    *   Navigation should link to Home, About, and Projects pages.
    *   Implement responsive mobile navigation (using `Sheet` from shadcn/ui).

3.  **Home Page (`/`):**
    *   **Hero Section:**
        *   Display name prominently (e.g., "RJay1").
        *   Include a brief tagline or professional summary (e.g., "Software Developer specializing in...").
        *   Clean and focused UI.
    *   **About Snippet:**
        *   A short paragraph introducing myself and my passion for development.
    *   **Skills Section:**
        *   List key technical skills (e.g., React, Next.js, TypeScript, Node.js, CSS, HTML).
        *   Consider using tags or simple list format.
    *   **Call to Action (CTA):**
        *   A clear button or link encouraging users to view projects (e.g., "View My Work", "Explore Projects").

4.  **About Page (`/about`):**
    *   Placeholder page structure.
    *   Content to be expanded later with more detailed background, experience, and interests.

5.  **Projects Page (`/projects`):**
    *   Placeholder page structure.
    *   Basic title like "Projects".
    *   Indicate that project details will be added here soon.
    *   *(Future Implementation):* Display projects using a card layout. Each card will be clickable, leading to more details (implementation in a later sprint).

**Design System Integration:**

*   Apply basic brand colors, typography, and spacing defined in the design system documentation (`docs/` folder) to ensure consistency.
*   Focus on a clean, professional, and modern aesthetic suitable for a personal portfolio.

**Definition of Done:**

*   Project structure is set up.
*   Layout and navigation are functional on desktop and mobile.
*   Home page displays the hero section, about snippet, skills, and CTA.
*   About and Projects pages exist with placeholder content.
*   Basic styling consistent with the design system is applied.
*   Code is reasonably clean and follows basic linting rules.
*   The application runs without critical errors.
