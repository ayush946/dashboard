import { useState, useEffect } from 'react';
import './title.css';

function Title({filter, title}){ 
    const [topics , setTopics] = useState([]);
    const [search, setSearch] = useState('');

    console.log(`filter: ${filter}, title: ${title}`)
    useEffect(() => {
        let url = `http://127.0.0.1:5000/api/filter/${filter}/${title}` 
        fetch(url)
        .then( (res) => {
            return res.json();
        })
        .then((data) => {
            setTopics(data.title);
            console.log(data.title);
        })
    }, [filter, title])

    // Filter topics based on search input
    const filteredTopics = topics.filter(topic => topic.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <h1>Titles : {title} </h1>
            <input 
                type="text" 
                placeholder="Search for a title " 
                onChange={e => setSearch(e.target.value)} 
                value={search}
            />
            <div className="container">
                <div className='list-container'>
                    {filteredTopics.map( (title, index) => (
                        <div key={index} className='list'>{title}</div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Title;
