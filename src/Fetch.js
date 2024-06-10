import { useEffect } from "react";

function Fetch({setData, parentField, field}) {
    useEffect(() => {
        let url = field ? `http://127.0.0.1:5000/api/filter/${parentField}/${field}` : `http://127.0.0.1:5000/api/filter/${parentField}`;
        fetch(url)
        .then( (res) => {
            return res.json();
        })
        .then((data) => {
            setData(data);
        })
    }, [field, setData , parentField])
}

export default Fetch;
