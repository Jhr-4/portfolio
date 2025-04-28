/**
 * LLM Response Generation API Route
 * 
 * This endpoint handles generating responses from the LLM using retrieved context
 * and is called as part of the RAG pipeline from rag-utils.ts.
 * - POST /api/rag/generate - Generate LLM response using the provided messages with context
 */

import { NextRequest, NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';

// Create a singleton instance of the LLM to avoid cold starts
let llmInstance: ChatGroq | null = null;

function getLLM() {
  if (!llmInstance) {
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      throw new Error("Missing GROQ API key");
    }
    
    // Use a faster model that still has good capabilities
    llmInstance = new ChatGroq({
      apiKey: groqApiKey,
      model: "llama3-8b-8192", // Using a smaller, faster model
      temperature: 0.2, // Lower temperature for more concise responses
      maxTokens: 1024, // Limit token output for faster responses
    });
  }
  
  return llmInstance;
}

/**
 * Maximum allowed messages in a request to prevent abuse
 */
const MAX_MESSAGES = 20;

/**
 * Maximum allowed content length per message
 */
const MAX_CONTENT_LENGTH = 4000;

export async function POST(request: NextRequest) {
  try {
    // Start timing the request for performance monitoring
    const startTime = Date.now();
    
    // Add rate limiting headers
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', '10'); // 10 requests per minute
    
    // Parse and validate the request
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({
        error: "Invalid JSON in request body"
      }, { status: 400, headers });
    }
    
    const { messages } = body;
    
    // Validate messages array
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({
        error: "Invalid request: messages array is required"
      }, { status: 400, headers });
    }
    
    // Limit number of messages to prevent abuse
    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json({
        error: `Too many messages: maximum ${MAX_MESSAGES} allowed`
      }, { status: 400, headers });
    }
    
    // Validate and sanitize each message
    const sanitizedMessages = [];
    for (const msg of messages) {
      // Check if message has required fields
      if (!msg || typeof msg !== 'object' || !msg.role || !msg.content) {
        return NextResponse.json({
          error: "Invalid message format: each message must have role and content"
        }, { status: 400, headers });
      }
      
      // Validate role
      if (!['user', 'assistant', 'system'].includes(msg.role)) {
        return NextResponse.json({
          error: "Invalid role: must be 'user', 'assistant', or 'system'"
        }, { status: 400, headers });
      }
      
      // Validate and sanitize content
      if (typeof msg.content !== 'string') {
        return NextResponse.json({
          error: "Invalid content: must be a string"
        }, { status: 400, headers });
      }
      
      // Truncate long messages
      const truncatedContent = msg.content.slice(0, MAX_CONTENT_LENGTH);
      
      sanitizedMessages.push({
        role: msg.role,
        content: truncatedContent
      });
    }
    
    try {
      // Get the LLM instance (cached after first use)
      const llm = getLLM();
      
      // Convert the messages to LangChain format
      const langchainMessages = sanitizedMessages.map((msg: any) => {
        switch (msg.role) {
          case 'system':
            return new SystemMessage(msg.content);
          case 'user':
            return new HumanMessage(msg.content);
          case 'assistant':
            return new AIMessage(msg.content);
          default:
            return new HumanMessage(msg.content);
        }
      });
      
      // Add timeout for LLM call
      const llmPromise = llm.invoke(langchainMessages);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('LLM request timed out')), 15000);
      });
      
      // Call the LLM with timeout
      const response = await Promise.race([llmPromise, timeoutPromise]) as any;
      
      // Log performance metrics
      const duration = Date.now() - startTime;
      console.log(`LLM response generated in ${duration}ms`);
      
      // Add duration to response headers
      headers.set('X-Response-Time', `${duration}ms`);
      
      // Return the generated content
      return NextResponse.json({
        content: response.content,
        success: true,
        responseTime: duration
      }, { headers });
    } catch (error: any) {
      if (error.message === 'LLM request timed out') {
        return NextResponse.json({
          error: "Request timed out. Please try again.",
          success: false
        }, { status: 504, headers });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error generating LLM response:", error);
    return NextResponse.json({
      error: "An error occurred while processing your request",
      success: false
    }, { status: 500 });
  }
}