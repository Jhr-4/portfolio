"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Node {
  id: string;
  row: number;
  col: number;
  x?: number;
  y?: number;
}

interface Edge {
  from: string;
  to: string;
  inPath: boolean;
}

interface Level {
  level: number;
  gridSize: number;
  nodes: Node[];
  edges: string[][];
}

interface GameState {
  currentLevel: number;
  levels: Level[];
  nodes: Map<string, Node>;
  edges: Edge[];
  currentPath: string[];
  isDragging: boolean;
  completedLevels: Set<number>;
  cellSize: number;
  isGameCompleted: boolean;
  errorMessage: string | null;
}

export function EulerPath() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    levels: [],
    nodes: new Map(),
    edges: [],
    currentPath: [],
    isDragging: false,
    completedLevels: new Set(),
    cellSize: 40,
    isGameCompleted: false,
    errorMessage: null
  });
  
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastMousePos, setLastMousePos] = useState<{x: number, y: number} | null>(null);

  // Load level data
  useEffect(() => {
    const loadLevels = async () => {
      try {
        setIsLoading(true);
        const levelResponses = await Promise.all(
          Array.from({ length: 8 }, (_, i) => fetch(`/levels/level${i + 1}.json`))
        );
        
        const levels = await Promise.all(levelResponses.map((res, index) => {
          if (!res.ok) throw new Error(`Failed to load level ${index + 1}`);
          return res.json();
        }));
        
        setGameState(prev => ({ ...prev, levels }));
        loadLevel(1, levels);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading levels:', err);
        setError('Failed to load game levels');
        setIsLoading(false);
      }
    };
    
    loadLevels();
  }, []);

  // Load a specific level
  const loadLevel = useCallback((levelNum: number, levels: Level[]) => {
    const level = levels.find(l => l.level === levelNum);
    if (!level) {
      setError(`Level ${levelNum} not found`);
      return;
    }

    const cellSize = gameState.cellSize;
    const nodesWithCoords = new Map<string, Node>();
    
    level.nodes.forEach(node => {
      nodesWithCoords.set(node.id, { 
        ...node, 
        x: node.col * cellSize, 
        y: node.row * cellSize 
      });
    });

    const edges: Edge[] = level.edges.map(([from, to]) => ({
      from, to, inPath: false
    }));

    setGameState(prev => ({
      ...prev,
      currentLevel: levelNum,
      nodes: nodesWithCoords,
      edges,
      currentPath: [],
      errorMessage: null
    }));
    
    setCurrentNode(null);
    setLastMousePos(null);
  }, [gameState.cellSize]);

  // Find an edge between two nodes
  const findEdge = useCallback((from: string, to: string) => {
    return gameState.edges.findIndex(e => 
      (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );
  }, [gameState.edges]);

  // Draw the game
  useEffect(() => {
    if (isLoading || error || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { cellSize, nodes, edges } = gameState;
    
    // Set canvas size based on current level
    const currentLevelData = gameState.levels.find(l => l.level === gameState.currentLevel);
    if (currentLevelData) {
      const gridPx = currentLevelData.gridSize * cellSize + 40;
      canvas.width = gridPx;
      canvas.height = gridPx;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= canvas.width; i += cellSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    
    for (let i = 0; i <= canvas.height; i += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.get(edge.from);
      const toNode = nodes.get(edge.to);
      
      if (fromNode?.x !== undefined && fromNode?.y !== undefined && 
          toNode?.x !== undefined && toNode?.y !== undefined) {
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x + 20, fromNode.y + 20);
        ctx.lineTo(toNode.x + 20, toNode.y + 20);
        
        ctx.strokeStyle = edge.inPath 
          ? 'rgba(16, 185, 129, 0.8)' // Green for traced edges
          : 'rgba(255, 255, 255, 0.6)'; // White for untraced
        
        ctx.lineWidth = edge.inPath ? 4 : 2;
        ctx.stroke();
      }
    });
    
    // Draw current path line to mouse position
    if (gameState.isDragging && currentNode && lastMousePos) {
      const node = nodes.get(currentNode);
      if (node?.x !== undefined && node?.y !== undefined) {
        ctx.beginPath();
        ctx.moveTo(node.x + 20, node.y + 20);
        ctx.lineTo(lastMousePos.x, lastMousePos.y);
        ctx.strokeStyle = 'rgba(60, 102, 254, 0.8)';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Draw nodes
    nodes.forEach((node) => {
      if (node.x !== undefined && node.y !== undefined) {
        ctx.beginPath();
        ctx.arc(node.x + 20, node.y + 20, 12, 0, 2 * Math.PI);
        
        ctx.fillStyle = currentNode === node.id 
          ? 'rgba(60, 102, 254, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)';
        
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.font = '14px Inter, sans-serif';
        ctx.fillStyle = '#0F172A';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, node.x + 20, node.y + 20);
      }
    });

    // Draw message if needed
    if (gameState.errorMessage) {
      const msgY = canvas.height - 40;
      const bgColor = gameState.errorMessage === "Level Complete!" 
        ? 'rgba(16, 185, 129, 0.9)'  
        : 'rgba(239, 68, 68, 0.9)';  
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, msgY, canvas.width, 40);
      
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(gameState.errorMessage, canvas.width / 2, msgY + 20);
    }
  }, [gameState, currentNode, isLoading, error, lastMousePos]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isLoading || error || gameState.isGameCompleted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find clicked node
    let clickedNode: string | null = null;
    gameState.nodes.forEach((node, id) => {
      if (node.x === undefined || node.y === undefined) return;
      const distance = Math.sqrt(
        Math.pow(x - (node.x + 20), 2) + Math.pow(y - (node.y + 20), 2)
      );
      if (distance <= 12) clickedNode = id;
    });

    if (clickedNode) {
      setCurrentNode(clickedNode);
      setLastMousePos({ x, y });
      
      // Fix: TypeScript error by ensuring we have a string array
      const nodeId: string = clickedNode; // This ensures nodeId is a string, not string | null
      setGameState(prev => ({
        ...prev,
        currentPath: [nodeId],
        isDragging: true,
        edges: prev.edges.map(edge => ({ ...edge, inPath: false })),
        errorMessage: null
      }));
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    // Update mouse position
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setLastMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    
    if (!gameState.isDragging || !currentNode || isLoading || error || gameState.isGameCompleted) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find hovered node
    let hoveredNode: string | null = null;
    gameState.nodes.forEach((node, id) => {
      if (node.x === undefined || node.y === undefined || id === currentNode) return;
      
      const distance = Math.sqrt(
        Math.pow(x - (node.x + 20), 2) + Math.pow(y - (node.y + 20), 2)
      );
      
      if (distance <= 12) hoveredNode = id;
    });

    if (!hoveredNode) return;
    
    // Check if valid move
    const edgeIndex = findEdge(currentNode, hoveredNode);
    
    if (edgeIndex === -1) {
      // No edge exists
      setGameState(prev => ({
        ...prev,
        errorMessage: "Invalid Path! (Jumped to a non-connected node)",
        isDragging: false
      }));
      return;
    }
    
    const edge = gameState.edges[edgeIndex];
    if (edge.inPath) {
      // Edge already traced
      setGameState(prev => ({
        ...prev,
        errorMessage: "Invalid Path! (Edge already traced)",
        isDragging: false
      }));
      return;
    }
    
    // Valid move - update path
    setCurrentNode(hoveredNode);
    
    setGameState(prev => {
      // Ensure hoveredNode is not null before adding to path
      if (hoveredNode === null) return prev;
      
      const newPath = [...prev.currentPath, hoveredNode];
      const updatedEdges = [...prev.edges];
      updatedEdges[edgeIndex] = { ...edge, inPath: true };
      
      // Check if level completed
      const allEdgesVisited = updatedEdges.every(e => e.inPath);
      if (allEdgesVisited) {
        const newCompletedLevels = new Set(prev.completedLevels);
        newCompletedLevels.add(prev.currentLevel);
        
        const isGameCompleted = newCompletedLevels.size === prev.levels.length;
        if (isGameCompleted) {
          return {
            ...prev,
            currentPath: newPath,
            edges: updatedEdges,
            completedLevels: newCompletedLevels,
            isGameCompleted
          };
        } else {
          setTimeout(() => loadLevel(prev.currentLevel + 1, prev.levels), 1000);
          return {
            ...prev,
            currentPath: newPath,
            edges: updatedEdges,
            completedLevels: newCompletedLevels,
            errorMessage: "Level Complete!"
          };
        }
      }
      
      return {
        ...prev,
        currentPath: newPath,
        edges: updatedEdges
      };
    });
  }, [currentNode, findEdge, gameState, isLoading, error, loadLevel]);

  const handleMouseUp = () => {
    if (gameState.isDragging) {
      // Check if the path is incomplete (not all edges have been traced)
      const allEdgesVisited = gameState.edges.every(e => e.inPath);
      if (!allEdgesVisited && gameState.currentPath.length > 1) {
        // Path is incomplete and user has traced at least one edge
        setGameState(prev => ({ 
          ...prev, 
          isDragging: false,
          errorMessage: "Invalid Path! (Path incomplete)" 
        }));
      } else {
        // Just stop dragging without error message
        setGameState(prev => ({ ...prev, isDragging: false }));
      }
    }
  };

  if (isLoading) return <div className="loading-spinner"></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // If game is completed, show congratulations
  if (gameState.isGameCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <span className="material-icons text-primary text-5xl mb-4">celebration</span>
        <h3 className="text-2xl font-serif mb-2">Congratulations!</h3>
        <p className="mb-6">You've completed all Euler path puzzles!</p>
        <button 
          onClick={() => {
            setGameState(prev => ({
              ...prev,
              isGameCompleted: false,
              completedLevels: new Set(),
              currentLevel: 1
            }));
            loadLevel(1, gameState.levels);
          }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-2 text-xs text-muted-foreground">
        Click on any node to start, then trace a path through all edges.
      </div>
      
      <canvas 
        ref={canvasRef}
        width={400} 
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border border-border rounded bg-card/70 cursor-pointer"
      />
      
      <button
        onClick={() => loadLevel(gameState.currentLevel, gameState.levels)}
        className="mt-4 flex items-center gap-1 px-4 py-2 border rounded"
      >
        <span className="material-icons text-sm">refresh</span>
        Restart Level
      </button>
    </div>
  );
}