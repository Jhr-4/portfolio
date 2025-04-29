"use client"

import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

// Interface definitions for the data and props
export interface DataPoint {
  date: Date;
  productivity: number;
  [key: string]: number | Date; // Allow for dynamic keys like "earnings" or "compensation"
}

export interface LinePlotProps {
  filePath: string;
  title: string;
  dependent: string;
  dateFormat?: string;
}

// LinePlot component for line chart visualizations
const LinePlot = ({ filePath, title, dependent, dateFormat = "%m/%d/%Y" }: LinePlotProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataPoint[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Step 1: Improved CSV data loading with error handling
  useEffect(() => {
    setIsLoading(true);
    d3.csv(filePath)
      .then(rawData => {
        const parsedData: DataPoint[] = rawData
          .map(d => {
            try {
              // First check if date exists
              const date = d3.timeParse(dateFormat)(d.observation_date);
              if (!date) {
                //console.warn("Invalid date format:", d.observation_date);
                return null;
              }
              
              // Check if productivity is empty or invalid first
              if (d.productivity === "" || d.productivity === undefined || d.productivity === null) {
                //console.warn("Empty productivity value:", d);
                return null;
              }
              
              // Check if dependent value is empty or invalid first
              if (d[dependent] === "" || d[dependent] === undefined || d[dependent] === null) {
                //console.warn("Empty dependent value:", d);
                return null;
              }
              
              // Now convert to numbers, knowing the values exist
              const productivityValue = +d.productivity;
              const dependentValue = +d[dependent];
              
              // Final check for NaN after conversion (handles cases like "abc" that convert to NaN)
              if (isNaN(productivityValue) || isNaN(dependentValue)) {
                console.warn("Non-numeric value detected:", d);
                return null;
              }
              
              // Valid data point
              return {
                date,
                productivity: productivityValue,
                [dependent]: dependentValue
              };
            } catch (e) {
              console.error("Error parsing data point:", e, d);
              return null;
            }
          })
          .filter((d): d is DataPoint => d !== null);
          
        setData(parsedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error loading CSV data:", error);
        setData([]);
        setIsLoading(false);
      });
  }, [filePath, dependent, dateFormat]);

  useEffect(() => {
    if (data.length === 0 || !svgRef.current || !chartContainerRef.current) return;

    try {
      // Step 2: Get actual container width for responsiveness
      const containerElement = chartContainerRef.current;
      // We've already checked that chartContainerRef.current is not null above
      const containerWidth = containerElement.getBoundingClientRect().width;
      
      // Check if we're on a small screen
      const isSmallScreen = window.innerWidth < 640;
      
      // On small screens, we'll use a minimum width to ensure detail is preserved
      // This will make the chart horizontally scrollable
      const minChartWidth = 500; // Minimum width to maintain detail
      
      // Adjust dimensions based on container size
      const margin = { top: 30, right: 30, bottom: 60, left: 60 };
      const width = isSmallScreen ? 
        Math.max(minChartWidth, containerWidth) - margin.left - margin.right :
        Math.min(600, containerWidth) - margin.left - margin.right;
      
      // Maintain aspect ratio with responsive height
      const aspectRatio = 0.75; // Height is 75% of width
      const height = Math.min(400, width * aspectRatio) - margin.top - margin.bottom;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      // Set viewBox for better responsive behavior
      svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom);

      // Background with theme-appropriate color
      svg.append("rect")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("fill", "hsl(var(--card))");

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Step 3: Improved tooltip with better positioning
      const tooltip = d3.select("body")
        .append("div")
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

      // Step 4: Better axis with optimized ticks
      const extentResult = d3.extent(data, d => d.date);
      // Handle the case where extent might return undefined values
      const domainStart = extentResult[0] || new Date();
      const domainEnd = extentResult[1] || new Date();
      
      const x = d3.scaleTime()
        .domain([domainStart, domainEnd])
        .range([0, width]);
      
      // Use fewer ticks on smaller screens, but ensure key years are shown
      const xAxis = d3.axisBottom(x)
        .ticks(width < 400 ? 5 : 10)
        .tickFormat(d => {
          // Fix type error by checking the type before creating a Date
          const dateValue = d instanceof Date ? d : new Date(d.valueOf());
          return width < 350 ? 
            `'${dateValue.getFullYear().toString().substr(2)}` : // '90, '00, etc. for very small screens
            dateValue.getFullYear().toString(); // Full year for larger screens
        });

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .attr("color", "hsl(var(--muted-foreground))");

      // Improve x-axis readability with rotated labels
      if (width < 400) {
        g.selectAll(".tick text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em");
      }

      // y axis with simplified ticks for small screens
      // Handle null/undefined values with safe defaults
      const yMaxValue = d3.max(data, d => {
        const prodValue = d.productivity || 0;
        const depValue = (d[dependent] as number) || 0;
        return Math.max(prodValue, depValue);
      }) || 0;
      
      const y = d3.scaleLinear()
        .domain([0, yMaxValue * 1.05])
        .range([height, 0]);

      const yAxis = d3.axisLeft(y)
        .ticks(height < 200 ? 3 : 5);

      g.append("g")
        .call(yAxis)
        .attr("color", "hsl(var(--muted-foreground))");

      // Line styling with theme colors
      const lineData = [
        { key: "productivity", color: "hsl(var(--primary))" },
        { key: dependent, color: "hsl(var(--accent))" }
      ];

      lineData.forEach(({ key, color }) => {
        // Add line paths with proper typing for path generator
        g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 2)
          .attr("d", d3.line<DataPoint>()
            .x(d => x(d.date))
            .y(d => y((d[key] as number) || 0))
          );
      });

      // Vertical line for hover with theme colors
      const verticalLine = g.append("line")
        .attr("stroke", "hsl(var(--muted-foreground))")
        .attr("stroke-width", 1)
        .attr("y1", 0)
        .attr("y2", height)
        .style("opacity", 0.7)
        .style("visibility", "hidden");

      // Step 5: Better touch interaction for mobile
      // Overlay for capturing mouse/touch events
      g.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseover touchstart", () => {
          tooltip.style("visibility", "visible");
          verticalLine.style("visibility", "visible");
        })
        .on("mousemove touchmove", (event) => {
          event.preventDefault(); // Prevent scrolling on touch

          // Get pointer position directly from d3.pointer which handles SVG coordinates properly
          const pointer = d3.pointer(event, g.node());
          const mouseX = pointer[0];
          
          // Keep the position within the bounds of the chart
          const boundedX = Math.max(0, Math.min(width, mouseX));
          
          const date = x.invert(boundedX);
          
          // Find closest data point to the current x position
          const bisect = d3.bisector<DataPoint, Date>(d => d.date).left;
          const index = bisect(data, date);
          
          // Handle edge cases for index
          if (index <= 0) {
            const closestData = data[0];
            updateLineAndTooltip(event, closestData);
          } else if (index >= data.length) {
            const closestData = data[data.length - 1];
            updateLineAndTooltip(event, closestData);
          } else {
            // Find which of the two surrounding points is closer
            const d0 = data[index - 1];
            const d1 = data[index];
            const closestData = date.getTime() - d0.date.getTime() > d1.date.getTime() - date.getTime() ? d1 : d0;
            updateLineAndTooltip(event, closestData);
          }
          
          function updateLineAndTooltip(event: any, closestData: DataPoint) {
            setHoveredPoint(closestData);
            
            // Update vertical line position
            verticalLine
              .attr("x1", x(closestData.date))
              .attr("x2", x(closestData.date));
            
            // Format the tooltip HTML
            tooltip.html(
              `<div class="font-medium">Date: ${d3.timeFormat("%b %Y")(closestData.date)}</div>` +
              `<div><span style='color: hsl(var(--primary));'>Productivity:</span> ${closestData.productivity.toFixed(2)}</div>` +
              `<div><span style='color: hsl(var(--accent));'>${dependent.charAt(0).toUpperCase() + dependent.slice(1)}:</span> ${(closestData[dependent] as number).toFixed(2)}</div>`
            );
            
            // Position tooltip, ensuring it stays on screen
            const tooltipWidth = parseInt(tooltip.style('width')) || 200;
            let leftPos = event.pageX + 10;
            
            // Check if tooltip would go offscreen to the right
            if (leftPos + tooltipWidth > window.innerWidth) {
              leftPos = event.pageX - tooltipWidth - 10;
            }
            
            tooltip
              .style("top", `${event.pageY - 10}px`)
              .style("left", `${leftPos}px`);
          }
        })
        .on("mouseout touchend", () => {
          tooltip.style("visibility", "hidden");
          verticalLine.style("visibility", "hidden");
          setHoveredPoint(null);
        });

      // Text labels: title, x-Axis, y-Axis with responsive font sizes
      const fontSize = width < 300 ? "0.8rem" : "0.9rem";
      
      g.append("text")
        .attr("x", width/2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .text(title)
        .attr("fill", "hsl(var(--foreground))")
        .style("font-size", fontSize)
        .attr("class", "font-serif font-semibold");

      g.append("text")
        .attr("x", width / 2)
        .attr("y", height + (width < 350 ? 45 : margin.bottom - 15))
        .attr("text-anchor", "middle")
        .text("Year")
        .attr("fill", "hsl(var(--muted-foreground))")
        .style("font-size", fontSize);

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + (width < 350 ? 25 : 15))
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
        tooltip.remove();
        resizeObserver.disconnect();
      };
    } catch (error) {
      console.error("Error rendering line chart:", error);
    }
  }, [data, title, dependent]);

  // Fixing the LinePlot component wrapper to prevent content from getting cut off
  return (
    <div className="flex flex-col items-center w-full">
      <div 
        ref={chartContainerRef} 
        className="flex flex-col items-center w-full overflow-x-auto pb-4"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--muted)) transparent',
          WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
          minHeight: '300px', // Ensure minimum height so visualization doesn't collapse
          minWidth: '100%', // Ensure it takes full width of container
          paddingLeft: '10px', // Add padding on the left to prevent cutoff
          paddingRight: '10px' // Add padding on the right to prevent cutoff
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
          Currently viewing data point: Date {hoveredPoint.date.toString()}, 
          Productivity {hoveredPoint.productivity.toString()}, 
          {dependent} {(hoveredPoint[dependent] as number).toString()}
        </div>
      )}
    </div>
  );
};

export default LinePlot;