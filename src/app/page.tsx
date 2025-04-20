// Home page: overview, about, skills, and call to action
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  // List of key skills
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Git",
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto space-y-16 pt-20 px-4 pb-16">
        {/* Hero section: name and tagline */}
        <section className="text-center space-y-4 max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Jay Rana
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Software Developer passionate about building modern web applications and solving problems with code.
          </p>
        </section>
        {/* About snippet */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground">
            I'm a dedicated developer focused on creating intuitive and performant user experiences. I enjoy tackling challenges and continuously learning new technologies.
          </p>
        </section>
        {/* Skills section */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-6">My Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-block bg-accent text-accent-foreground rounded-full px-4 py-2 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
        {/* Call to action section */}
        <section className="text-center space-y-6 py-16 bg-muted rounded-lg">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary max-w-3xl mx-auto mb-4">
            Interested in my work?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Check out some of the projects I've built.
          </p>
          <Button asChild size="lg" className="text-base bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/projects">Explore Projects</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}
