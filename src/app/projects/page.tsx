// Projects page: project cards and navigation
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// List of projects to display
const projects = [
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
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-20 px-4 pb-16">
      <main className="max-w-4xl w-full space-y-12 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-10">My Projects</h1>
        {/* Project cards grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col bg-card hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
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
        </section>
        {/* Message if no projects */}
        {projects.length === 0 && (
          <p className="text-center text-muted-foreground text-lg">
            Project details are being added. Check back soon!
          </p>
        )}
        {/* Navigation link */}
        <div className="text-center mt-12">
          <Link href="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
