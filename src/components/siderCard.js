import { useState, useEffect } from "react";
import MiniCard from "./miniCard";
import { flatGroup } from "d3";

function SiderCard({filter , obj}){
    const  [data, setData] = useState({
        "maxIntensity": 0,
        "maxLikelihood": 0,
        "maxRelevance" : 0,
        "minIntensity":0,
        "minLikelihood":0,
        "minRelevance":0
    })
    useEffect(() => {
        let url = `http://127.0.0.1:5000/api/datacard/${filter}/${obj}` 
        fetch(url)
        .then( (res) => {
            return res.json();
        })
        .then((data) => {
            setData(
                {
                    "maxIntensity": data.maxIntensity,
                    "maxLikelihood": data.maxLikelihood,
                    "maxRelevance" : data.maxRelevance,
                    "minIntensity":data.minIntensity,
                    "minLikelihood":data.maxLikelihood,
                    "minRelevance":data.minRelevance
                }
            )
        })
    }, [filter, obj])

    return (
        <div className="sider-card" >
            <h2> Intensity </h2>
            <div className="1">
                <MiniCard maxV={data.maxIntensity} minV={data.minIntensity}/>
            </div>
            <h2> Relevance</h2>
            <div className="2">
                <MiniCard maxV={data.maxRelevance} minV={data.minRelevance}/>
            </div>
            <h2>Likelihood</h2>
            <div className="3">
                <MiniCard maxV={data.maxLikelihood} minV={data.minLikelihood}/>
            </div>            
        </div>
    )

}
export default SiderCard;