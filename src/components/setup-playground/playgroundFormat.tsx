import React from 'react';

/**
 * Interface for playground projects
 * All interactive playground components should implement this interface
 */
export interface PlaygroundProject {
  id: string;         // Unique identifier for the project
  title: string;      // Display title
  description: string; // Brief description
  category: string;   // Category/tag (e.g., "Simple Interactive", "AI Demo", etc.)
  
  // Image for project card (can be a static image, GIF, or SVG)
  thumbnailSrc: string; // Path to the image file
  thumbnailAlt?: string; // Optional alt text for the image
  thumbnailType?: 'image' | 'gif' | 'svg'; // Optional type of the thumbnail
  
  techDescription: string; // Short description of technologies used
  techIcon: string;   // Material icon name for the tech stack
  isComingSoon?: boolean; // Flag for projects not yet implemented
}