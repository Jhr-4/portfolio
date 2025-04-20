// About page: personal/professional background
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-20 px-4 pb-16">
      <main className="max-w-3xl w-full space-y-8 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-8">About Me</h1>
        {/* Background and interests */}
        <section className="space-y-6 text-lg text-foreground">
          <p>
            Hello! I'm Jay Rana, a software developer with a passion for creating engaging and functional web experiences. My journey into tech started with curiosity and a drive to build.
          </p>
          <p>
            I specialize in front-end development using technologies like React, Next.js, and TypeScript, but I also have experience with Node.js, Express, and MongoDB. I enjoy the process of turning complex problems into elegant, user-friendly solutions.
          </p>
          <p>
            Beyond coding, I'm interested in design, open-source, and exploring new tech trends. I'm always eager to learn and collaborate on exciting projects.
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
