"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CoinFlipPage() {
  const router = useRouter()
  const id = "coin-flip"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex flex-col items-center pt-1 px-4 pb-16">
      <main className="max-w-5xl w-full space-y-8 py-8">
        {/* Header with back button */}
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
            Coin Flip
          </h1>
        </div>
        
        {/* Project content area */}
        <div className="bg-card border border-border rounded-lg p-6 min-h-[80vh]">
          <Card className="border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Coin Flip</CardTitle>
              <CardDescription>
                A simple interactive coin flip simulator using React hooks and animations
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CoinFlipDemo/>
            </CardContent>
            <CardFooter className="border-t border-border flex flex-col sm:flex-row items-start gap-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">About this project:</p>
                <p>This simple interactive demonstrates:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>React state management with hooks</li>
                  <li>Conditional rendering based on state</li>
                  <li>CSS animations with timeout synchronization</li>
                  <li>Basic probability simulation</li>
                </ul>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

// The actual interactive component (empty for now)
function CoinFlipDemo() {
  return (
    <div className="flex flex-col items-center justify-center h-64 w-full border border-dashed border-border rounded-lg text-muted-foreground">
      <span className="material-icons text-4xl mb-4">animation</span>
      <p>Animation demos will be implemented soon</p>
    </div>
  );
}