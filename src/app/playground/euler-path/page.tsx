"use client"

import React from "react"
import Head from 'next/head'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EulerPath } from "./EulerPath"

export default function EulerPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 flex flex-col items-center pt-1 px-4 pb-2">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
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
            Euler's Path Game
          </h1>
        </div>
        */}
        {/* Project content area */}
        <div className="bg-card border border-border rounded-lg p-6 min-h-[80vh]">
          <Card className="border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Euler's Path Game</CardTitle>
              <CardDescription>
                Find a path that traverses every edge exactly once without retracing or lifting your mouse.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <EulerPath />
            </CardContent>
            <CardFooter className="border-t border-border flex flex-col sm:flex-row items-start gap-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">About this project:</p>
                <p>This interactive game demonstrates:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Canvas-based interactive graph visualization created with Copilot Agent</li>
                  <li>Real-time user interaction with immediate visual feedback</li>
                  <li>Dynamic level loading from JSON configuration</li>
                </ul>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}