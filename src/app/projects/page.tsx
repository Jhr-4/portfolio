"use client"

// Projects page with navigation to Playground
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// List of external projects to display
const externalProjects = [
  {
    title: "Project One Title",
    description: "A brief description of Project One, highlighting key features and technologies used.",
    link: "#"
  },
  {
    title: "Project Two Title",
    description: "A brief description of Project Two, highlighting key features and technologies used.",
    link: "#"
  },
  {
    title: "Project Three Title",
    description: "A brief description of Project Three, highlighting key features and technologies used.",
    link: "#"
  },
];

export default function Projects() {
  const router = useRouter();
  
  const navigateToPlayground = () => {
    router.push('/playground');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex flex-col items-center pt-16 px-4 pb-16">
      <main className="max-w-5xl w-full space-y-8 py-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-4">Welcome to my Digital Sandbox</h1>
        
        {/* Tabs for navigation between projects and playground */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md bg-muted p-1">
            <button
              onClick={navigateToPlayground}
              className="px-6 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Interactive Playground
            </button>
            <button
              className="px-6 py-2 text-sm font-medium rounded-md bg-background text-foreground"
              aria-current="page"
            >
              Portfolio Collection
            </button>
          </div>
        </div>
        
        {/* Projects section */}
        <section className="space-y-8">
          <div className="text-center mb-12 space-y-6 flex flex-col items-center">
            <div className="max-w-2xl mx-auto text-lg text-foreground/90">
              <p>A collection of external projects and collaborations showcasing various skills and technologies.</p>
            </div>
            
            {/* Creative "sandbox" logo for consistency with playground page */}
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
                  <span className="material-icons text-sm">code</span>
                  <span>Design</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-accent animate-pulse" style={{animationDelay: "0.5s"}}>
                  <span className="material-icons text-sm">integration_instructions</span>
                  <span>Develop</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-secondary animate-pulse" style={{animationDelay: "1s"}}>
                  <span className="material-icons text-sm">rocket_launch</span>
                  <span>Deploy</span>
                </div>
              </div>
              
              {/* Code element with blinking cursor */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card border border-border px-3 py-1 rounded-md shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono text-primary">&lt;portfolioCollection /&gt;</span>
                  <span className="h-3.5 w-0.5 bg-accent animate-blink"></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {externalProjects.map((project, index) => (
              <Card key={index} className="flex flex-col bg-card hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-primary">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  {project.link && project.link !== "#" ? (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View Project
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">Details coming soon</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {externalProjects.length === 0 && (
            <p className="text-center text-muted-foreground text-lg">
              Project details are being added. Check back soon!
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
