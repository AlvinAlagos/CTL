
import { CircularProgress, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import {Line} from "react-chartjs-2";
import useFetch from '../hooks/useFetch';
const calcHoursDoneInMonths = (data,wage) => {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let incomeInMonth = [
        {label: 'Jan', income:0},
        {label: 'Feb', income:0},
        {label: 'Mar', income:0},
        {label: 'Apr', income:0},
        {label: 'May', income:0},
        {label: 'Jun', income:0},
        {label: 'Jul', income:0},
        {label: 'Aug', income:0},
        {label: 'Sep', income:0},
        {label: 'Oct', income:0},
        {label: 'Nov', income:0},
        {label: 'Dec', income:0}
    ]

    for(let month = 1; month <= 12; month++){
        data.forEach((record) => {
            const monthNumber = Number((record.date).substring(0,(record.date.indexOf('/'))));
            if(monthNumber === (month)){
                incomeInMonth[month -1].income += (record.hours_worked * wage)
            }
        })
    }


    
    return incomeInMonth;
}

const IncomeChartWidget = ({auth}) => {
    // const [timesheet, setTimesheet] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const [timesheet] = useFetch(`http://localhost:3000/timesheet/${auth().identifier}`,'GET')
    const [wage] = useFetch(`http://localhost:3000/employee/wage/${auth().identifier}`)
    
    // useEffect(() => {
    //     fetch(`http://localhost:3000/employee/wage/06a783bf-61c7-437d-aee2-2418781bfbe7`, {
    //         method:'GET'
    //     })
    //     .then(response => response.json())
    //     .then(data => setWage(data.data))
    //     .catch(error => console.log(error))
    // },[])

    // useEffect(() => {
    //     fetch(`http://localhost:3000/timesheet/06a783bf-61c7-437d-aee2-2418781bfbe7`,{
    //         method:'GET',
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setTimesheet(data.data)
    //     })
    //     .catch(error => console.log(error))
    // },[])

    useEffect(() => {
        if(timesheet !== null)
            setMonthlyIncome(calcHoursDoneInMonths(timesheet,wage))
    },[wage,timesheet])

    return (
        !timesheet || !monthlyIncome
        ?<CircularProgress />
        :
        <Line
            data={{
                labels: monthlyIncome.map(month => month.label),
                datasets:[{
                    label: 'Monthly Income',
                    data: monthlyIncome.map(month => month.income),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }}
            />
        // <h1>test</h1>
    )
}

export default IncomeChartWidget;