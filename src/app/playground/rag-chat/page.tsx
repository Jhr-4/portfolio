"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getRAGSystem, Message, PERSONA } from "@/lib/rag-utils"
import { EmbeddingsNotice } from "@/app/playground/rag-chat/EmbeddingNotice"

export default function RagChatPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 flex flex-col items-center pt-2  px-4 pb-2">
      <main className="max-w-5xl w-full space-y-8 py-2">
        {/* Header with back button */}
        {/*
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/playground')}
            className="gap-1"
          >
            <span className="material-icons text-sm">arrow_back</span>
            Back to Playground
          </Button>
        </div>


        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            RAG Chat Application
          </h1>
        </div>*/}
        
        {/* Project content area */}
        <div>
          <Card className="overflow-hidden">
            {/*<CardHeader>
              <CardTitle className="font-serif text-2xl">Retrieval-Augmented Generation Chat</CardTitle>
            </CardHeader>*/}
            <CardContent className="p-2">
              <RagChatDemo />
            </CardContent>
            <CardFooter className="border-t border-border flex flex-col sm:flex-row items-start gap-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">About this project:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>A philosipher ragbot trained on AI and technological impacts</li>
                  <li>LangChain.js RecursiveCharacterTextSplitter</li>
                  <li>Pinecone serverless vector database</li>
                  <li>Nomic Atlas embedding model (nomic-embed-text-v1.5)</li>
                  <li>Groq API with Llama-3.1-8B model</li>
                </ul>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

// The RAG Chat interactive component
function RagChatDemo() {
  // State for messages, loading status, and initialization
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Rate limiting state (10 messages per time window)
  const [messagesRemaining, setMessagesRemaining] = useState(10);
  
  // Rate limit configuration - centralized for easy modification
  const getRateLimitConfig = () => {
    return {
      maxMessages: 10,
      durationHours: 3,
      durationMs: 5 * 60 * 60 * 1000, // 5 hours in milliseconds
      storageKey: 'ragchat_rate_limit'
    };
  };
  
  // Check rate limit on component mount
  useEffect(() => {
    checkRateLimit();
  }, []);
  
  // Function to check the current rate limit status
  const checkRateLimit = () => {
    const config = getRateLimitConfig();
    const rateLimitData = localStorage.getItem(config.storageKey);
    const now = Date.now();
    
    if (rateLimitData) {
      const { count, timestamp } = JSON.parse(rateLimitData);
      
      // If time window has passed, reset the count
      if (now - timestamp > config.durationMs) {
        localStorage.removeItem(config.storageKey);
        setMessagesRemaining(config.maxMessages);
      } else {
        setMessagesRemaining(Math.max(0, config.maxMessages - count));
      }
    } else {
      setMessagesRemaining(config.maxMessages);
    }
  };
  
  // Initialize welcome message when component mounts
  useEffect(() => {
    // Add a welcome message
    setMessages([
      {
        role: "assistant",
        content: `Hi! I'm ${PERSONA.name}. ${PERSONA.description} I have access to documents about AI and RAG systems. How can I help you today?`
      }
    ]);
  }, []);
  
  // Auto-scroll only the chat messages container
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || loading) return;
    
    // Check and update rate limit
    const isAllowed = updateRateLimit();
    if (!isAllowed) {
      // Get remaining time
      const config = getRateLimitConfig();
      const rateLimitData = localStorage.getItem(config.storageKey);
      if (rateLimitData) {
        const { timestamp } = JSON.parse(rateLimitData);
        const timeRemaining = config.durationMs - (Date.now() - timestamp);
        const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));
        
        // Add user message and rate limit message
        setMessages(prev => [
          ...prev, 
          { role: "user", content: input.trim() },
          { 
            role: "assistant", 
            content: `You've reached the limit of ${config.maxMessages} messages per ${config.durationHours} hours. Please try again in approximately ${minutesRemaining} minutes.` 
          }
        ]);
        setInput("");
      }
      return;
    }
    
    // Add user message
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      // Get response from RAG system
      const ragSystem = getRAGSystem();
      const response = await ragSystem.generateResponse([...messages, userMessage]);
       
      // Add assistant response
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I encountered an error processing your request. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to update rate limit
  const updateRateLimit = (): boolean => {
    const config = getRateLimitConfig();
    const rateLimitData = localStorage.getItem(config.storageKey);
    const now = Date.now();
    
    if (rateLimitData) {
      const { count, timestamp } = JSON.parse(rateLimitData);
      
      // If time window has passed, reset the count
      if (now - timestamp > config.durationMs) {
        localStorage.setItem(config.storageKey, JSON.stringify({
          count: 1,
          timestamp: now
        }));
        setMessagesRemaining(config.maxMessages - 1);
        return true;
      }
      
      // If user has reached the limit
      if (count >= config.maxMessages) {
        setMessagesRemaining(0);
        return false;
      }
      
      // Update count
      localStorage.setItem(config.storageKey, JSON.stringify({
        count: count + 1,
        timestamp
      }));
      setMessagesRemaining(config.maxMessages - (count + 1));
      return true;
    } else {
      // First message, set initial count
      localStorage.setItem(config.storageKey, JSON.stringify({
        count: 1,
        timestamp: now
      }));
      setMessagesRemaining(config.maxMessages - 1);
      return true;
    }
  };

  return (
      <div className="flex flex-col h-[calc(90vh)] border border-border rounded-lg overflow-hidden">
        {/* Messages Area */}
        <div 
          ref={messagesContainerRef} 
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50"
        >
          {/* Embeddings status notification */}
          <EmbeddingsNotice className="mb-4" />
          
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'assistant' 
                      ? 'bg-card border border-border text-card-foreground shadow-sm' 
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    {message.content.split('\n').map((line: string, i: number) => (
                      <p key={i} className={i === 0 ? "mt-0 mb-2" : "my-2"}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-card border border-border">
                <div className="loading-spinner" aria-label="Loading response"></div>
              </div>
            </div>
          )}
        </div>
          {/* Input Area */}
        <div className="border-t border-border p-4 xs:p-2">          <form onSubmit={handleSendMessage} className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={messagesRemaining > 0 
                  ? "Ask a question..." 
                  : "Message limit reached."}
                disabled={loading || messagesRemaining <= 0}
                className="w-full py-2 pl-3 pr-12 sm:pr-4 sm:pl-4 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
              {/* Mobile send button (overlay) */}
              <Button 
                type="submit" 
                disabled={loading || messagesRemaining <= 0}
                variant="default"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-9 h-9 p-0 flex items-center justify-center sm:hidden"
              >
                <span className="material-icons text-sm">send</span>
              </Button>
            </div>
            
            {/* Desktop send button */}
            <Button 
              type="submit" 
              disabled={loading || messagesRemaining <= 0}
              variant="default"
              className="hidden sm:flex ml-2 rounded-full px-4 items-center"
            >
              <span className="material-icons text-sm mr-1">send</span>
              <span>Send</span>
            </Button>
          </form>
          <div className="h-5 px-4 text-xs text-muted-foreground mt-1 flex justify-between">
            {loading && "AI is thinking..."}
            {!loading && (
              <span>
                {messagesRemaining > 0 
                  ? `${messagesRemaining} message${messagesRemaining !== 1 ? 's' : ''} remaining` 
                  : "Message limit reached"}
              </span>
            )}
          </div>
        </div>
      </div>
  );
}