import { useRef, useEffect } from "react";
import * as d3 from "d3";

function BarChart({  filter ,barData , setObjSelected}) {
    const ref = useRef(null);
    
    const colors = ['#FF0000', '#E14D2A','#FD841F','#FEB139', '#FFF80A', '#C3FF99', '#9DDE8B', '#40A578', '#006769', '#5DEBD7', '#1679AB', '#074173', '#211C6A'];
    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); 

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 1200 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        const y = d3.scaleLinear()
            .range([height, 0]);

        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(barData && Array.isArray(barData) ? barData.map(function(d) { return d.label; }) : []);
        y.domain([0, barData && Array.isArray(barData) ? d3.max(barData, (d) => d.value) : 0]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-90)");


        g.append("g")
            .call(d3.axisLeft(y));
        
        g.selectAll(".bar")
            .data(barData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.label); })
            .attr("y", function(d) { return height; }) // Set initial y position to the height of the chart
            .attr("width", x.bandwidth())
            .attr("height", 0) // Set initial height to 0
            .attr('fill','black')
            .on("mouseover", function() { 
                d3.select(this)
                    .style("stroke", "black") // Set border color
                    .style("stroke-width", "2"); // Set border width
            })
            .on("mouseout", function(d, i) { 
                d3.select(this)
                    .style("stroke", "none"); // Remove border on mouseout
            }) 
            
            .on("click", function(d) {
                // Handle click event here
                setObjSelected(d.target.__data__.label);
                console.log("objSelected: ", d.target.__data__.label);

            })
            .transition()
            .delay(500)
            .duration(1000)
            .style('fill', (d,i) => colors[i % colors.length])
            .attr("y", function(d) { return y(d.value); }) // Transition y position to its final value
            .attr("height", function(d) { return height - y(d.value); })
            ;

        
    }, [barData, setObjSelected]);

    return (
        <div>
            <h3>Distribution of {filter}</h3>
            <svg
                ref={ref}
                width="1200"
                height="500"
                style={{border: 'solid 2px #F8B400', boxShadow: 'rgba(0, 0, 0, 0.4) 0px 30px 90px'}}
            />
        </div>
    );
}

export default BarChart;
