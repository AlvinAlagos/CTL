const express = require('express');
const morgan = require('morgan');

const {registerUser,loginUser} = require('./src/handlers/loginSignupHandlers')
const {getProjectAssigned,getUserTimesheet,getEmployeeWage,insertClockin} = require('./src/handlers/userDashboardHandler')
const {
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
} = require('./src/handlers/adminDashboardHandler');

express()

.use(morgan('tiny'))


.use(express.static('public'))
.use(express.json())

.get('/projects/:_id/:name', getProjectAssigned)
.get('/projects',getAllProjects)
.get('/timesheet/:_id', getUserTimesheet)
.get('/employee/wage/:_id',getEmployeeWage)
.get('/employees',getAllEmployees)
.get('/inventory',getAllInventory)
.get('/archived', getAllArchived)
.post('/login',loginUser)
.post('/register', registerUser)
.post('/clockin', insertClockin)
.post('/projects',createProject)
.post('/employees',createEmployee)
.post('/inventory', createInventory)

.put('/projects', updateProject)
.put('/employees', updateEmployee)
.put('/inventory',updateInventory)

.delete('/projects/:_id',deleteProjects)
.delete('/employees/:_id', deleteEmployee)
.delete('/inventory/:_id', deleteInventory)
.delete('/archived/:_id', deleteArchived)

.get('*', (req, res) => {
    res
        .status(404)
        .json({
            status: 404,
            message: 'This is obviously not the page you are looking for.',
        });
})

.listen(8000, () => console.log(`Listening on port 8000`));