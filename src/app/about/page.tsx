// About page: personal/professional background
import Link from "next/link"
import { BookOpen, Briefcase, Sparkles } from "lucide-react"
import { StarryBackground } from "@/components/ui/starry-background"

// Vertical timeline item component with centered icons
function TimelineItem({ 
  year, 
  title, 
  subtitle, 
  details, 
  isLast = false,
  type = "education" // Can be "education" or "work"
}: { 
  year: string;
  title: string;
  subtitle?: string;
  details?: string;
  isLast?: boolean;
  type?: "education" | "work";
}) {
  return (
    <div className={`relative ${isLast ? "" : "pb-10"}`}>
      {/* Timeline connector - straight line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/30"></div>
      
      {/* Timeline icon - centered on the line */}
      <div className="absolute left-0 top-4 -ml-[15px] h-[30px] w-[30px] rounded-full border-2 border-primary bg-card flex items-center justify-center z-10">
        {type === "education" ? 
          <BookOpen className="h-4 w-4 text-primary" /> : 
          <Briefcase className="h-4 w-4 text-primary" />
        }
      </div>
      
      {/* Content - offset from line */}
      <div className="pl-6 space-y-1">
        <div className="text-sm font-medium text-primary">{year}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        {subtitle && <div className="text-foreground/80 font-medium">{subtitle}</div>}
        {details && <p className="text-muted-foreground text-sm">{details}</p>}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 flex flex-col items-center pt-20 px-4 pb-16 relative overflow-hidden">
            {/* Moving orbs in the background - similar to home page */}
            <div className="absolute top-1/4 -left-36 w-96 h-96 bg-blue-400/15 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-teal-400/25 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float animate-delay-2000"></div>
      <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-indigo-400/15 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-float animate-delay-4000"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400/20 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-float animate-delay-6000"></div>

      <StarryBackground 
        starsCount={{
          primary: 40,
          secondary: 30,
          accent: 20,
          dust: 15
        }}
      />
      
      <main className="max-w-4xl w-full space-y-8 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-8">About Me</h1>
        
        {/* Introduction at the top */}
        <section className="mb-8">
          <p className="text-lg text-foreground">
            Hey, I'm Jay Rana, a Computer Science undergraduate at NJIT, passionate to learn and solve problems through technology. I currently work as an Web Specialist and am exploring various fields like software development, web technologies, and AI.
          </p>
        </section>
        
        {/* Content layout: Two-column with stacked paragraphs and timeline */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Stacked paragraphs - now with vertical centering */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            {/* Projects & Interests */}
            <div className="space-y-4 mb-10">
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">My Projects & Interests</h3>
              <p className="text-foreground mb-4">
                This portfolio showcases my past projects and things I'm currently working on. Some past projects include: <strong>SellarNews</strong> a platform to get all space news in one place, a <strong>gradebook style calculator</strong>, and an <strong>CMS project</strong>. Additionally, there's an AI Playground page with integrated projects created by experimenting with autocoder tools (e.g., GitHub Copilot Agents, Windsurf) to build skills like prompt engineering and learn to integrate AI (including RAG applications) into practical projects.
              </p>
            </div>
            
            {/* What I'm Looking For */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">What I'm Looking For</h3>
              <p className="text-foreground mb-4">
                I'm looking for opportunities to learn more about computer science and make meaningful contributions. I'm eager to grow as a developer, gain experience, and learn from professionals in the field. If you have or know of any opportunities like internships or want to collaborate on a project, please let me know.
              </p>
              <p className="text-foreground">
                Additionally, if you're interested in having an application or service created with AI integration, feel free to contact me.
              </p>
            </div>
          </div>
          
          {/* Right column: Vertical timeline with cleaner design */}
          <div className="lg:w-1/2 space-y-6 pl-4">
            <h3 className="text-xl font-serif font-semibold text-primary mb-6 pl-6">My Journey</h3>
            
            {/* Education Timeline - Vertical with centered icons */}
            <div className="mb-8 relative pl-6">
              <h4 className="text-lg font-medium text-accent mb-4">Education</h4>
              
              <div className="space-y-0 ml-6">
                <TimelineItem 
                  year="2023 - 2027"
                  title="New Jersey Institute of Technology"
                  subtitle="Bachelor of Science in Computer Science"
                  details="Expected Graduation: May 2027"
                />
                
                <TimelineItem 
                  year="2020 - 2023"
                  title="Bergen Community College (Early College Program)"
                  subtitle="Associate of Science in Natural Sciences & Mathematics"
                  details="Graduated: May 2023"
                />
                
                <TimelineItem 
                  year="2019 - 2023"
                  title="Passaic Academy for Science and Engineering"
                  subtitle="High School Diploma"
                  details="Graduated: June 2023"
                  isLast={true}
                />
              </div>
            </div>
            
            {/* Work Experience Timeline - Vertical with centered icons */}
            <div className="mb-8 relative pl-6">
              <h4 className="text-lg font-medium text-accent mb-4">Work Experience</h4>
              
              <div className="ml-6">
                <TimelineItem 
                  year="2024 - Present"
                  title="IS/Web Specialist"
                  subtitle="NJIT's Civic Engagement Computer Center"
                  details="Developing websites for non-profit organizations in Northern New Jersey"
                  isLast={true}
                  type="work"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact section - without the border-t */}
        <div className="pt-8 pb-4 text-center">
          <Link 
            href="/contact" 
            className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
        
        {/* Skills section */}
        <section className="mt-4 pt-8 border-t border-border">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-3xl font-serif font-semibold text-primary text-center">Skills</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-center mb-3 text-accent">Languages</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Java", "Python", "PHP", "JavaScript", "C++", "MySQL", "HTML/CSS"].map((skill) => (
                  <span key={skill} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-center mb-3 text-accent">Frameworks</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Pytest", "Bootstraps", "Tailwind", "React (Learning)"].map((skill) => (
                  <span key={skill} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-center mb-3 text-accent">Tools</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Git", "Docker", "AI APIs", "VS Code", "Unity", "Figma"].map((skill) => (
                  <span key={skill} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
