# Sprint 2: Projects & Playground Implementation (Revised)

**Goal:** Enhance the portfolio with a unified "Projects & Playground" section that showcases both completed work and interactive experimental projects in a modular, maintainable structure.

**Key Features:**

1.  **Unified Projects & Playground Page:**
    *   Create a tabbed interface to toggle between "Completed Projects" and "Interactive Playground" sections.
    *   Maintain consistent styling between both tabs while visually differentiating their purpose.
    *   Implement responsive layout that works well across all device sizes.

2.  **Modular Playground Implementation:**
    *   Create a modular architecture where each interactive project is in its own file.
    *   Design a component system that allows easy addition of new interactive projects.
    *   Create a registry/index of available playground projects for dynamic loading.
    *   Implement a clean launch/return navigation flow between project list and active project.

3.  **Navigation & Integration:**
    *   Update main and mobile navigation to include the combined "Projects & Playground" link.
    *   Create visual cues on the homepage that directs visitors to the new unified section.
    *   Ensure consistent styling with the rest of the portfolio.

4.  **Project Management System:**
    *   Implement a consistent data structure for both completed projects and playground items.
    *   Create a tagging system to categorize projects by technology, purpose, or complexity.
    *   Set up placeholder cards for "Coming Soon" projects.

5.  **Initial Playground Projects:**
    *   Implement a simple "Coin Flip" interactive project as a proof of concept.
    *   Create placeholder cards for future interactive projects.
    *   Implement D3.js data visualizations to showcase data analysis capabilities.

**D3 Data Visualization Implementation:**

1.  **Overview:**
    *   Developed an advanced data visualization project exploring the relationship between labor productivity and worker compensation from 1979-2024.
    *   Created reusable, responsive chart components with D3.js integrated into the React/Next.js architecture.
    *   Implemented a narrative-based visualization experience with multiple interconnected views.

2.  **Chart Components:**
    *   **LinePlot:** Interactive time-series visualization with hover effects, tooltips, and dynamic responsiveness.
    *   **BarChart:** Responsive bar chart with interactive elements and optimized rendering for mobile devices.
    *   **PieChart:** Interactive pie/donut chart with custom legends and accessible color schemes.

3.  **Technical Features:**
    *   Used D3.js for SVG generation while letting React control the component lifecycle.
    *   Implemented robust data loading and validation to handle missing or malformed data.
    *   Created responsive charts that adapt to different screen sizes with appropriate layout adjustments.
    *   Added loading states with a consistent visual language across all chart types.
    *   Enhanced accessibility with screen reader support, keyboard navigation, and proper color contrast.

4.  **Data Narrative:**
    *   Structured the visualization into three interconnected sections:
        *   "Analyzing the Trend" - Comparing productivity growth with earnings and compensation
        *   "Where Profits Go?" - Examining corporate profit growth and productivity factors
        *   "Key Takeaways" - Summarizing findings with essential statistics
    *   Added interactive navigation between sections with a tabbed interface.
    *   Included contextual references and narrative text to guide users through the data story.

5.  **Implementation Details:**
    *   Created TypeScript interfaces for strongly typed data points and component props.
    *   Used ResizeObserver for dynamic chart resizing based on container dimensions.
    *   Implemented event handling for mouse and touch interactions.
    *   Added responsive design breakpoints with optimized layouts for mobile devices.

**Technical Architecture:**

*   **File Structure:**
    ```
    src/
      app/
        playground/
          page.tsx                    # Main playground page with project options
          d3-visualizations/          # D3 visualization project directory
            page.tsx                  # Main visualization page with narrative structure
        projects/
          page.tsx                    # Projects showcase page
      components/
        charts/                       # D3 visualization components
          LinePlot.tsx                # Time series line chart component
          BarChart.tsx                # Bar chart visualization component
          PieChart.tsx                # Pie/donut chart visualization component
        playground/                   # Directory for playground components
          playgroundFormat.tsx        # Format definition for playground projects
          playgroundRegistry.tsx      # Registry for all interactive projects
    public/
      csv/                            # CSV data files for visualizations
        ProductivityVsEarnings.csv    # Productivity vs earnings time series data
        ProductivityVsCompensation.csv # Productivity vs compensation time series data
        CorporateProfits.csv          # Corporate profits data
        ProductivityContribution.csv   # Contribution factors to productivity growth
    ```

*   **Component Architecture:**
    *   Chart components designed with consistent props and interfaces for reusability.
    *   Data loading and processing abstracted within each chart component.
    *   Responsive layouts with adaptive rendering based on viewport size.
    *   Theme-aware styling using CSS variables from the design system.

**Design System Integration:**

*   Apply the Sage/Explorer/Creator brand archetype across both project displays and interactive components.
*   Use the `primary` color for main lines and `accent` color for comparison lines in charts.
*   Implement consistent card-based layout for project containers with proper spacing.
*   Maintain typography hierarchy with serif fonts for titles and sans-serif for data and explanatory text.
*   Ensure all visualization components follow accessibility guidelines with proper contrast and screen reader support.

**Definition of Done:**

*   Combined Projects & Playground page displays both completed projects and interactive experiments with tabs.
*   At least one functional interactive project (Coin Flip) is implemented in a modular way.
*   D3 data visualization project fully implemented with multiple chart types and narrative structure.
*   Navigation properly includes the unified "Projects & Playground" section.
*   All content follows the established design system guidelines.
*   The page is fully responsive across device sizes.
*   The technical architecture supports easy addition of future interactive projects.
*   Accessibility guidelines are met (proper contrast, semantic HTML, screen reader support).

**Future Playground Project Ideas:**

1. **Color Palette Generator**
   * Interactive color scheme generator using various color theory principles
   * Users can select base color and palette type (analogous, complementary, etc.)
   * Display and copy color hex codes

2. **AI Chat Interface**
   * A simple chat interface that connects to an AI API
   * Demonstrates prompt engineering techniques and API integration
   * Shows both raw and styled responses

3. **Algorithm Visualizer**
   * Step-by-step visualization of common algorithms (sorting, pathfinding)
   * Speed controls and custom input options
   * Educational explanations of how each algorithm works

4. **Web Animation Playground**
   * Showcases different animation techniques (CSS, Canvas, SVG, WebGL)
   * Interactive controls to modify animation parameters
   * Educational explanations of implementation details