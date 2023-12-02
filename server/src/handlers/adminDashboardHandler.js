const {MongoClient, ObjectId} = require("mongodb")
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
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

const createProject = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('projects').insertOne({
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
        });
        response.status(200).json({status:200, data: result});
    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const archiveProject = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    try{
        await client.connect();
        const db = client.db("CTL");

        const result = await db.collection('projects').insertOne({
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
        });
        response.status(200).json({status:200, data: result});
    }catch(error){
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
        if(body.project_status !== 'Completed'){
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
        }else if(body.project_status === 'Completed'){
            const deleteResult = await db.collection('projects').deleteOne({_id: new ObjectId(body._id)});
            const archivedResult = await db.collection('archived_projects').insertOne({
                project_name: body.project_name,
                project_description: body.project_description,
                start_date: body.start_date,
                end_date: body.end_date,
                project_manager:body.project_manager,
                project_status: body.project_status,
                client_name: body.client_name,
                client_email: body.client_email,
                project_location: body.project_location,
            })
            response.status(200).json({status:200, data: archivedResult});
        }
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
const createEmployee = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    const _id = uuidv4();
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('employees').insertOne({
            _id:_id,
            employee_address: body.employee_address,
            hourly_wage: body.hourly_wage,
            userId: body.userId,
            employee_name: body.employee_name
        });

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}
const updateEmployee = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('employees').updateOne({_id: body._id},{$set:{
            _id:body._id,
            employee_address: body.employee_address,
            hourly_wage: body.hourly_wage,
            userId: body.userId,
            employee_name: body.employee_name
        }});

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const deleteEmployee = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const _id = request.params._id;
    console.log(_id)
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('employees').deleteOne({_id: _id});

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const getAllInventory = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);   
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('inventory').find().toArray();

        response.status(200).json({status:200, data: result});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const createInventory = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    const total = Number(body.price) * Number(body.quantity);
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('inventory').insertOne({
            description:body.description,
            store:body.store,
            price:body.price,
            quantity:body.quantity,
            total:total,
            date:body.date
        });

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const updateInventory = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    const total = Number(body.price) * Number(body.quantity);
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('inventory').updateOne({_id: new ObjectId(body._id)},{$set:{
            description:body.description,
            store:body.store,
            price:body.price,
            quantity:body.quantity,
            total:total,
            date:body.date
        }});

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const deleteInventory = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const _id = request.params._id;
    console.log(_id)
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('inventory').deleteOne({_id: new ObjectId(_id)});

        response.status(200).json({status:200, data: result});

    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const getAllArchived = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('archived_projects').find().toArray();

        response.status(200).json({status:200, data: result});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const deleteArchived = async(request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    const _id = request.params._id
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('archived_projects').deleteOne({_id:new ObjectId(_id)});

        response.status(200).json({status:200, data: result});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}



module.exports = {
    getAllProjects,
    getAllEmployees,
    getAllInventory,
    createProject,
    updateProject,
    deleteProjects,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    createInventory,
    updateInventory,
    deleteInventory,
    getAllArchived,
    deleteArchived
};