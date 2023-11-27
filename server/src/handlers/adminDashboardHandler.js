const {MongoClient, ObjectId} = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
};

const getAllProjects = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('projects').find().toArray();

        response.status(200).json({status:200, data: result});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const getAllEmployees = async(request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('employees').find().toArray();

        response.status(200).json({status:200, data: result});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const updateProject = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('projects').updateOne({_id: new ObjectId(body._id)},{$set:{
            project_name: body.project_name,
            project_description: body.project_description,
            start_date: body.start_date,
            end_date: body.end_date,
            project_manager:body.project_manager,
            project_status: body.project_status,
            client_name: body.client_name,
            client_email: body.client_email,
            project_location: body.project_location,
            project_assigned:body.project_assigned
        }});

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const deleteProjects = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const _id = request.params._id;
    console.log(_id)
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('projects').deleteOne({_id: new ObjectId(_id)});

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

module.exports = {getAllProjects,getAllEmployees,updateProject,deleteProjects};