import { useState, useEffect } from "react";

const useFetchPut = (url,method,body,toUpdate,setToUpdate) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        if(toUpdate === true){           
            fetch(url,{
                method:method,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {setToUpdate(false);setData(data.data)})
            .catch(error => console.log(error))
        }
    },[url,method,body,toUpdate])
    
    return [data, setData]
}

export default useFetchPut;