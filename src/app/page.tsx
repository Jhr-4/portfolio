// Home page: modernized single-screen design
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  // Condensed list of key skills
  const skills = [
    "Java",
    "Python",
    "PHP",
    "JavaScript",
    "API Services",
    "QA / Unit Testing",
    "Docker",
    "MySQL",
    "Git"
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-12">
        {/* Left section with intro and CTAs */}
        <div className="flex-1 space-y-8">
          {/* Hero section: name, tagline, and location */}
          <section className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary tracking-tight">
              Jay Rana
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 max-w-xl">
              Computer Science student passionate about software development, web technologies, and exploring emerging tech.
            </p>
            <div className="flex items-center text-muted-foreground">
              <span className="material-icons text-sm mr-2">location_on</span>
              <span>New Jersey, USA</span>
            </div>
          </section>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              className="font-medium border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors" 
              variant="outline"
              asChild
            >
              <a href="/Jay_Rana_Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
            </Button>
            <Button 
              className="font-medium bg-primary text-primary-foreground hover:bg-primary/90" 
              asChild
            >
              <a href="https://linkedin.com/in/jay-rana-23441a298" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </Button>
            <Button 
              className="font-medium bg-accent hover:bg-accent/90 text-accent-foreground" 
              asChild
            >
              <Link href="/projects">My Projects</Link>
            </Button>
          </div>
        </div>

        {/* Right section with skills and visual interest */}
        <div className="flex-1">
          <div className="bg-card rounded-xl p-8 border border-border relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary via-accent to-accent-foreground rounded-full opacity-20 blur-2xl"></div>
            
            <h2 className="text-2xl font-serif font-semibold text-primary mb-6">Skills & Interests</h2>
            
            <div className="flex flex-wrap gap-3 relative z-10">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-muted text-foreground rounded-full px-4 py-2 text-sm font-medium border border-border"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                "I'm looking for opportunities to learn from professionals and make real-world impact."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
