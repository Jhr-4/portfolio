import Link from "next/link"
import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col bg-card hover:shadow-md transition-shadow duration-200 overflow-hidden mx-auto w-full">
      <div className="relative w-full overflow-hidden">
        <img
          src={project.image}
          alt={`Preview of ${project.title}`}
          className="h-[256px]  w-full object-cover"
        />
        {project.playUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50">
            <Button size="lg" className="rounded-full" asChild>
              <Link href={project.playUrl} target="_blank" rel="noopener noreferrer">
                  <span className="material-icons">play_arrow</span>
                Play Game
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center px-4 py-3 text-center">
        {/* Centered title */}
        <CardTitle className="mb-2 text-lg text-accent/90 font-serif">{project.title}</CardTitle>

        {/* Centered technologies list without label */}
        <div className="mb-3 flex flex-wrap justify-center gap-1" aria-label={`Technologies used in ${project.title}`}>
          {project.tech.split(",").map((technology) => (
            <span
              key={technology}
              className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
            >
              {technology.trim()}
            </span>
          ))}
        </div>
        {/* Centered description */}
        <CardDescription className="text-muted-foreground text-sm">{project.description}</CardDescription>
      </div>

      
      {/* Button at bottom */}
      <div className="mt-auto flex min-h-10 justify-center">
        {project.link === "N/A" ? ( //N/A for no project demo and not planning to add one. Private Project. 
          <span className="px-4 text-center text-sm text-muted-foreground">
          </span>
        ) :
        project.link ? (
          <Button
            variant="outline"
            size="default"
            className="border-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm w-full py-1.5"
            asChild
          >
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden="true" />
              View Project
            </Link>
          </Button>
        ) : (
          <span className="px-4 text-center text-sm text-muted-foreground">Project details are being added. Check back soon!</span>
        )}
      </div>
    </Card>
  )
}
