
const { MongoClient } = require("mongodb");
const projects = require('./project_data.json');
const timesheet = require('./timesheet_data.json')
require("dotenv").config();
const  MONGO_URI  = 'mongodb+srv://AlagosAlvin:UrzDwCZNMpzDAodo@alvin-cluster.ltlpfx9.mongodb.net/?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

const batchImport = async() => {

    console.log(MONGO_URI)
    try {
        await client.connect();
        const db = client.db('CTL');
        //const resultProjects = await db.collection("projects").insertMany(projects);
        const timesheetResults = await db.collection("timesheet").insertMany(timesheet);
        console.log(timesheetResults)
    } catch (error) {
        console.log(error)
    } finally {
        client.close();
    }
};

batchImport();