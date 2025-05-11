"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Import our new chart components
import LinePlot from "@/components/charts/LinePlot"
import BarChart from "@/components/charts/BarChart"
import PieChart from "@/components/charts/PieChart"

// Main component that controls the visualization display
function D3Visualization() {
  // Define the section type to ensure type safety
  type SectionKey = 'analyzing-trend' | 'profits-going' | 'conclusion';
  
  const [activeSection, setActiveSection] = useState<SectionKey>('analyzing-trend');
  
  // Define the content sections in a narrative flow
  const sections: Record<SectionKey, { title: string; content: React.ReactNode }> = {
    'analyzing-trend': {
      title: "Analyzing the Trend",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="flex flex-col items-center mb-12">
            <LinePlot 
              filePath="/csv/ProductivityVsEarnings.csv" 
              title="Productivity vs. Earnings (1979-2024)" 
              dependent="earnings" 
              dateFormat="%m/%d/%Y" 
            />
            <p className="mt-4 text-sm md:text-base max-w-2xl">
              This chart illustrates a significant divergence: while labor productivity is rapidly increasing, real median weekly earnings appear relatively flat. From 1979 to early 2024, <strong> productivity has increased 131.4%</strong> while <strong>earnings only increased by 11.9%</strong>. However, this isn't the whole picture as workers earn more than just a regular wage. Many earn things like paid holidays, awards, insurance, etc. This is all termed as compensation.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <LinePlot 
              filePath="/csv/ProductivityVsCompensation.csv" 
              title="Productivity vs. Compensation (1979-2024)" 
              dependent="compensation" 
              dateFormat="%Y-%m-%d" 
            />
            <p className="mt-4 text-sm md:text-base max-w-2xl ">
              When including all benefits, total compensation shows more growth than just earnings, 
              and at least has an increasing trend like the productivity. However, a noticeable gap still emerges and widens over time. It is seen that both started off with a similar rate of increase, however slowly the rate for productivity boomed while the compensation is increasing a lot slower. Over the time frame of the graph, <strong>compensation increased around 52.5%</strong>, which is still significantly behind productivity.
              <a onClick={() => {setActiveSection('profits-going'); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="hover:underline cursor-pointer text-primary ml-1"> So where are the profits going? {`->`}</a>
            </p>
          </div>
        </div>
      )
    },
    'profits-going': {
      title: "Where Is The Profit Going?",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="flex flex-col items-center mb-12">
            <div className="w-full flex justify-center">
              <BarChart 
                filePath="/csv/CorporateProfits.csv" 
                title="Corporate Profits After Tax (1979-2023)" 
                dependent="Corporate_Profits_Indexed_1979" 
                dateFormat="%m/%d/%Y" 
              />
            </div>
            <p className="mt-4 text-sm md:text-base max-w-2xl">
              To see where the profits go, above are the corporate profits in which they have grown substantially over the decades. When indexing 1979 it's seen that there was an increase of <strong> 1,634% in corporate profits</strong> by 2023. However, this doesn't mean the profits go directly to the shareholders or the top people. It is more complex as a significant portion is reinvested into the company to ensure continuously increasing profits.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center">
              <PieChart 
                filePath="/csv/ProductivityContribution.csv" 
                title="Contributions to Productivity Growth (1987-2022)" 
                values="values" 
              />
            </div>
            <p className="mt-4 text-sm md:text-base max-w-2xl">
              In this chart, it's seen that on average between 1987 and 2022, <strong>Capital Intensity (45%)</strong> and 
              <strong> TFP (40%)</strong> were the largest contributors to productivity growth. 
              Labor Composition (improvements in worker skills/education) accounted for only <strong>15%</strong>. This data helps explain why productivity gains don't directly translate into a increase in earnings. A significant portion of the profits due to the productivity are actually reinvested for betterment of the infrastructure capital improvements. This creates a complex relationship and is a potential reason as to why there's no longer a 1:1 ratio between productivity and wages/compensation. Today, it's very important to reinvest to increase the company's production. However, this raises many social questions regarding the balance between reinvestment and fair earnings/compensations for the workers. <a onClick={() => {setActiveSection('conclusion'); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="hover:underline cursor-pointer text-primary ml-1"> Summation {`->`}</a>
            </p>
          </div>
        </div>
      ),
    },
    'conclusion': {
      title: "Key Takeaways",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="mb-6 text-sm md:text-base">
            The data reveals a significant difference between productivity growth and earnings. In other words, while productivity is rapidly increasing, workers aren't having proportional increases in their compensation. Digging deeper into this "productivity-pay gap" reveals how there's actually a significant increase in corporate profits (which can also be seen in GDP growth), but these gains aren't directly flowing to workers. Many times the profits are reinvested into capital improvements and technological efficiency which account for 85% of the productivity growth. Additionally, a portion of the profits also goes to investors and shareholders rather than workers, which can be another reason for stagnant wages and lagging compensation in comparison to the productivity. 
            <br/><br/>
            This growing gap is also important to look at as it plays a role in issues like income inequality and economic mobility as many labor workers receive wages which are seen to be stagnant and minimal compensation. Additionally, with AI and automation continuing to advance, this divergence may widen further unless economic policies are adjusted to ensure productivity gains are shared more broadly across the workforce.
          </p>
          <div className="bg-muted/30 p-6 rounded-lg border border-border mt-6">
            <h3 className="text-lg font-medium mb-2">Key Statistics (1979-2024):</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="mb-1"><span className="font-medium">Productivity Growth:</span> 131.4%</p>
                <p className="mb-1"><span className="font-medium">Real Earnings Growth:</span> 11.9%</p>
              </div>
              <div>
                <p className="mb-1"><span className="font-medium">Total Compensation Growth:</span> 52.5%</p>
                <p className="mb-1"><span className="font-medium">Corporate Profits Growth:</span> 1,634%</p>
              </div>
            </div>
          </div>
        </div>
      ),
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setActiveSection('analyzing-trend')}
          variant={activeSection === 'analyzing-trend' ? 'default' : 'outline'}
          className="rounded-full"
        >
          Analyzing the Trend
        </Button>
        <Button
          onClick={() => setActiveSection('profits-going')}
          variant={activeSection === 'profits-going' ? 'default' : 'outline'}
          className="rounded-full"
        >
          Where Profits Go?
        </Button>
        <Button
          onClick={() => setActiveSection('conclusion')}
          variant={activeSection === 'conclusion' ? 'default' : 'outline'}
          className="rounded-full"
        >
          Key Takeaways
        </Button>
      </div>
      
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">{sections[activeSection].title}</h2>
        {sections[activeSection].content}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">Data Sources:</p>
        <p>U.S. Bureau of Labor Statistics (BLS), Bureau of Economic Analysis (BEA), Federal Reserve Economic Data (FRED)</p>
      </div>
    </div>
  );
}

export default function D3VisualizationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-foreground/40 flex flex-col items-center pt-1 px-2 pb-2">
      <main className="max-w-5xl w-full space-y-8 py-2">
        {/* Header with back button */}
        {/*
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/playground')}
            className="gap-1"
          >
            <span className="material-icons text-sm">arrow_back</span>
            Back to Playground
          </Button>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Labor Productivity & Earnings
          </h1>
          <p className="text-muted-foreground">
            Examining the relationship between productivity growth and worker compensation
          </p>
        </div>
        */}
        {/* Project content area */}
        <div className="bg-card border border-border rounded-lg p-2 md:p-6 min-h-[80vh]">
          <Card className="border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Labor Productivity & Earnings - D3.js Data Visualization</CardTitle>
              <CardDescription>
                Examining the relationship between productivity growth and worker compensation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <D3Visualization />
            </CardContent>
            <CardFooter className="border-t border-border flex flex-col sm:flex-row items-start gap-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">About this project:</p>
                <p>This data visualization project demonstrates:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>D3.js integration with React in Next.js</li>
                  <li>Interactive, accessible SVG chart rendering</li>
                  <li>Complex economic data interpretation</li>
                  <li>Responsive design with theme integration using GitHub's Copilot Agent</li>
                  <li><a href="https://github.com/Jhr-4/DataVisualization_ProductivityEarnings" target="_blank">GitHub Repo: Original Visualization Project</a></li>
                </ul>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}