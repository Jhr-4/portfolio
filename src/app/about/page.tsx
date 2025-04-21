// About page: personal/professional background
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 flex flex-col items-center pt-20 px-4 pb-16">
      <main className="max-w-3xl w-full space-y-8 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-8">About Me</h1>
        
        {/* Background and profile summary */}
        <section className="space-y-6 text-lg text-foreground">
          <p>
            Hey, I'm Jay Rana, a Computer Science undergraduate at NJIT. I have a passion for using technologies to solve problems and finding creative ways to use the technologies. I am currently interested in various fields like software development, web, and AI.
          </p>
          
          <p>
            This portfolio showcases my work and projects, and also includes a Playground page of small projects testing new technologies. Currently, I'm looking into AI technologies such as agentic coding and AI APIs while developing prompt engineering skills and learning how to integrate AI into projects.
          </p>
          
          <p>
            Currently, I'm seeking internships and opportunities that will help me grow as a developer. I would like to learn more about Computer Science and gain experience in the various fields it offers. Through the opportunities, I hope to learn from professionals while making a meaningful impact. I want to gain practical experience solving problems and expanding my technical skills across multiple areas.
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
