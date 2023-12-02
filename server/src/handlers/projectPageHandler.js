const {MongoClient, ObjectId} = require("mongodb")
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;
const options = {
};

const searchProject = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options); 
    const searchInput = ((request.body.search_input).replace(/ /g,'')).toLowerCase();;
    let results = [];
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('projects').find().toArray();
        
        for(let index = 0; index < result.length; index++){
            
            let isSearchIncluded = false;
            Object.keys(result[index]).forEach((column) => {
                
                if(column === 'project_assigned'  && result[index][column] !== null){   
                    // console.log(result[index][column])
                    result[index][column].map((employee) => {        
                        console.log(employee.employee_id)               
                        const columnId = ((employee.employee_id).replace(/ /g,'')).toLowerCase() ;   
                        const columnName = ((employee.name).replace(/ /g,'')).toLowerCase();           
                        if(columnId.includes(searchInput) || columnName.includes(searchInput)){
                            isSearchIncluded = true;
                        }
                    })
                }else{
                    const columnValue = column !== '_id' ? (result[index][column].replace(/ /g,'')).toLowerCase() : (result[index][column].toString().replace(/ /g,'')).toLowerCase();                             
                    if(columnValue.includes(searchInput)){
                        isSearchIncluded = true;
                    }
                }
            })
            
            if(isSearchIncluded){               
                results.push(result[index])
                isSearchIncluded = false;
            }
        }

        response.status(200).json({status:200, data: results});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

module.exports = {
    searchProject
}