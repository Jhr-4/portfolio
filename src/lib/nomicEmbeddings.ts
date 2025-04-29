/**
 * Nomic Atlas Embeddings Utility for RAG Chat System
 * 
 * PURPOSE:
 * This file provides functionality to convert text (user queries) into vector embeddings.
 * These embeddings are used to search the Pinecone vector database for relevant documents.
 * 
 * HOW IT WORKS IN THE RAG SYSTEM:
 * 1. When a user submits a question in the chat interface
 * 2. This utility converts that question into a vector embedding using Nomic's API
 * 3. The vector is then used to search Pinecone for similar document chunks
 * 4. Retrieved document chunks are sent to the LLM along with the user's question
 */

import { Embeddings } from "@langchain/core/embeddings";
import { AsyncCaller } from "@langchain/core/utils/async_caller";

// Default model to use for embeddings
const DEFAULT_MODEL = "nomic-embed-text-v1.5";

/**
 * NomicEmbeddings Class
 * 
 * This class implements LangChain's Embeddings interface to convert text into
 * vector embeddings using Nomic's API. It's used at query-time
 * to convert user questions into vectors for similarity search.
 */
export class NomicEmbeddings extends Embeddings {
  private model: string;
  private apiKey?: string;
  private batchSize: number;
  
  // Initialize AsyncCaller for the base class
  caller: AsyncCaller;

  /**
   * Constructor for the NomicEmbeddings class
   * @param apiKeyOrConfig API key for Nomic Atlas or configuration object
   */
  constructor(apiKeyOrConfig?: string | {
    model?: string;
    apiKey?: string;
    batchSize?: number;
  }) {
    // Call the parent constructor with empty options object
    super({});
    
    // Initialize AsyncCaller required by the Embeddings base class
    this.caller = new AsyncCaller({});
    
    if (typeof apiKeyOrConfig === 'string') {
      // If a string is provided, it's just the API key
      this.apiKey = apiKeyOrConfig;
      this.model = DEFAULT_MODEL;
      this.batchSize = 512;
    } else {
      // Otherwise, it's a config object
      const config = apiKeyOrConfig || {};
      this.model = config.model || DEFAULT_MODEL;
      this.apiKey = config.apiKey || process.env.ATLAS_API_KEY;
      this.batchSize = config.batchSize || 512;
    }
  }

  /**
   * Embeds a list of documents using the Nomic Atlas API
   * 
   * In the RAG system, this is mainly used when processing multiple
   * chunks of text that need to be embedded together.
   * 
   * @param documents List of text documents to embed
   * @returns Promise containing the embeddings for each document
   */
  async embedDocuments(documents: string[]): Promise<number[][]> {
    try {
      const embeddings: number[][] = [];
      
      // Process in batches to avoid overwhelming the API
      for (let i = 0; i < documents.length; i += this.batchSize) {
        const batch = documents.slice(i, i + this.batchSize);
        const batchEmbeddings = await this.generateEmbeddings(batch);
        embeddings.push(...batchEmbeddings);
      }
      
      return embeddings;
    } catch (error) {
      console.error("Error embedding documents:", error);
      throw error;
    }
  }

  /**
   * Embeds a single query text into a vector
   * 
   * In the RAG system, this is what happens when a user asks a question:
   * 1. The user's question text is passed to this method
   * 2. This method calls generateEmbeddings to get a vector representation
   * 3. The resulting vector is used to search Pinecone for similar document chunks
   * 
   * @param text The user query text to embed
   * @returns Promise containing the embedding vector
   */
  async embedQuery(text: string): Promise<number[]> {
    try {
      const embeddings = await this.generateEmbeddings([text]);
      return embeddings[0];
    } catch (error) {
      console.error("Error embedding query:", error);
      throw error;
    }
  }

  /**
   * Makes an API call to Nomic Atlas to convert text into vector embeddings
   * 
   * This is the core method that actually communicates with the Nomic API:
   * 1. It sends the text(s) to Nomic's servers
   * 2. Nomic's ML model processes the text and generates vector embeddings
   * 3. The vectors are returned and used for similarity search
   * 
   * @param texts Array of texts to generate embeddings for
   * @returns Promise containing the embeddings (vectors) for each text
   * @private
   */
  private async generateEmbeddings(texts: string[]): Promise<number[][]> {
    const url = `https://api-atlas.nomic.ai/v1/embedding/text`;
    
    try {
      // This makes an HTTP request to the Nomic API to convert text to vectors
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify({
          model: this.model,
          texts: texts,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nomic Atlas API error: ${response.status} ${errorText}`);
      }

      // Parse the response and extract the embeddings (vectors)
      const result = await response.json();
      return result.embeddings;
    } catch (error) {
      console.error("Error calling Nomic Atlas API:", error);
      throw error;
    }
  }
}