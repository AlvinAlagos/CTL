import { useState, useEffect } from "react";

const useFetchDelete = (url,method,isDelete, setToDelete) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        if(isDelete === true){
            
            fetch(url,{
                method:method,
            })
            .then(response => response.json())
            .then(data => {setToDelete(false);setData(data.data)})
            .catch(error => console.log(error))
        }

    },[url,method,isDelete])
    
    return [data, setData]
}

export default useFetchDelete;