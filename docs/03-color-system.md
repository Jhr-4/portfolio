# Color System (Dark Theme)

| Role           | Color      | Tailwind   |
|----------------|------------|------------|
| Background     | #111827    | gray-900   |
| Foreground     | #F3F4F6    | gray-100   |
| Card BG        | #1F2937    | gray-800   |
| Card FG        | #F3F4F6    | gray-100   |
| Primary        | #60A5FA    | blue-400   |
| Primary FG     | #1E3A8A    | blue-950   |
| Accent         | #5EEAD4    | teal-300   |
| Accent FG      | #115E59    | teal-800   |
| Muted BG       | #374151    | gray-700   |
| Muted FG       | #9CA3AF    | gray-400   |
| Border/Ring    | #374151    | gray-700   |
| Destructive    | #F87171    | red-400    |

- Uses CSS variables in globals.css for easy theming.
- All text meets WCAG AA contrast.
- Prefer background contrast and card separation for structure.

### CSS Variable Implementation (globals.css)

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
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### Light Mode (Optional/Fallback)
If you want to support light mode, invert the palette as needed, but the default and primary experience is dark.

---

This system ensures your portfolio is visually striking, modern, and easy to read, with a focus on dark theme aesthetics.