/**
 * RAG (Retrieval-Augmented Generation) Utilities
 * 
 * This file contains utilities for:
 * 1. Client-side RAG system management
 * 2. API interactions for document retrieval and chat functionality
 * 3. State management for the RAG chat UI
 * 
 * Note: Embeddings are now managed separately through the rag-system/scripts/manage-embeddings.js
 * script and must be generated before the app can provide RAG functionality.
 */

import { formatDocumentsAsString } from "langchain/util/document";
import personaConfig from '@/app/playground/rag-chat/persona.json';

// Types for our RAG chat system
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatState {
  messages: Message[];
  pending?: string;
  loading: boolean;
}

// Define persona from JSON file - simplified interface
export interface Persona {
  name: string;
  description: string;
  systemMessage: string;
  traits?: {
    expertise: string[];
    tone: string;
    style: string;
  };
}

// Export the persona for use in components
export const PERSONA: Persona = personaConfig as Persona;

// Class to handle RAG functionality
export class RAGSystem {
  private initialized = false;
  
  constructor() {
    // No longer initialize embedding client-side
    // All embedding will be handled server-side
  }
    
  /**
   * Check if Pinecone has vectors
   */
  async checkVectorStatus(): Promise<{ exists: boolean, count: number }> {
    try {
      // Check if Pinecone has vectors via the check endpoint
      const response = await fetch('/api/rag/pinecone/check', {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to check Pinecone status: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      this.initialized = data.hasVectors;
      return { 
        exists: data.hasVectors, 
        count: data.vectorCount || 0 
      };
    } catch (error) {
      console.error("Error checking vector status:", error);
      return { exists: false, count: 0 };
    }
  }
   
  /**
   * Generate a response using RAG
   */
  async generateResponse(messages: Message[]): Promise<string> {
    // Input validation - ensure messages array is valid
    if (!Array.isArray(messages) || messages.length === 0) {
      return "Invalid or empty messages array provided.";
    }

    // Check if vectors exist first
    const status = await this.checkVectorStatus();
    if (!status.exists) {
      return "The RAG system doesn't have any document embeddings. Please contact the administrator to run the embedding generation script.";
    }
    
    try {
      // Get the last user message to use for retrieval
      const lastUserMessage = messages.filter(m => m.role === "user").pop();
      if (!lastUserMessage) {
        return "No user message found.";
      }
      
      // Sanitize the query - trim and limit length
      const sanitizedQuery = lastUserMessage.content.trim().slice(0, 1000);
      
      // Query Pinecone via API endpoint - now this will handle embeddings server-side
      const queryResponse = await fetch('/api/rag/pinecone/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: sanitizedQuery,
        }),
      });
      
      if (!queryResponse.ok) {
        throw new Error(`Failed to query Pinecone: ${queryResponse.statusText}`);
      }
      
      const queryData = await queryResponse.json();
      
      if (!queryData.success || !queryData.matches) {
        throw new Error("Failed to retrieve matches from Pinecone");
      }
      
      // Process retrieved matches
      const retrievedDocs = queryData.matches.map((match: any) => {
        return {
          pageContent: match.content,
          metadata: {
            source: match.source,
            title: match.title,
          },
        };
      });
      
      // Add source information to each retrieved chunk
      const docsWithSources = retrievedDocs.map((doc: any) => {
        const source = doc.metadata?.title || "Unknown Source";
        return {
          ...doc,
          pageContent: `[From: ${source}]\n${doc.pageContent}`
        };
      });
      
      // Format the retrieved documents as context
      const context = formatDocumentsAsString(docsWithSources);
      
      // Prepare the prompt with retrieved context
      const systemMessage = {
        role: "system",
        content: `${PERSONA.systemMessage}\n\nHere are relevant documents to help answer the user's question:\n${context}`
      };
      
      // Create the prompt for the model and send to our secure API route
      const apiMessages = [
        systemMessage,
        ...messages.filter(m => m.role !== "system")
      ];
      
      // Use our own API route instead of calling Groq directly
      const response = await fetch('/api/rag/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: apiMessages
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(`API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I encountered an error processing your request. Please try again later or contact support if the problem persists.";
    }
  }
  
  /**
   * Check if the RAG system is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

// Singleton instance for the RAG system
let ragSystem: RAGSystem | null = null;

// Function to get or create the RAG system
export function getRAGSystem(): RAGSystem {
  if (!ragSystem) {
    ragSystem = new RAGSystem();
  }
  return ragSystem;
}