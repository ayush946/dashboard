import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
function Pie({filter, obj}){
    
  const [pieData , setPieData] = useState([]);
    useEffect(() => {
      let url = `http://127.0.0.1:5000/api/topic/${filter}/${obj}` 
      fetch(url)
      .then( (res) => {
          return res.json();
      })
      .then((data) => {
          setPieData(data);
      })
    }, [filter, obj]);

    const ref = useRef(null);
    const radius = 250;
    const totalWidth = radius * 2;

    const color = ['#FF7F3E', '#F3CA52', '#C3FF93', '#7ABA78', '#0A6847'];
    useEffect( () => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); 

        const pie = d3.pie().value(d => d.value);
        const dataReady = pie(pieData);
        console.log("dataReady: ",dataReady);
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

        svg
        .selectAll('.mySlices')
        .data(dataReady)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d,i)=> color[i % color.length])
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .attr('opacity', 1)
        .attr('transform', `translate(${radius},${radius})`)


    }, [pieData]);



    return (
        <div>
          <h1> Top 5 Topics</h1>
          <svg
            ref={ref}
            width={totalWidth}
            height={totalWidth}
          ></svg>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            {pieData.map( (d, index)=>(
              <div style={{width:'15%', color:'black', fontWeight:'bold', paddingLeft:'10px',border:'1px solid #F6EEC9' , borderRadius:'5px', background:`${color[index]}`}}> {d.label} </div>
            ))}

          </div>
        </div>
      );
}

export default Pie;