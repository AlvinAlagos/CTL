const express = require('express');
const morgan = require('morgan');

const {registerUser,loginUser} = require('./src/handlers/loginSignupHandlers')
const {getProjectAssigned,getUserTimesheet,getEmployeeWage} = require('./src/handlers/userDashboardHandler')
express()

.use(morgan('tiny'))


.use(express.static('public'))
.use(express.json())

.get('/projects/:_id/:name', getProjectAssigned)
.get('/timesheet/:_id', getUserTimesheet)
.get('/employee/wage/:_id',getEmployeeWage)

.post('/login',loginUser)
.post('/register', registerUser)
.get('*', (req, res) => {
    res
        .status(404)
        .json({
            status: 404,
            message: 'This is obviously not the page you are looking for.',
        });
})

.listen(8000, () => console.log(`Listening on port 8000`));