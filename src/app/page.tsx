// Home page: modernized single-screen design
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Linkedin, Github, MailOpen } from "lucide-react"
import Image from "next/image"
import { StarryBackground } from "@/components/ui/starry-background"

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
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 relative overflow-hidden">      {/* Moving orbs in the background - increased contrast */}
      <div aria-hidden="true" className="absolute top-1/4 -left-36 w-96 h-96 bg-blue-400/15 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float"></div>
      <div aria-hidden="true" className="absolute bottom-1/4 -right-36 w-96 h-96 bg-teal-400/25 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float animate-delay-2000"></div>
      <div aria-hidden="true" className="absolute top-3/4 left-1/3 w-80 h-80 bg-indigo-400/15 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-float animate-delay-4000"></div>{/* Using the reusable StarryBackground component */}
      <div aria-hidden="true">
        <StarryBackground 
          starsCount={{
            primary: 60,  // More stars for the homepage
            secondary: 45,
            accent: 30,
            dust: 25
          }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-24 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left section with intro and CTAs */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Mobile-only image between intro text and location */}
            <div className="block md:hidden w-full relative py-3">              
              <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-border bg-card shadow-xl max-w-xs mx-auto">
                <Image 
                  src="/images/avatar.png"
                  alt="Humanized portait created with lego bricks structure." 
                  width={400} 
                  height={300} 
                  className="w-full h-auto object-contain mix-blend-luminosity pointer-events-none"
                  priority
                />                
              </div>
            </div>
            <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium border border-primary/20 mx-auto md:mx-0">
              Software Developer & Explorer
            </div>
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-2">
                <span className="text-primary">Jay</span> <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Rana</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground/80 tracking-tight">
                Building <span className="text-accent">thoughtful</span> solutions through code.
              </h2>
            </div>
            <p className="text-xl text-foreground/90 max-w-xl leading-relaxed">
              👋 Hey there, I'm a undergrad Computer Science student at NJIT passionate about software development, web technologies, and exploring emerging tech.
            </p>
            
            <div className="flex items-center text-muted-foreground justify-center md:justify-start">
              <span className="material-icons text-sm mr-2">location_on</span>
              <span>New Jersey, USA</span>
            </div>
              {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start" aria-label="Quick navigation">
              <Button 
                className="font-medium border-2 border-primary hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground transition-colors" 
                variant="outline"
                asChild
              >
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button 
                className="font-medium bg-accent hover:bg-accent/90 text-accent-foreground" 
                asChild
              >
                <Link href="/projects">View My Projects</Link>
              </Button>
            </div>
              <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start" aria-label="Social Media Links">
              <a 
                href="https://www.linkedin.com/in/jay-rana-23441a298/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn Profile" 
                className="p-2 rounded-full hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
              >
                <Linkedin className="text-primary hover:scale-125 focus-visible:scale-125 transition-transform" strokeWidth={1.25} absoluteStrokeWidth />
                <span className="sr-only">LinkedIn Profile</span>
              </a>
              <a 
                href="https://github.com/jhr-4" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub Profile" 
                className="p-2 rounded-full hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
              >
                <Github className="text-primary hover:scale-125 focus-visible:scale-125 transition-transform" strokeWidth={1.25} absoluteStrokeWidth />
                <span className="sr-only">GitHub Profile</span>
              </a>
            </div>
          </div>
          
          {/* Hero Image - hidden on mobile, side-by-side on md+ screens */}
          <div className="hidden md:block flex-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-border bg-card shadow-xl max-w-md mx-auto">
              <Image 
                src="/images/avatar.png"
                alt="Software developer workspace with code on screen" 
                width={500} 
                height={375} 
                className="w-full h-auto object-contain mix-blend-luminosity pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section - Moved lower */}      <section className="container mx-auto px-4 py-16 bg-card/30 rounded-t-3xl border-t border-border relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold text-primary mb-8 text-center" id="skills-section">Skills & Interests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skills tags */}
            <div className="bg-card rounded-xl p-8 border border-border relative overflow-hidden">
              <div aria-hidden="true" className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary via-accent to-accent-foreground rounded-full opacity-20 blur-2xl"></div>
              
              <h3 className="text-xl font-serif font-semibold mb-6">Technical Proficiencies</h3>
              
              <div className="flex flex-wrap gap-3 relative z-10" role="list" aria-label="Skills list">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-muted text-foreground rounded-full px-4 py-2 text-sm font-medium border border-border"
                    role="listitem"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
              {/* Interests & Goals */}
            <div className="bg-card rounded-xl p-8 border border-border relative overflow-hidden">
              <div aria-hidden="true" className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-primary via-accent to-accent-foreground rounded-full opacity-20 blur-2xl"></div>
              
              <h3 className="text-xl font-serif font-semibold mb-6">Interests & Goals</h3>
              
              <ul className="space-y-3 relative z-10" aria-label="Professional interests and goals">
                <li className="flex items-start">
                  <span className="material-icons text-accent mr-2" aria-hidden="true">explore</span>
                  <span>Exploring emerging technologies and their real-world applications</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-accent mr-2" aria-hidden="true">code</span>
                  <span>Building accessible and user-centered applications</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-accent mr-2" aria-hidden="true">psychology</span>
                  <span>Solving complex problems through creative approaches</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-foreground/80 italic">
                  "I'm looking for opportunities to learn while making meaningful contributions."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}