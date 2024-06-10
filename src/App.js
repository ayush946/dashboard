import './App.css';
import { useState, useEffect, useRef } from 'react';
import FilterOptions from './components/filterOptions';
import BarChart from './components/barChart';
import Title from './components/title';
import BarChart2 from './components/BarChart2';
import Sider from './components/sider';
import SiderCard from './components/siderCard';
import Pie from './components/pie';

function App() {

  const [data, setData] = useState({});
  const [filterSelected , setFilterSelected] = useState("sector");
  const [objSelected, setObjSelected] = useState(""); // it stores the obj that is selected on the bar graph

  // fetchining initial data
  useEffect(() => {
    let url = `http://127.0.0.1:5000/api/filter/${filterSelected}`;
    fetch(url)
    .then( (res) => {
        return res.json();
    })
    .then((data) => {
        setData(data);
    })
}, [filterSelected])


  const [selectedRef, setSelectedRef] = useState(null);
  const ref_heading = useRef(null);
  const ref_intensity = useRef(null);
  const ref_relevance = useRef(null);
  const ref_likelihood = useRef(null);
  const ref_title = useRef(null);
  const refList = [ref_heading, ref_intensity ,ref_relevance ,ref_likelihood,ref_title]
  useEffect(() => {
    if (selectedRef && selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [selectedRef])
  
  


  return (
    <div className='dashboard'>
      <div className='sider'>
          <h2>Navigation </h2>
          <Sider setSelectedRef={setSelectedRef} refList={refList}/>
          <SiderCard filter={filterSelected} obj={objSelected}/>
      </div>
      <div className='main'>
        <div ref={ref_heading} className='title'>
          <h1> Dashboard</h1>
        </div>
        <div className='filter'>
          <FilterOptions setFilter={setFilterSelected}/>
        </div>
        <div className='charts'>
          <BarChart filter={filterSelected} barData={data} setObjSelected={setObjSelected}/>
          <div ref={ref_intensity}>
            <BarChart2  filter={filterSelected} obj={objSelected} category={'intensity'} widthSize={1200} />
          </div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
              <div ref={ref_relevance}>
                <BarChart2  filter={filterSelected} obj={objSelected} category={'relevance'} widthSize={600} />
              </div>
              <div ref={ref_likelihood}>
                <BarChart2  filter={filterSelected} obj={objSelected} category={'likelihood'} widthSize={600} />
              </div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between'}}> 

            <div ref={ref_title}>
              <Title filter={filterSelected} title={objSelected}/>
            </div>
            <div>
              <Pie filter={filterSelected} obj={objSelected}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
