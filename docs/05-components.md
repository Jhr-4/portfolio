# Component Psychology System: The Sage/Explorer/Creator

## Components

Our components are designed for **clarity, precision, and intuitive interaction**, reflecting the Sage/Explorer/Creator archetype. Each component prioritizes usability, accessibility, and conveys a sense of thoughtful construction and intellectual integrity.

**Component Principles:**
- **Clarity:** Simple, unambiguous interfaces.
- **Precision:** Well-defined states, clear feedback.
- **Structure:** Consistent patterns, logical organization.
- **Accessibility:** Meeting WCAG AA standards is fundamental for clear communication. Keyboard and screen reader support are built-in.

**Examples:**
- **Buttons:** Clear affordances, precise interaction states, potentially using the primary blue for action.
- **Cards:** Structured layout, clear hierarchy, ample whitespace for focus.

**Contribution:**
- Feedback focused on enhancing clarity, usability, and alignment with the brand archetype is encouraged.

## Psychological Foundation

Our component system leverages cognitive psychology to enhance **clarity, reduce cognitive load, and support focused exploration**. Designs are informed by principles that promote efficient information processing, perceived competence, and trust – key factors for engaging recruiters.

## shadcn/ui Integration

This project utilizes [shadcn/ui](https://ui.shadcn.com/) as its component library foundation. shadcn/ui provides a collection of beautifully designed, accessible components built with Radix UI and Tailwind CSS, aligning well with the Creator's appreciation for well-crafted tools and the Sage's need for reliable structure.

### Key Benefits of shadcn/ui

- **Direct Integration**: Components are added directly to your project (`src/components/ui`), allowing for full customization and control (Creator).
- **Accessibility Foundation**: Built on Radix UI primitives, ensuring robust accessibility (Sage/Inclusivity).
- **Tailwind CSS Styling**: Leverages the project's utility-first CSS framework for consistent and precise styling (Creator/Precision).
- **Customizable**: Easily adapt components to match the Sage/Explorer/Creator visual identity defined in `03-color-system.md` and `04-spacing-layout.md`.
- **Selective Adoption**: Add only the components needed, keeping the project lean.

### Adding New shadcn/ui Components

Use the CLI to add components as needed:
```bash
npx shadcn-cli@latest add [component-name]
```
*(Note: The command might be `shadcn-cli` or `shadcn`, depending on setup. Check `components.json` or project setup.)*

Example:
```bash
npx shadcn-cli@latest add dialog
```

### Base Components (shadcn/ui) - Sage/Explorer/Creator Lens

#### Button Psychology
```tsx
// Example implementation reflecting precision and clarity
<Button variant="default" size="default">
  View Project Details
</Button>

<Button variant="outline" size="sm">
  <ExternalLink className="mr-2 h-4 w-4" />
  Live Demo
</Button>
```

**Psychological Properties:**
- **Clarity of Action:** Clear labels reduce ambiguity (Sage).
- **Interaction Feedback:** Subtle transitions provide confidence without being distracting (Creator).
- **Consistency:** Predictable appearance and behavior build trust (Sage).
- **Visual Hierarchy:** Variants (default, outline, etc.) guide attention appropriately.

#### Dropdown Menu Component
```tsx
// Example for organizing actions or navigation clearly
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
      <span className="sr-only">More options</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Code className="mr-2 h-4 w-4" />
      <span>View Source</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <ExternalLink className="mr-2 h-4 w-4" />
      <span>Visit Deployment</span>
    </DropdownMenuItem>
    {/* Add other relevant actions */}
  </DropdownMenuContent>
</DropdownMenu>
```

**Psychological Properties:**
- **Structured Choices:** Grouping related actions reduces cognitive load (Sage/Creator).
- **Progressive Disclosure:** Hides complexity until needed (Clarity).
- **Spatial Organization:** Consistent placement aids mental mapping.
- **Iconography:** Reinforces meaning quickly (Efficiency).

#### Input Fields (If used, e.g., for a contact form)
```tsx
// Example emphasizing clarity and precision
<div className="space-y-1.5">
  <Label htmlFor="message" className="font-medium">Your Message</Label>
  <Textarea
    id="message"
    placeholder="Enter your inquiry..."
    className="focus-visible:ring-primary" // Use primary color for focus ring
  />
  <p className="text-sm text-muted-foreground">Please provide details about your inquiry.</p>
</div>
```

**Cognitive Principles:**
- **Clear Labeling:** Reduces ambiguity (Sage).
- **Focus Indication:** Clear visual cue (`ring-primary`) directs attention (Precision).
- **Placeholder Text:** Guides input effectively.
- **Helper Text:** Provides context and manages expectations (Clarity).

### Complex Components

#### Dialog Psychology (Example: Project Details Modal)
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Show Project Details</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle className="font-serif text-2xl">Project Alpha Details</DialogTitle> {/* Use Serif for title */}
      <DialogDescription>
        An overview of the technical stack and key features.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4 space-y-4">
      {/* Detailed content: tech stack, challenges, solutions */}
      <p>...</p>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="secondary">
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Interaction Psychology:**
- **Focused Context:** Modal isolates information, reducing distraction (Sage).
- **Structured Presentation:** Header, content, footer create clear zones (Creator).
- **Clear Exit:** Obvious close mechanism provides user control.
- **Serif Title:** Adds intellectual weight as per typography guidelines (Sage).

#### Navigation Components

##### Main Navigation (`MainNav`)

The existing `MainNav` component uses a standard horizontal layout for desktop and a `Sheet` (drawer) for mobile. This aligns well with the need for clarity and structure.

- **Desktop:** Clear, concise links using the primary sans-serif font. Spacing should follow `04-spacing-layout.md`.
- **Mobile:** The `Sheet` component provides a focused, accessible navigation experience.

**Psychological Benefits:**
- **Familiar Patterns:** Reduces learning curve (Efficiency).
- **Responsive Clarity:** Adapts structure appropriately for different contexts (Sage/Creator).
- **Clean Presentation:** Avoids clutter, especially on mobile (Clarity).

##### Sheet (Drawer) Component (`src/components/ui/sheet.tsx`)

The Sheet component provides the mobile navigation drawer.

**Features:**
- **Side-drawer navigation**: Supports left, right, top, bottom. Left is standard for mobile nav.
- **Accessibility**: Built-in focus management, keyboard navigation.
- **Composition**: Allows structuring content within the drawer (Header, Title, etc.).

**Example Usage (as in `MainNav`):**
```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="icon" aria-label="Open menu"> {/* Use outline/ghost */}
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-[300px]"> {/* Adjust width as needed */}
    <SheetHeader>
      <SheetTitle className="font-serif">Navigation</SheetTitle> {/* Use Serif */}
    </SheetHeader>
    <nav className="flex flex-col space-y-2 p-4">
      {/* Navigation links */}
    </nav>
  </SheetContent>
</Sheet>
```

##### Tabs (If used, e.g., for project categories)
```tsx
<Tabs defaultValue="category1" className="w-full">
  <TabsList className="grid w-full grid-cols-3"> {/* Example layout */}
    <TabsTrigger value="category1">Web Apps</TabsTrigger>
    <TabsTrigger value="category2">Mobile</TabsTrigger>
    <TabsTrigger value="category3">Experiments</TabsTrigger>
  </TabsList>
  <TabsContent value="category1" className="mt-4">
    {/* Content for category 1 */}
  </TabsContent>
  <TabsContent value="category2" className="mt-4">
    {/* Content for category 2 */}
  </TabsContent>
  {/* ... */}
</Tabs>
```

**Psychological Benefits:**
- **Clear Segmentation:** Organizes information logically (Sage/Creator).
- **Contextual Focus:** Displays relevant content, hiding irrelevant details (Clarity).
- **Efficient Navigation:** Allows quick switching between related sections (Explorer).

### Feedback Components

#### Toast Notifications (If used for feedback)
```tsx
// Example using a hypothetical useToast hook from shadcn/ui
const { toast } = useToast()

// ... later
toast({
  title: "Action Successful",
  description: "Your message has been sent.",
  variant: "default", // Or 'success' if defined
})
```

**Psychological Implementation:**
- **Clear Feedback:** Confirms actions unambiguously (Precision).
- **Non-intrusive:** Provides information without disrupting workflow significantly.
- **Status Indication:** Color/icon can quickly convey success/error (if variants are defined).

### Loading States

#### Skeleton Components (If needed for data loading)
```tsx
// Example using shadcn/ui Skeleton
import { Skeleton } from "@/components/ui/skeleton"

<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

**Loading Psychology:**
- **Perceived Performance:** Reduces perceived wait time compared to spinners (Efficiency).
- **Context Preservation:** Mimics layout, preparing the user for content (Structure).
- **Reduced Uncertainty:** Shows progress is being made.

### Digital Sandbox Components

#### Creative Sandbox Visual

A custom-built visual representation that unifies the playground and projects sections under the "Digital Sandbox" concept.

**Features:**
- **Grid lines:** Background grid representing development environment
- **Gradient sand texture:** Visual metaphor for a sandbox
- **Animated concepts:** Contextual words with staggered pulse animations (using Tailwind's animate-pulse)
- **Code element:** Shows relevant code tag with blinking cursor animation

**Animation Implementation:**
- A simple keyframe animation for the cursor blinking effect is defined in globals.css
- The animation creates a pulsing effect that mimics a code editor cursor
- Staggered animations are created using animation delays applied to different elements

**Psychological Benefits:**
- **Visual Metaphor:** Reinforces the concept of exploration and experimentation (Explorer)
- **Intellectual Structure:** Grid lines convey precision and organization (Sage)
- **Creative Expression:** Animated elements and code snippet showcase craftsmanship (Creator)
- **Unified Experience:** Creates visual consistency across different sections of the portfolio

#### Interactive Playground Components

Each playground component (CoinFlip, Animation, etc.) is implemented directly in its respective page file, adhering to a consistent structure:

```tsx
export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex flex-col items-center pt-16 px-4 pb-16">
      <main className="max-w-5xl w-full space-y-8 py-8">
        {/* Navigation elements */}
        
        {/* Project display using Card component */}
        <div className="bg-card border border-border rounded-lg p-6 min-h-[80vh]">
          <Card className="border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Project Title</CardTitle>
              <CardDescription>
                Project description text
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Interactive component specific to each page */}
            </CardContent>
            <CardFooter className="border-t border-border">
              {/* Project details/metadata */}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
```

**Psychological Benefits:**
- **Consistency:** Uniform layout creates a predictable experience (Sage).
- **Focus on Content:** Simple container lets interactive elements shine (Explorer).
- **Structured Information:** Clear separation of title, description, content, and metadata (Creator).
- **Visual Coherence:** Uses the same background gradient and card structure across all playground pages.

### Implementation Guidelines

#### Component Hierarchy & Usage
1.  **Core Content Components (Card, Text elements):** Prioritize clarity, readability, and structure. Use ample whitespace.
2.  **Interactive Components (Button, Dropdown, Input):** Focus on precision, clear affordances, and reliable feedback. Use `primary` color for key actions.
3.  **Organizational Components (Tabs, Dialog, Sheet):** Ensure logical flow, clear segmentation, and focus management.
4.  **Digital Sandbox Components:** Create visual unity between playground and projects sections with consistent visual elements.

### Psychological Testing Protocol (Sage/Explorer/Creator Focus)

- **Clarity & Comprehension:** Can recruiters quickly understand the information presented within components?
- **Perceived Competence:** Do components feel well-crafted, precise, and reliable?
- **Efficiency:** Can users interact with components quickly and without confusion?
- **Trustworthiness:** Does the overall component system feel professional and credible?
- **Alignment:** Does the component feel align with the Sage (clarity, structure), Explorer (efficiency, discovery), and Creator (precision, craft) archetypes?

### Research References

*(Keep relevant references, update if needed)*
1.  Norman, D. A. (2013). *The Design of Everyday Things: Revised and Expanded Edition*. Basic Books. (Principles of usability, feedback, affordances)
2.  Krug, S. (2014). *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. New Riders. (Clarity, intuitive design)
3.  Weinschenk, S. (2011). *100 Things Every Designer Needs to Know About People*. New Riders. (Cognitive psychology principles)
4.  WCAG 2.1 Guidelines. (Accessibility standards)

# Component System

This document outlines the core reusable components used in the portfolio.

## Core Components

1.  **`MainNav` (`@/components/main-nav.tsx`)**
    *   **Description:** The main site navigation bar. Displays brand link and desktop navigation links.
    *   **Structure:** Server Component.
    *   **Dependencies:** `Link` (Next.js), `MobileNav` (dynamic import).
    *   **Styling:** Uses `bg-background`, `border-b`, `text-primary` (brand), `text-foreground/80` (links).

2.  **`MobileNav` (`@/components/mobile-nav.tsx`)**
    *   **Description:** Client-side component providing the mobile navigation experience using a slide-out sheet.
    *   **Structure:** Client Component (`"use client"`).
    *   **Dependencies:** `useState`, `Link` (Next.js), `lucide-react` (Menu icon), `@/components/ui/sheet`.
    *   **Styling:** Uses `Sheet` component styles, `bg-background`, `border-border`, `text-foreground`, `hover:bg-muted`.

3.  **`Button` (`@/components/ui/button.tsx`)**
    *   **Description:** Standard button component from shadcn/ui.
    *   **Usage:** Used for primary actions (e.g., CTA on home page).
    *   **Styling:** Variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) defined by shadcn/ui, using CSS variables from `globals.css`.

4.  **`Card` (`@/components/ui/card.tsx`)**
    *   **Description:** Container component from shadcn/ui for grouping content.
    *   **Usage:** Used for project display on the Projects page.
    *   **Styling:** Uses `bg-card`, `text-card-foreground`, `border`, `rounded-lg`, `shadow-sm` by default. Refined with `hover:shadow-md` on Projects page.
    *   **Sub-components:** `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

5.  **`Sheet` (`@/components/ui/sheet.tsx`)**
    *   **Description:** Slide-out panel component from shadcn/ui.
    *   **Usage:** Used within `MobileNav` for the mobile menu.
    *   **Styling:** Defined by shadcn/ui, using CSS variables.
    *   **Sub-components:** `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`.

6.  **`DropdownMenu` (`@/components/ui/dropdown-menu.tsx`)**
    *   **Description:** Component from shadcn/ui for displaying menus.
    *   **Usage:** *Currently not used* but available if needed for future implementation.
    *   **Styling:** Defined by shadcn/ui, using CSS variables.

7.  **Digital Sandbox Visual (`included in playground/page.tsx` and `projects/page.tsx`)**
    *   **Description:** Custom-built visual component that represents the digital sandbox concept.
    *   **Usage:** Used on both playground and projects pages to create visual cohesion.
    *   **Styling:** Uses grid, gradients, and animations to create an engaging visual element.
    *   **Features:** Animated typography, grid lines, code element with blinking cursor.

8.  **Playground Project Components (`/src/app/playground/*/page.tsx`)**
    *   **Description:** Self-contained interactive component implementations directly in their respective page files.
    *   **Structure:** Client Components (`"use client"`)
    *   **Dependencies:** Various shadcn/ui components and React hooks.
    *   **Styling:** Consistent layout and styling across all playground project pages.

9.  **`ProjectCard` (Function component in `playground/page.tsx`)**
    *   **Description:** Card component for displaying individual playground projects.
    *   **Usage:** Rendered for each project in the playgroundProjects array.
    *   **Dependencies:** shadcn/ui Card components, Link, Button.
    *   **Styling:** Uses Card with consistent category styling, thumbnails, and action buttons.

## Utility Components/Functions

*   **`cn` (`@/lib/utils.ts`)**
    *   **Description:** Utility function from shadcn/ui (combines `clsx` and `tailwind-merge`) for conditionally applying Tailwind classes.
    *   **Usage:** Used throughout components to merge base styles with variant/prop styles.

*   **Additional utilities in `@/lib/utils.ts`:**
    *   `formatDate`: For date formatting using Intl.DateTimeFormat
    *   `debounce`: Function debouncer for performance optimization
    *   `generateId`: Creates random IDs for elements that need unique identifiers
    *   `getNestedValue`: Safe object property accessor for deeply nested data

## Implementation Notes

*   All interactive playground projects have been moved from separate component files into their respective page files for a more self-contained architecture.
*   Both the playground and projects pages share a consistent visual language with the new Digital Sandbox elements.
*   Components follow the Sage/Explorer/Creator archetype with emphasis on clarity, precision, and thoughtful construction.
*   Custom animations (like `animate-blink`) are defined in `globals.css` and used for interactive elements.

# Components

## Icon System

### Icons Implementation

Our site uses a combination of Google Material Icons and Lucide React icons for consistent, recognizable UI elements across all pages.

**Implementation:**
- Google Material Icons loaded via CDN in layout.tsx
- Lucide React icons imported directly in components
- Icons follow the site's color system, using primary and accent colors for interactive elements
- Default size set to match our typography scale (typically 24px for standard UI elements)

**Usage Examples:**
- Navigation: Menu icon from Lucide React in the mobile menu
- Actions: External links, code snippets, and other functional indicators
- States: Success, Error, Warning, and Information indicators
- Content: Document, File, and Media type indicators

**Accessibility:**
- All icons used in UI components include appropriate ARIA labels
- Interactive icons have proper focus states and keyboard accessibility
- Non-decorative icons include alternative text for screen readers