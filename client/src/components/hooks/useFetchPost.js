import { useState, useEffect } from "react";

const useFetchPost = (url,method,body,toCreate,setToCreate) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        if(toCreate === true){           
            fetch(url,{
                method:method,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {setToCreate(false);setData(data.data)})
            .catch(error => console.log(error))
        }
    },[url,method,body,toCreate])
    
    return [data, setData]
}

export default useFetchPost;