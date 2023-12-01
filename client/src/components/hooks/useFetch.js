import { useState, useEffect } from "react";

const useFetch = (url,method,body) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        fetch(url,{
            method:method,
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:body
        })
        .then(response => response.json())
        .then(data => setData(data.data))
        .catch(error => console.log(error))

    },[url,method,body])
    return [data, setData]
}

export default useFetch;