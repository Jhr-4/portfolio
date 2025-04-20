// About page: personal/professional background
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-20 px-4 pb-16">
      <main className="max-w-3xl w-full space-y-8 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-8">About Me</h1>
        
        {/* Background and profile summary */}
        <section className="space-y-6 text-lg text-foreground">
          <p>
            Hi, I'm Jay Rana, a Computer Science student at NJIT with a passion for software development, web, and mobile technologies. I enjoy learning new tools and frameworks, and I'm always looking for ways to build and improve digital experiences.
          </p>
          
          <p>
            I'm currently exploring various technologies including AI, web development, and software engineering. I'm particularly interested in learning how these technologies can solve real-world problems and create positive change. While emerging technologies like AI fascinate me, I'm equally enthusiastic about strengthening my foundation in core programming concepts and software design principles.
          </p>
          
          <p>
            I'm looking for opportunities to work with and learn from experienced professionals who can help me grow as a developer. Whether it's through internships, mentorship, or collaborative projects, I'm eager to contribute to meaningful work while expanding my technical skills. My goal is to build a versatile skill set that allows me to tackle challenging problems and make a tangible impact in whatever field I work in.
          </p>
        </section>
        
        {/* Navigation links */}
        <div className="text-center mt-12">
          <Link href="/projects" className="text-primary hover:underline">
            View my projects
          </Link>
          <span className="mx-2 text-muted-foreground">|</span>
          <Link href="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
