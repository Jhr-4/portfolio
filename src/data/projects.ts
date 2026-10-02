export type Project = {
  title: string
  description: string
  link?: string
  tech: string
  image: string
  featured?: boolean
  featuredOrder?: number
  playUrl?: string
}

export const projects: Project[] = [
  {
    title: "StellarNews",
    description: "A web application that serves users recent space articles from various sources, eliminating the need of surfing across numerous websites to see the current space news.",
    link: "https://github.com/Jhr-4/StellarNews",
    tech: "PHP, MySQL, HTML, Bootstrap, SpaceNews API, Git",
    image: "/images/projects/StellarNews.png",
    featured: true,
    featuredOrder: 1,
  },
  {
    title: "Pixel Art Generator",
    description: "Custom trained SD 1.5 LoRA using a 500+ image dataset compiled from open-licensed sources, optimized to train in ~2 hours under 8GB VRAM on Colab. Deployed with a Gradio demo for generating 16x16 pixel-art game assets.",
    link: "https://colab.research.google.com/github/Jhr-4/PixelArt_LoRA/blob/main/PixelArt_LoRA_Gradio.ipynb",
    tech: "Python, LoRA, Stable Diffusion, Gradio",
    image: "/images/projects/PixelLoRA.png",
    featured: true,
    featuredOrder: 2,
  },
  {
    title: "CurrentAI - Headless Drupal CMS",
    description: "Headless CMS platform running Drupal in Docker containers on a DigitalOcean droplet, with Traefik for reverse proxying and a GitHub Actions CI/CD pipeline for automated deployments.",
    link: "https://github.com/Jhr-4/IS373_AI_News",
    tech: "Drupal, Docker, DigitalOcean, Traefik, GitHub Actions",
    image: "/images/projects/CurrentAI.png",
  },
  {
    title: "FlightMaster",
    description: "Flight intelligence chat app combining RAG with an MCP style tool-calling architecture, pulling real time data from multiple APIs via backend services and rendering it in structured UI components.",
    tech: "Next.js, React, Groq, AI Agents, Codex",
    link: "N/A",
    image: "/images/projects/FlightMaster.png",
    featured: true,
    featuredOrder: 3,
  },
  {
    title: "CLI Calculator",
    description: "CLI Calculator Project with Unit Testing (pytest), Logging (Processes & Errors), & OOP / Design Patterns.",
    link: "https://github.com/Jhr-4/CLI_Calculator",
    tech: "Python, pytest, OOP, Design Patterns, Logging",
    image: "/images/projects/CLI_Calculator.png",
  },
  {
    title: "Roll-A-Ball",
    description: "A roll a ball game with the objective of collecting cherries to progress and avoiding ghosts & obstacles.",
    link: "https://github.com/Jhr-4/RollABall-Sprint2",
    tech: "C#, Unity",
    image: "/images/projects/RollABall.webp",
    playUrl: "https://jhr4.itch.io/rollaball-v1-3",
  },
  {
    title: "Grade Calculator",
    description: "A user-friendly Grade Calculator web application. Allows grades to be saved making it easy to track grades and modify upon getting more assignments.",
    link: "https://github.com/Jhr-4/GradeCalculator",
    tech: "HTML, CSS, JavaScript",
    image: "/images/projects/GradeCalculator.png",
  },
]

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((first, second) => (first.featuredOrder ?? 0) - (second.featuredOrder ?? 0))
  .slice(0, 3)
