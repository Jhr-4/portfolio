"use client"

import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

// Interface definitions for the data and props
export interface BarDataPoint {
  date: Date;
  [key: string]: number | Date; // For dynamic dependent property
}

export interface BarChartProps {
  filePath: string;
  title: string;
  dependent: string;
  dateFormat?: string;
}

// BarChart component for bar chart visualizations
const BarChart = ({ filePath, title, dependent, dateFormat = "%m/%d/%Y" }: BarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<BarDataPoint[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<BarDataPoint | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Step 1: Improved CSV data loading with error handling
  useEffect(() => {
    setIsLoading(true);
    d3.csv(filePath)
      .then(rawData => {
        const parsedData: BarDataPoint[] = [];
        
        rawData.forEach(d => {
          try {
            // First check if date exists
            const date = d3.timeParse(dateFormat)(d.observation_date);
            if (!date) {
              //console.warn("Invalid date format:", d.observation_date);
              return; // Skip this iteration
            }
            
            // Check if dependent value is empty or invalid first
            if (d[dependent] === "" || d[dependent] === undefined || d[dependent] === null) {
              //console.warn("Empty dependent value:", d);
              return; // Skip this iteration
            }
            
            // Now convert to number, knowing the value exists
            const value = +d[dependent];
            
            // Final check for NaN after conversion (handles cases like "abc" that convert to NaN)
            if (isNaN(value)) {
              //console.warn("Non-numeric value detected:", d);
              return; // Skip this iteration
            }
            
            // Valid data point
            parsedData.push({ date, [dependent]: value });
          } catch (e) {
            console.error("Error parsing data point:", e, d);
          }
        });
          
        setData(parsedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error loading CSV data:", error);
        setData([]);
        setIsLoading(false);
      });
  }, [filePath, dependent, dateFormat]);

  // Step 2: Chart rendering effect with responsiveness
  useEffect(() => {
    if (data.length === 0 || !svgRef.current || !chartContainerRef.current) return;

    try {
      // Create tooltip only once per render cycle
      const tooltipId = "barchart-tooltip";
      let tooltip = d3.select<HTMLDivElement, unknown>(`#${tooltipId}`);
      
      if (tooltip.empty()) {
        tooltip = d3.select<HTMLDivElement, unknown>("body")
          .append("div")
          .attr("id", tooltipId)
          .attr("class", "d3-tooltip")
          .style("position", "absolute")
          .style("background", "hsl(var(--card))")
          .style("color", "hsl(var(--card-foreground))")
          .style("border", "1px solid hsl(var(--border))")
          .style("padding", "8px")
          .style("border-radius", "var(--radius)")
          .style("box-shadow", "0px 2px 10px hsla(var(--muted), 0.15)")
          .style("font-family", "var(--font-sans)")
          .style("font-size", "0.875rem")
          .style("visibility", "hidden")
          .style("pointer-events", "none")
          .style("z-index", "1000")
          .style("max-width", "200px"); // Prevent tooltip from getting too wide on mobile
      }
      
      // Get actual container width for responsiveness
      const containerElement = chartContainerRef.current;
      const containerWidth = containerElement.getBoundingClientRect().width;
      
      // Check if we're on a small screen (same breakpoint as LinePlot)
      const isSmallScreen = window.innerWidth < 640;
      
      // On small screens, use the same minimum width as LinePlot for consistency
      const minChartWidth = 500; // Minimum width to maintain detail (same as LinePlot)
      
      // Adjust margins based on device size
      const margin = { top: 30, right: 30, bottom: 60, left: 60 }; // Use same margins as LinePlot
      
      // Set the chart width with same logic as LinePlot
      const width = isSmallScreen ? 
        Math.max(minChartWidth, containerWidth) - margin.left - margin.right :
        Math.min(600, containerWidth) - margin.left - margin.right;
      
      // Use same aspect ratio as LinePlot for consistency
      const aspectRatio = 0.75; // Height is 75% of width (same as LinePlot)
      const height = Math.min(400, width * aspectRatio) - margin.top - margin.bottom;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      // Set viewBox for better responsive behavior
      svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom);

      svg.append("rect")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("fill", "hsl(var(--card))");

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Step 3: Better x-axis with optimized ticks for small screens
      const extentResult = d3.extent(data, d => d.date);
      // Handle the case where extent might return undefined values
      const domainStart = extentResult[0] || new Date();
      const domainEnd = extentResult[1] || new Date();
      
      const x = d3.scaleTime()
        .domain([domainStart, domainEnd])
        .range([0, width]);
      
      const xAxis = d3.axisBottom(x)
        .ticks(isSmallScreen ? 5 : 10)
        .tickFormat(d => {
          // Fix type error by checking the type before creating a Date
          const dateValue = d instanceof Date ? d : new Date(d.valueOf());
          return isSmallScreen ? 
            `'${dateValue.getFullYear().toString().substr(2)}` : // '90, '00, etc. for very small screens
            dateValue.getFullYear().toString(); // Full year for larger screens
        });

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .attr("color", "hsl(var(--muted-foreground))");

      // Improve x-axis readability on small screens
      if (isSmallScreen) {
        g.selectAll(".tick text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em");
      }

      // y axis with simplified ticks for small screens
      const yMaxValue = d3.max(data, d => (d[dependent] as number)) || 0;
      const y = d3.scaleLinear()
        .domain([0, yMaxValue * 1.05])
        .range([height, 0]);

      const yAxis = d3.axisLeft(y)
        .ticks(isSmallScreen ? 3 : 5);

      g.append("g")
        .call(yAxis)
        .attr("color", "hsl(var(--muted-foreground))");

      // Step 4: Improved bar rendering with adaptive spacing
      // Calculate optimal bar width based on available space
      const barPadding = 0.2; // 20% padding between bars
      const barWidth = Math.max(2, Math.min((width / data.length) * (1 - barPadding), 15));
      
      g.append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.date) - barWidth/2)
        .attr("y", d => y(d[dependent] as number))
        .attr("height", d => height - y(d[dependent] as number))
        .attr("width", barWidth)
        .attr("fill", "hsl(var(--primary))")
        .attr("opacity", 0.85)
        .attr("rx", 1) // Slightly rounded corners
        .on("mouseover touchstart", (event, d) => {
          // Set hovered point for screen readers
          setHoveredPoint(d);
          
          // Show and position tooltip properly
          tooltip.style("visibility", "visible")
            .html(`
              <div class="font-medium">Year: ${d3.timeFormat("%Y")(d.date)}</div>
              <div>Value: ${(d[dependent] as number).toLocaleString(undefined, {maximumFractionDigits: 1})}</div>
            `);
          
          // Highlight current bar
          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("fill", "hsl(var(--accent))")
            .attr("opacity", 1);
        })
        .on("mousemove touchmove", (event) => {
          // Position tooltip, ensuring it stays on screen
          const tooltipWidth = parseInt(tooltip.style('width')) || 200;
          const tooltipHeight = parseInt(tooltip.style('height')) || 60;
          
          // Calculate position based on mouse/touch position
          let leftPos = event.pageX + 10;
          let topPos = event.pageY - 10;
          
          // Check if tooltip would go offscreen to the right
          if (leftPos + tooltipWidth > window.innerWidth) {
            leftPos = event.pageX - tooltipWidth - 10;
          }
          
          // Check if tooltip would go offscreen at the bottom
          if (topPos + tooltipHeight > window.innerHeight) {
            topPos = event.pageY - tooltipHeight - 10;
          }
          
          tooltip
            .style("top", `${topPos}px`)
            .style("left", `${leftPos}px`);
        })
        .on("mouseout touchend", (event) => {
          tooltip.style("visibility", "hidden");
          setHoveredPoint(null);
          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("fill", "hsl(var(--primary))")
            .attr("opacity", 0.85);
        });

      // Step 5: Add vertical grid lines for easier reading
      g.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(x.ticks(isSmallScreen ? 5 : 10))
        .enter()
        .append("line")
        .attr("x1", d => x(d))
        .attr("x2", d => x(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "hsl(var(--muted)/0.1)")
        .attr("stroke-dasharray", "2,2");

      // Text labels with responsive font sizes
      const fontSize = isSmallScreen ? "0.75rem" : "0.9rem";
      
      g.append("text")
        .attr("x", width/2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .text(title)
        .attr("fill", "hsl(var(--foreground))")
        .style("font-size", isSmallScreen ? "0.85rem" : "1rem")
        .attr("class", "font-serif font-semibold");

      g.append("text")
        .attr("x", width / 2)
        .attr("y", height + (isSmallScreen ? 35 : 45))
        .attr("text-anchor", "middle")
        .text("Year")
        .attr("fill", "hsl(var(--muted-foreground))")
        .style("font-size", fontSize);

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + (isSmallScreen ? 15 : 25))
        .attr("text-anchor", "middle")
        .text("Index (1979=100)")
        .attr("fill", "hsl(var(--muted-foreground))")
        .style("font-size", fontSize);

      // Add resize handler for responsiveness
      const resizeObserver = new ResizeObserver(() => {
        if (containerElement) {
          const newWidth = containerElement.getBoundingClientRect().width;
          if (Math.abs(newWidth - containerWidth) > 10) {
            // Only redraw if width changed significantly
            svg.selectAll('*').remove();
          }
        }
      });
      
      resizeObserver.observe(containerElement);

      return () => {
        // Only remove the tooltip if this component created it
        d3.select(`#${tooltipId}`).remove();
        resizeObserver.disconnect();
      };
    } catch (error) {
      console.error("Error rendering bar chart:", error);
    }
  }, [data, title, dependent]);

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        ref={chartContainerRef} 
        className="flex flex-col items-center w-full overflow-x-auto pb-4"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--muted)) transparent',
          WebkitOverflowScrolling: 'touch',
          minHeight: '300px',
          minWidth: '100%',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <div className="loading-spinner" aria-label="Loading chart data..."></div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-[300px] text-muted-foreground">
            No data available
          </div>
        ) : (
          <svg ref={svgRef} className="w-full h-auto" style={{ minWidth: '500px', margin: '0 auto' }}></svg>
        )}
      </div>
      {hoveredPoint && (
        <div className="sr-only">
          Currently viewing data point: Year {hoveredPoint.date.getFullYear()}, 
          Value {(hoveredPoint[dependent] as number).toString()}
        </div>
      )}
    </div>
  );
};

export default BarChart;