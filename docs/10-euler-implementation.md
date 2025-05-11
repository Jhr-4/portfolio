# Euler Path Implementation: Interactive Graph Theory Game

## Overview

The Euler Path Game is an interactive educational tool that demonstrates Euler path concepts in graph theory. Players solve puzzles by tracing a path through every edge of a graph exactly once without retracing or lifting the mouse - the fundamental concept of an Euler path.

This implementation provides a hands-on way to explore and understand graph theory concepts through an engaging game interface with progressive levels of difficulty.

## System Architecture

### Key Components

1. **Canvas Rendering System**
   - HTML Canvas-based rendering for optimal performance
   - Real-time visual feedback on path validity
   - Dynamic node and edge positioning system

2. **Game Logic Engine**
   - Path validation according to Euler path rules
   - Level completion detection
   - Error handling and user feedback

3. **Level Data System**
   - JSON-based level definitions stored in `/public/levels/`
   - Progressive difficulty structure
   - Dynamic level loading system

4. **Interaction System**
   - Mouse interaction for path tracing
   - Node-based path initialization and reset
   - Visual feedback for valid and invalid moves

### Data Flow

The Euler Path game operates with the following data flow:

1. **Level Loading**
   - Level data is loaded from JSON files in `/public/levels/`
   - Node and edge data is parsed and processed
   - The game canvas is initialized with the current level's graph

2. **Gameplay Process**
   - User begins by clicking on a starting node
   - Mouse drag movement is tracked to follow edges between nodes
   - Each valid edge traversal is recorded in the path history
   - Visual feedback shows green for valid moves, red for invalid moves
   - Level completion is detected when all edges are traversed exactly once

3. **Level Progression**
   - Completed levels are stored in browser state
   - Users can progress to the next level after completion
   - After all levels are completed, a congratulatory message is shown

## Code Structure

### Main Component Files

```
src/app/playground/euler-path/
  ├── page.tsx         # Container page with layout and metadata
  └── EulerPath.tsx    # Core game component with canvas rendering and logic
```

### Level Data Structure

```
public/levels/
  ├── level1.json
  ├── level2.json
  ├── level3.json
  └── ...
```

### Level JSON Format

Each level is defined in a JSON file with the following structure:

```json
{
  "level": 1,
  "gridSize": 10,
  "nodes": [
    { "id": "A", "row": 1, "col": 2 },
    { "id": "B", "row": 1, "col": 5 },
    { "id": "C", "row": 4, "col": 3 }
  ],
  "edges": [
    ["A", "B"],
    ["B", "C"],
    ["C", "A"]
  ]
}
```

## Implementation Details

### Grid System

- The game uses a grid-based coordinate system for node placement
- Grid coordinates (row, col) are converted to pixel positions using a consistent cell size
- This allows for uniform spacing and responsive design

### Canvas Rendering

The game uses HTML Canvas for rendering with the following elements:

1. **Nodes**
   - Circular representations of graph vertices
   - Labeled with letters for identification
   - Interactive hitboxes for mouse events
   - Highlighted states for start/end nodes

2. **Edges**
   - Lines connecting nodes representing graph edges
   - Color-coded states: 
     - Default: Gray/white (untraversed)
     - Valid path: Green (correctly traversed)
     - Invalid: Red (incorrect traversal attempt)
   - Line thickness adjusts based on state

3. **Path Visualization**
   - Real-time visual feedback on path traversal
   - Mouse position tracking between nodes
   - "Snapping" logic to follow valid edges

### Game Logic Implementation

The core game logic is implemented in the `EulerPath.tsx` component:

1. **State Management**
   - React state hooks manage the game state
   - TypeScript interfaces define data structures
   - Map and Set data structures for efficient lookups

2. **Path Validation**
   - Checks for valid edge traversals
   - Prevents edge reuse (Euler path rule)
   - Ensures connected path without jumps

3. **Level Management**
   - Dynamic level loading and parsing
   - Level completion detection
   - Game completion tracking

4. **User Interaction**
   - Mouse event handlers (down, move, up)
   - Visual feedback for user actions

### Mouse Interaction System

The implementation uses a robust mouse interaction system:

```typescript
// Mouse down handler
const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const { x, y } = getMousePosition(event);
  const startNode = findNodeAtPosition(x, y);
  
  if (startNode) {
    setGameState(prev => ({
      ...prev,
      isDragging: true,
      currentPath: [startNode.id]
    }));
  }
};

// Mouse move handler
const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
  if (!gameState.isDragging) return;
  
  const { x, y } = getMousePosition(event);
  const node = findNodeAtPosition(x, y);
  
  if (node && canAddToPath(node.id)) {
    addNodeToPath(node.id);
  }
};
```