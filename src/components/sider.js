import React from "react";
import './sider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp} from '@fortawesome/free-solid-svg-icons'

function Sider({setSelectedRef, refList}) {
    return (
        <div className="sider-main">
            <button class="button" onClick={() => setSelectedRef(refList[0])}> <FontAwesomeIcon icon={faArrowCircleUp} /> </button>
            <button class="button" onClick={() => setSelectedRef(refList[1])}>Intensity</button>
            <button class="button" onClick={() => setSelectedRef(refList[2])}>Relevance</button>
            <button class="button" onClick={() => setSelectedRef(refList[3])}>Likelihood</button>
            <button class="button" onClick={() => setSelectedRef(refList[4])}>Title</button>
        </div>
    )
    
}

export default Sider;