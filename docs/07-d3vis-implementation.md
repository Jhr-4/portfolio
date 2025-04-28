# D3.js Data Visualization Implementation

## Overview

The portfolio includes an advanced data visualization project exploring the relationship between productivity growth and worker compensation from 1979-2024. This interactive playground project demonstrates technical skills in data visualization, React integration, and narrative data storytelling.

## Architecture Overview

### Integration Approach

- The visualization uses D3.js for direct SVG manipulation within React components
- React manages component lifecycle while D3 handles the rendering of complex visualizations
- TypeScript interfaces ensure type safety throughout the visualization components

### Chart Components

The visualization system is built with three reusable chart components:

1. **`LinePlot.tsx`**: Renders time-series data with interactive hover effects
2. **`BarChart.tsx`**: Creates responsive bar charts with tooltip interactions
3. **`PieChart.tsx`**: Generates pie/donut charts with custom legends and accessible colors

All components share a consistent API pattern for reusability and are implemented directly in the playground page files.

### Data Flow

- CSV data stored in `/public/csv/` directory:
  - `ProductivityVsCompensation.csv`
  - `ProductivityVsEarnings.csv`
  - `CorporateProfits.csv`
  - `ProductivityContribution.csv`
- Components handle data fetching, parsing and validation internally
- Error states and loading states managed within components
- Data transformations performed within each component as needed

## Key Technical Features

### Responsive Design

- Charts resize dynamically using ResizeObserver
- Different layouts and optimizations for mobile vs. desktop
- Consistent minimum dimensions to preserve readability
- Horizontally scrollable on small screens when needed

### Accessibility

- Screen reader support with ARIA labels and sr-only text
- Keyboard navigation for interactive elements
- Color contrast compliance with theme variables
- Focus states for interactive elements

### Performance Optimizations

- Efficient data handling with proper cleanup
- Conditional rendering to prevent unnecessary redraws
- SVG optimizations for smoother interactions
- Debounced resize handling

### User Experience

- Consistent loading states with custom spinner animation
- Interactive tooltips with position awareness (stays within viewport)
- Animated transitions between states
- Consistent theme integration using CSS variables

## Styling Integration

The D3 visualizations are integrated with the design system:

### Color System Integration

- Primary color used for main data series
- Accent color for comparison data series
- Muted colors for grid lines and secondary elements
- Background and card colors for containers

### Typography Integration

- Serif fonts for titles and headings
- Sans-serif for data labels and explanatory text
- Responsive font sizing based on viewport and chart dimensions

### Layout Integration

- Charts follow the same spacing system as other components
- Consistent padding and margins using the design system spacing scale
- Proper card and border styling matching other components

## Interactive Narrative Structure

The D3 visualization project is structured as a narrative data story:

### Section Navigation

- Tab-like navigation between three data story sections
- Each section builds on insights from previous sections
- Interactive links embedded in the narrative for progressive disclosure

### Content Sections

- "Analyzing the Trend": Compares productivity growth with earnings/compensation
- "Where Profits Go?": Examines corporate profits and productivity factors
- "Key Takeaways": Summarizes findings with essential statistics

### Contextual Information

- Each visualization is accompanied by explanatory text
- Key statistics highlighted with strong tags
- Data sources properly attributed

### User Controls

- Interactive hover states for data exploration
- Section navigation with smooth scrolling
- Responsive controls that work across devices

## Custom Animations

The project includes custom animations for enhanced visual interest:

```css
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

## Implementation Notes

All D3 visualization components are implemented directly in the playground page file (`/src/app/playground/d3-visualizations/page.tsx`). This self-contained architecture simplifies the codebase and makes the playground project easier to understand.

The chart components follow these principles:

1. **Chart Lifecycle Management**:
   - Charts initialize in `useEffect` hooks
   - Cleanup functions remove SVG elements when components unmount
   - ResizeObserver handles responsive redrawing

2. **Interaction Handling**:
   - Hover states managed with D3's event system
   - Tooltip positioning adjusted to prevent viewport overflow
   - Keyboard accessibility for interactive elements

3. **Data Processing**:
   - CSV loading with D3's built-in utilities
   - Type-safe data transformations
   - Error handling for data loading failures

## Resources

- [D3.js Documentation](https://d3js.org/)
- [React with D3 Integration Patterns](https://2019.wattenberger.com/blog/react-and-d3)
- [Observable D3 Examples](https://observablehq.com/@d3/gallery)
- [Data Visualization Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/)

## D3 Component Implementation Details

The D3 data visualization components follow a consistent implementation pattern directly in the page.tsx file:

### LinePlot Component

The `LinePlot` component creates time-series visualizations:

- Uses React refs to access the SVG DOM element
- Creates D3 scales (time-based x-axis, linear y-axis)
- Renders axes with custom formatting and responsive ticks
- Draws grid lines for better readability
- Creates and renders path elements with D3's line generator
- Implements interactive hover effects with tooltips
- Handles resize events with ResizeObserver for responsiveness
- Cleans up D3 elements when unmounting

### BarChart Component

The `BarChart` component visualizes categorical data:

- Uses D3's scaleBand for categorical x-axis
- Renders rect elements with appropriate dimensions
- Implements transitions for bar heights when data changes
- Provides hover effects with color changes
- Displays value tooltips on hover
- Handles responsive layout with horizontal scrolling on small screens

### PieChart Component

The `PieChart` component shows proportional relationships:

- Uses D3's pie layout to compute arc angles
- Creates arc generator with appropriate inner/outer radii
- Renders pie segments as SVG path elements
- Implements interactive scaling effects on hover
- Adds value labels for significant segments
- Includes a custom legend component for category identification

### Integration Approach

These components are integrated directly in the visualization page rather than as separate files:

- All chart components are defined within the `d3-visualizations/page.tsx` file
- Chart components share access to theme variables via CSS custom properties 
- Responsive layout adapts charts based on viewport size
- Charts are embedded within a tabbed interface for the narrative structure
- Data loading and preprocessing happens in each component's useEffect hook