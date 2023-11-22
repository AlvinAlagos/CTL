const {MongoClient} = require("mongodb")
const bcrypt = require('bcrypt')
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
};

const registerUser = async(request, response) => {    
    const client = new MongoClient(MONGO_URI, options);
    const body = request.body;
    const salt = await bcrypt.genSalt(10);
    try{
        await client.connect();
        const {firstName, lastName, email, password, confirmPassword} = body;
        if (password === confirmPassword){           
            const db = client.db("CTL");
            const hashedPassword = await bcrypt.hash(password, salt);
            const result = await db.collection('users').insertOne({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            })
            response.status(200).json({status:200, data: 'success'});
        }else{
            response.status(401).json({status:401,data: "password"});
        }
    }catch(error){
        response.status(400).json({status:400,data: 'fail'});
    }finally{
        client.close()
    }
}

const loginUser = () => {

}

module.exports = {registerUser,loginUser}