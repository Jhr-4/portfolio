import React from "react";
import { PlaygroundProject } from "./playgroundFormat";

// Registry of all playground projects
export const playgroundProjects: PlaygroundProject[] = [
  {
    id: "d3-visualizations",
    title: "Labor Productivity & Earnings",
    description: "Interactive data visualizations showing trends in labor productivity and earnings",
    category: "Data Visualization",
    thumbnailSrc: "/images/playground/productivity-trend.svg", // Reusing existing SVG for now
    thumbnailAlt: "D3.js data visualization chart",
    thumbnailType: "svg",
    techDescription: "D3.js, Data Story",
    techIcon: "insights",
    component: () => <></>, // Empty component for coming soon projects
    isComingSoon: false
  },
  {
    id: "rag-chat",
    title: "Eidon AI Philosopher - RAG Chat App",
    description: "Retrieval-Augmented Generation chatbot with document context awareness",
    category: "AI Demo",
    thumbnailSrc: "/images/playground/ai-chat-thumbnail.svg", // Reusing existing SVG
    thumbnailAlt: "RAG chat interface",
    thumbnailType: "svg",
    techDescription: "Groq, Pinecone Vector DB, Nomic Atlast",
    techIcon: "psychology",
    component: () => <></>,
    isComingSoon: false
  },
  {
    id: "animation",
    title: "Animation Playground",
    description: "Explore CSS, Canvas, SVG, and WebGL animations",
    category: "Creative Coding",
    thumbnailSrc: "/images/playground/animation-thumbnail.svg",
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