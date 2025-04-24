"use client"

import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

// Interface definitions for the data and props
export interface PieDataPoint {
  label: string;
  percentage?: string;
  [key: string]: string | number | undefined; // For dynamic values property
}

export interface PieChartProps {
  filePath: string;
  title: string;
  values: string;
}

// PieChart component for pie/donut chart visualizations
const PieChart = ({ filePath, title, values }: PieChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PieDataPoint[]>([]);
  const [hoveredSlice, setHoveredSlice] = useState<PieDataPoint | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // CSV data loading with error handling
  useEffect(() => {
    setIsLoading(true);
    d3.csv(filePath)
      .then(rawData => {
        // Create a properly typed array to collect valid data points
        const parsedData: PieDataPoint[] = [];
        
        rawData.forEach(d => {
          try {
            // check if label exists
            if (!d.label) {
              //console.warn("Missing label:", d);
              return;
            }
            
            // Check if value is empty or invalid first
            if (d[values] === "" || d[values] === undefined || d[values] === null) {
              //console.warn("Empty value:", d);
              return;
            }
            
            // Now convert to number, knowing the value exists
            const value = +d[values];
            
            // Final check for NaN after conversion
            if (isNaN(value)) {
              //console.warn("Non-numeric value detected:", d);
              return;
            }
            
            // Add valid data point to our collection
            parsedData.push({
              label: d.label,
              [values]: value
            });
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
  }, [filePath, values]);

  useEffect(() => {
    if (data.length === 0 || !svgRef.current) return;

    try {
      // Get actual container width for responsiveness
      const containerElement = svgRef.current.parentNode as HTMLElement;
      if (!containerElement) return;
      
      const containerWidth = containerElement.getBoundingClientRect().width;
      
      // Check if we're on small screens
      const isSmallScreen = window.innerWidth < 640;
      
      // Add extra space for the legend based on number of items
      const legendRowHeight = 25;
      let legendRows;
      
      // On small screens, stack the legend items vertically (1 per row)
      // On larger screens, allow 2-3 items per row depending on width
      if (isSmallScreen) {
        legendRows = data.length; // One item per row on small screens
      } else {
        const itemsPerRow = Math.max(1, Math.min(3, Math.floor(containerWidth / 180)));
        legendRows = Math.ceil(data.length / itemsPerRow);
      }
      
      const legendHeight = legendRows * legendRowHeight + 20;
      
      // Adjust dimensions based on container size and device
      const margin = { 
        top: 40, 
        right: 20, 
        bottom: legendHeight + 20, // Extra space for legend
        left: 20 
      };
      
      // Make chart relatively square but not too small on mobile
      const minWidth = isSmallScreen ? 280 : 450;
      const width = Math.max(minWidth, Math.min(450, containerWidth - margin.left - margin.right));
      const height = isSmallScreen ? width * 0.8 : width * 0.75; // Slightly shorter on mobile
      
      const radius = Math.min(width, height) / 2 * 0.8; // 80% of available space

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

      const g = svg.append("g")
        .attr("transform", `translate(${width/2 + margin.left},${height/2})`);
      
      // Theme-friendly tooltip
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
        .style("z-index", "1000");

      // Better color scheme with proper contrast
      const customColors = [
        "hsl(217, 91%, 60%)",  // Blue
        "hsl(160, 84%, 39%)",  // Teal
        "hsl(43, 96%, 56%)",   // Yellow
        "hsl(320, 70%, 60%)",  // Purple
        "hsl(20, 90%, 60%)"    // Orange
      ];
      
      const color = d3.scaleOrdinal<string>(customColors);

      // Calculate percentages for display
      const total = d3.sum(data, d => d[values] as number);
      const percentageData = data.map(d => ({
        ...d,
        percentage: ((d[values] as number) / total * 100).toFixed(1)
      }));

      // Create pie generator
      const pie = d3.pie<PieDataPoint>()
        .sort(null) // Don't sort, maintain data order
        .value(d => d[values] as number);
        
      const data_ready = pie(percentageData);

      // Arc generators for slices and hover states
      const arcGenerator = d3.arc<d3.PieArcDatum<PieDataPoint>>()
        .innerRadius(radius * 0.4) // Larger inner radius for donut style
        .outerRadius(radius * 0.8);
        
      const arcHoverGenerator = d3.arc<d3.PieArcDatum<PieDataPoint>>()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.85);
        
      const labelArc = d3.arc<d3.PieArcDatum<PieDataPoint>>()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.6);

      // Pie slices with theme styling
      g.append("g")
        .selectAll("path")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", d => arcGenerator(d) || "")
        .attr("fill", d => color(d.data.label))
        .attr("stroke", "hsl(var(--background))")
        .style("stroke-width", "2")
        .style("opacity", 0.85)
        .on("mouseover touchstart", (event, d) => {
          tooltip.style("visibility", "visible");
          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("d", arcHoverGenerator(d) || "")
            .style("opacity", 1);
        })
        .on("mousemove touchmove", (event, d) => {
          tooltip.html(`
            <div class="font-medium">${d.data.label}</div>
            <div>Value: ${(d.data[values] as number).toFixed(1)}</div>
            <div>Percentage: ${d.data.percentage}%</div>
          `)
            .style("top", `${event.pageY - 10}px`)
            .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout touchend", (event, d) => {
          tooltip.style("visibility", "hidden");
          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("d", arcGenerator(d) || "")
            .style("opacity", 0.85);
        });

      // Percentage labels inside pie segments
      g.append("g")
        .selectAll("text")
        .data(data_ready)
        .enter()
        .append("text")
        .text(d => `${d.data.percentage}%`)
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", radius < 100 ? "0.7rem" : "0.9rem")
        .style("font-weight", "600")
        .attr("fill", "hsl(var(--background))")
        .style("pointer-events", "none");

      // Title with theme styling
      svg.append("text")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .text(title)
        .attr("fill", "hsl(var(--foreground))")
        .attr("class", "text-lg font-serif font-semibold");

      // Improved legend with original styling from PieChart.jsx
      const legendY = height + 20; // Start legend below the chart
      const labelHeight = 12;
      
      // Create legend container similar to original
      const legend = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${legendY})`)
        .attr("class", "legend");
      
      // Create legend items with the original styling
      data.forEach((d, i) => {
        // Color swatch with original style (square with black stroke)
        legend.append("rect")
          .attr("y", labelHeight * i * 1.8)
          .attr("width", labelHeight)
          .attr("height", labelHeight)
          .attr("fill", color(d.label))
          .attr("stroke", "black")
          .style("stroke-width", "1");
        
        // Label with original style
        legend.append("text")
          .text(`${d.label} (${((d[values] as number) / total * 100).toFixed(0)}%)`)
          .attr("x", labelHeight * 1.5)
          .attr("y", labelHeight * i * 1.8 + labelHeight - 2)
          .attr("fill", "hsl(var(--foreground))")
          .style("font-size", `${labelHeight}px`);
      });

      // Add resize handler for responsiveness
      const resizeObserver = new ResizeObserver(() => {
        const newWidth = containerElement.getBoundingClientRect().width;
        if (Math.abs(newWidth - containerWidth) > 10) {
          // Only redraw if width changed significantly
          svg.selectAll('*').remove();
        }
      });
      
      resizeObserver.observe(containerElement);

      return () => {
        tooltip.remove();
        resizeObserver.disconnect();
      };
    } catch (error) {
      console.error("Error rendering pie chart:", error);
    }
  }, [data, title, values]);

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        ref={chartContainerRef} 
        className="flex flex-col items-center w-full"
        style={{ 
          minHeight: '300px',
          minWidth: '100%',
          padding: '10px'
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
          <svg ref={svgRef} className="w-full h-auto" style={{ maxWidth: '450px', margin: '0 auto' }}></svg>
        )}
      </div>
      {hoveredSlice && (
        <div className="sr-only">
          Currently viewing: {hoveredSlice.label}, Value: {hoveredSlice[values]}
        </div>
      )}
    </div>
  );
};

export default PieChart;