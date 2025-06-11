"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarryBackground } from "@/components/ui/starry-background"

// List of external projects to display
const externalProjects = [
  {
    title: "StellarNews",
    description: "A web application that serves users recent space articles from various sources, eliminating the need to surfing across numerous websites to see the current space news.",
    link: "https://github.com/Jhr-4/StellarNews",
    tech: "PHP, MySQL, HTML, Bootstrap, SpaceNews API, Git",
    image: "/images/projects/StellarNews.png"
  },
  {
    title: "CLI Calculator",
    description: "Simple yet Complex CLI Calculator Project with Unit Testing (pytest), Logging (Processes & Errors), & OOP / Design Patterns.",
    link: "https://github.com/Jhr-4/CLI_Calculator",
    tech: "Python, pytest, OOP, Design Patterns, Logging",
    image: "/images/projects/CLI_Calculator.png"
  },
  {
    title: "CurrentAI - Headless Drupal CMS",
    description: "Collaborative Headless Drupal CMS project built with Dockerized components and hosted on DigitalOcean.",
    link: "https://github.com/Jhr-4/IS373_AI_News",
    tech: "Drupal, Docker, DigitalOcean, Headless CMS",
    image: "/images/projects/CurrentAI.png"
  },
  {
    title: "Roll-A-Ball",
    description: "A roll a ball game with the objective of collecting cherries to progress and avoiding ghosts & obstacles.",
    link: "https://github.com/Jhr-4/RollABall-Sprint2",
    tech: "C#, Unity",
    image: "/images/projects/RollABall.webp"
  },
  {
    title: "Grade Calculator",
    description: "A user-friendly Grade Calculator web application. Allows grades to be saved making it easy to track grades and modify upon getting more assignments (First Project).",
    link: "https://github.com/Jhr-4/GradeCalculator",
    tech: "HTML, CSS, JavaScript",
    image: "/images/projects/GradeCalculator.png"
  }
];

export default function Projects() {
  const router = useRouter();
  
  const navigateToPlayground = () => {
    router.push('/playground');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 flex flex-col items-center pt-16 px-4 pb-16 relative overflow-hidden">
      {/* Bubble orbs with different placements */}
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
              className="px-6 py-2 text-sm font-medium rounded-md bg-background text-foreground"
              aria-current="page"
            >
              Portfolio Collection
            </button>
            <button
              onClick={navigateToPlayground}
              className="px-6 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Interactive Playground
            </button>
          </div>
        </div>
        
        {/* Projects section */}
        <section className="space-y-8">
          <div className="text-center mb-12 space-y-6 flex flex-col items-center">
            <div className="max-w-2xl mx-auto text-lg text-foreground/90">
              <p>A collection of my past projects, showcasing various skills and technologies I have experience in. </p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalProjects.map((project, index) => (
              <Card key={index} className="flex flex-col bg-card hover:shadow-md transition-shadow duration-200 overflow-hidden mx-auto w-full">

                {/* Image with play button overlay for Roll-A-Ball */}
                <div className="w-full overflow-hidden relative">
                  {project.title === "Roll-A-Ball" ? (
                    <>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-[256px] object-fill"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors">
                        <Button
                          variant="default"
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105 gap-2 rounded-full"
                          asChild
                        >
                          <Link
                            href="https://jhr4.itch.io/rollaball-v1-3"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:no-underline"
                          >
                            <span className="material-icons">play_arrow</span>
                            Play Game
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-[256px] object-fill"
                    />
                  )}
                </div>
                
                <div className="px-4 py-3 flex flex-col items-center text-center">
                  {/* Centered title */}
                  <CardTitle className="text-lg font-serif text-foreground/90 mb-2">{project.title}</CardTitle>
                  
                  {/* Centered technologies list without label */}
                  {project.tech && (
                    <div className="mb-3 flex flex-wrap justify-center gap-1">
                      {project.tech.split(',').map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Centered description */}
                  <CardDescription className="text-muted-foreground text-sm">
                    {project.description}
                  </CardDescription>
                </div>
                
                {/* Button at bottom */}
                <div className="mt-auto flex justify-center">
                  {project.link && project.link !== "#" ? (
                    <Button
                      variant="outline"
                      size="default"
                      className="border-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm w-full py-1.5"
                      asChild
                    >
                      <Link
                        href={project.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        &#128279; View Project
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="py-1.5" disabled>Details coming soon</Button>
                  )}
                </div>
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
