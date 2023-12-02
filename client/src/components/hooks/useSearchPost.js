import { useState, useEffect } from "react";

const useFetchPost = (url,method,body,toCreate,setToCreate,setProjectListings) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        console.log('called')
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
            .then(data => {setToCreate(false);setProjectListings(data.data);setData(data.data);})
            .catch(error => console.log(error))
        }
    },[url,method,body])
    console.log(data)
    return [data, setData]
}

export default useFetchPost;