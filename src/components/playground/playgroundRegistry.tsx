import React from "react";
import { PlaygroundProject } from "./playgroundFormat";

// Registry of all playground projects
export const playgroundProjects: PlaygroundProject[] = [
  {
    id: "coin-flip",
    title: "Coin Flip",
    description: "A simple heads or tails coin flip simulator",
    category: "Simple Interactive",
    thumbnailSrc: "/images/coin-flip-thumbnail.svg",
    thumbnailAlt: "Coin flip animation",
    thumbnailType: "svg",
    techDescription: "React Hooks",
    techIcon: "casino",
    component: () => <></>, // Replaced with empty component as implementation is now in page
    isComingSoon: false
  },
  {
    id: "d3-visualizations",
    title: "Labor Productivity & Earnings",
    description: "Interactive data visualizations showing trends in labor productivity and earnings",
    category: "Data Visualization",
    thumbnailSrc: "/images/color-palette-thumbnail.svg", // Reusing existing SVG for now
    thumbnailAlt: "D3.js data visualization chart",
    thumbnailType: "svg",
    techDescription: "D3.js, SVG Graphics",
    techIcon: "insights",
    component: () => <></>, // Empty component for coming soon projects
    isComingSoon: false
  },
  {
    id: "rag-chat",
    title: "RAG Chat Application",
    description: "Retrieval-Augmented Generation chatbot with document context awareness",
    category: "AI Demo",
    thumbnailSrc: "/images/ai-chat-thumbnail.svg", // Reusing existing SVG
    thumbnailAlt: "RAG chat interface",
    thumbnailType: "svg",
    techDescription: "Vector DB, LLM API",
    techIcon: "psychology",
    component: () => <></>,
    isComingSoon: false
  },
  {
    id: "animation",
    title: "Animation Playground",
    description: "Explore CSS, Canvas, SVG, and WebGL animations",
    category: "Creative Coding",
    thumbnailSrc: "/images/animation-thumbnail.svg",
    thumbnailAlt: "Animation demo",
    thumbnailType: "svg",
    techDescription: "Web Animations",
    techIcon: "animation",
    component: () => <></>,
    isComingSoon: false
  }
];

// Helper function to get a project by ID
export const getProjectById = (id: string): PlaygroundProject | undefined => {
  return playgroundProjects.find(project => project.id === id);
};