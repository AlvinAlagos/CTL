const {MongoClient, ObjectId} = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
};

const getProjectAssigned = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const {_id, name} = request.params;
    console.log(_id)
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('projects').find({
            project_assigned: {name: name,employee_id:_id}
        }).toArray();

        response.status(200).json({status:200, data: result});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}
const getEmployeeWage = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const {_id} = request.params;
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('employees').find({_id:_id}).toArray();

        response.status(200).json({status:200, data: result[0].hourly_wage});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const getUserTimesheet = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const {_id} = request.params;
    console.log(_id)
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('timesheet').find({
            employee_id: _id,
        }).toArray();

        response.status(200).json({status:200, data: result});

    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const insertClockin = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const {employee_id,employee_name,start_time,end_time,date} = request.body;
    const hoursWorked = Number(end_time.substring(0,(end_time.indexOf(':')))) - Number(start_time.substring(0,(start_time.indexOf(':'))));
    try{
        await client.connect();
        const db = client.db("CTL");
        const result = await db.collection('timesheet').insertOne({
            employee_id: employee_id,
            employee_name: employee_name,
            start_time:start_time,
            end_time:end_time,
            date:date,
            hours_worked:hoursWorked
        });
        response.status(200).json({status:200, data: result});
    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

module.exports = {getProjectAssigned,getUserTimesheet,getEmployeeWage,insertClockin}