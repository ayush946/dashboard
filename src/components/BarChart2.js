import {useState, useEffect, useRef } from "react"
import * as d3 from "d3";

function BarChart2({filter , obj , category , widthSize}) {

    const ref = useRef(null);
    const [data , setData] = useState([]);
    const colors = ['#A0153E', '#FF7F3E', '#F3CA52', '#C3FF93', '#7ABA78', '#0A6847', '#68D2E8', '#03AED2', '#3572EF', '#050C9C']
    useEffect(() => {
        let url = `http://127.0.0.1:5000/api/filter/${filter}/${obj}` 
        fetch(url)
        .then( (res) => {
            return res.json();
        })
        .then((data) => {
            // Sort data based on label (numerically)
            const sortedData = data[category].sort((a, b) => a.label - b.label);
            setData(sortedData);
        })
    }, [filter, category , obj]);

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); 

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = widthSize - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        const y = d3.scaleLinear()
            .range([height, 0]);

        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data && Array.isArray(data) ? data.map(function(d) { return d.label; }) : []);
        y.domain([0, data && Array.isArray(data) ? d3.max(data, (d) => d.value) : 0]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(0)");

        g.append("g")
            .call(d3.axisLeft(y))
            .call(g => g.append("text")
          .attr("x", -30)
          .attr("y", -10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency"));

        // Sort data in descending order for color assignment
        const colorData = [...data].sort((a, b) => b.value - a.value);

        g.selectAll(".bar")
            .data(data , d => d.value)
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
            
            .transition()
            .delay(500)
            .duration(1000)
            .style('fill', (d,i) => colors[colorData.findIndex(item => item.label === d.label) % colors.length]) // Assign color based on sorted index
            .attr("y", function(d) { return y(d.value); }) // Transition y position to its final value
            .attr("height", function(d) { return height - y(d.value); })
            ;

        
    }, [data]);

    return (
        <div>
            <h3>Distribution of {category} : {obj}</h3>
            <svg
                ref={ref}
                width = {widthSize}
                height="500"
                style={{border: 'solid 2px #FAF5E4',  boxShadow: 'rgba(0, 0, 0, 0.4) 0px 30px 90px'}}
            />
        </div>
    )
}

export default BarChart2;
