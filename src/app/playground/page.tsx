"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { playgroundProjects, getProjectById } from "@/components/setup-playground/playgroundRegistry"
import type { PlaygroundProject } from "@/components/setup-playground/playgroundFormat"
import { StarryBackground } from "@/components/ui/starry-background"

export default function Playground() {
  const router = useRouter();
  
  const navigateToProjects = () => {
    router.push('/projects');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 flex flex-col items-center pt-16 px-4 pb-16 relative overflow-hidden">
      {/* Bubbles */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute top-32 -right-20 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float animate-delay-2000"></div>
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-indigo-400/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float animate-delay-4000"></div>
      
      <StarryBackground 
        starsCount={{
          primary: 40,
          secondary: 30,
          accent: 20,
          dust: 15
        }}
      />
      
      <main className="max-w-5xl w-full space-y-8 py-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-4">Welcome to my Digital Sandbox</h1>
        
        {/* Tabs for navigation between projects and playground */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md bg-muted p-1">
            <button
              onClick={navigateToProjects}
              className="px-6 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolio Collection
            </button>
            <button
              className="px-6 py-2 text-sm font-medium rounded-md bg-background text-foreground"
              aria-current="page"
            >
              Interactive Playground
            </button>
          </div>
        </div>
        
        {/* Project List */}
        <section className="space-y-10">
          <div className="text-center mb-12 space-y-6 flex flex-col items-center">



            <div className="max-w-2xl mx-auto text-lg text-foreground/90">
              <p>These are interactive AI integrated projects. Small experiments/demos with areas I'm currently exploring with the help of AI.</p>
            </div>

            {/* Creative "sandbox" logo */}
            <div className="relative w-full max-w-md h-16 my-2">
              {/* Sand texture */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-b-lg"></div>
              
              {/* Grid lines */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-primary" style={{top: `${i * 10}%`}}></div>
                ))}
                {[...Array(20)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-primary" style={{left: `${i * 5}%`}}></div>
                ))}
              </div>
              
              {/* Animated elements */}
              <div className="absolute flex items-center justify-around w-full left-0 bottom-4">
                <div className="flex items-center gap-1 text-xs font-medium text-primary animate-pulse">
                  <span className="material-icons text-sm">science</span>
                  <span>Explore</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-accent animate-pulse" style={{animationDelay: "0.5s"}}>
                  <span className="material-icons text-sm">construction</span>
                  <span>Build</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-secondary animate-pulse" style={{animationDelay: "1s"}}>
                  <span className="material-icons text-sm">school</span>
                  <span>Learn</span>
                </div>
              </div>
              
              {/* Code element with blinking cursor */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card border border-border px-3 py-1 rounded-md shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono text-primary">&lt;digitalSandbox /&gt;</span>
                  <span className="h-3.5 w-0.5 bg-accent animate-blink"></span>
                </div>
              </div>
            </div>

          </div>
          
          {/* Interactive Projects Grid */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {playgroundProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                />
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

// Component for rendering project cards
function ProjectCard({ project }: { project: PlaygroundProject }) {
  // Use a consistent category style that matches the brand theme
  const categoryStyle = 'bg-primary/20 text-primary font-medium border border-primary/30';
  
  return (
    <Card className="group overflow-hidden border-border hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="font-serif text-xl">{project.title}</CardTitle>
          <span className={`${categoryStyle} text-xs px-2 py-1 rounded-full`}>
            {project.category}
          </span>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {project.description}
        </CardDescription>
      </CardHeader>
      <div className="px-6 py-2 relative h-40 overflow-hidden">
        {/* Project thumbnail image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={project.thumbnailSrc} 
            alt={project.thumbnailAlt || project.title} 
            className={`w-full h-full object-contain ${project.thumbnailType === 'gif' ? 'object-cover' : ''}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
      </div>
      <CardFooter className="flex justify-between border-t border-border pt-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="material-icons text-sm mr-1">{project.techIcon}</span>
          {project.techDescription}
        </div>
        {!project.isComingSoon ? (
          <Link href={`/playground/${project.id}`}>
            <Button 
              variant="default" 
              size="sm" 
              className="gap-1 group-hover:bg-primary/90"
            >
              <span className="material-icons text-sm">launch</span>
              Launch
            </Button>
          </Link>
        ) : (
          <span className="text-xs bg-foreground/10 text-foreground/60 px-2 py-1 rounded">
            Coming Soon
          </span>
        )}
      </CardFooter>
    </Card>
  );
}