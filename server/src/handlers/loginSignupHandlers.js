const {MongoClient} = require("mongodb")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { match } = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
};

/** Check if email exists */
const registerUser = async(request, response) => {    
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    const salt = await bcrypt.genSalt(10);
    try{
        await client.connect();
        const db = client.db("CTL");
        const {employeeId,firstName, lastName, email, password, confirmPassword} = body;
        const employeeRecord = await db.collection('employees').find({_id: employeeId}).toArray()
        
        if(employeeRecord.length > 0){
            if (password === confirmPassword){           
                const hashedPassword = await bcrypt.hash(password, salt);
                const result = await db.collection('users').insertOne({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    employee_id:employeeId
                });

                const employeeRecord = await db.collection('employees').updateOne({_id:employeeId},{$set:{
                    employee_address:'To be assigned',
                    userId:result.insertedId,
                    employee_name: firstName + ' ' + lastName
                }});
                response.status(200).json({status:200, data: 'success'});
            }else{
                response.status(401).json({status:401,data: "password"});
            }
        }else{
            response.status(500).json({status:500, data:'not found'})
        }
    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const loginUser = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;

    try{
        await client.connect();
        const {email, password} = body;
        const db = client.db("CTL");
        const matchedUser = await db.collection('users').findOne({email:email})

        if(matchedUser > 0){
            const isValid = await bcrypt.compare(password, matchedUser.password);
            
            if (isValid){
                const userInfoToSend = {
                    employee_id: matchedUser.employee_id,
                    email: matchedUser.email,
                    fullName : `${matchedUser.firstName} ${matchedUser.lastName}`
                }     
                const jsonWebToken = jwt.sign(
                    {id:matchedUser._id,email:matchedUser.email},
                    process.env.JWT_KEY,
                )      
                response.status(200).json({
                    status:200,
                    data: 'success', 
                    user: matchedUser.firstName === 'Admin' ? 'Admin': 'User', 
                    userInfo:userInfoToSend, 
                    token:jsonWebToken});
            }else{
                response.status(401).json({status:401,data: "password"});
            }
        }else{
            response.status(401).json({status:401,data: "email"});
        }
    }catch(error){
        console.log(error)
        response.status(400).json({status:400,data: error});
    }finally{
        client.close()
    }
}


module.exports = {registerUser,loginUser}