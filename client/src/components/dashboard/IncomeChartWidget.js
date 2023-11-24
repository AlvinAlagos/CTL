import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress, Paper } from '@mui/material';
import { useEffect, useState } from 'react';


const IncomeChartWidget = () => {
    const [timesheet, setTimesheet] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const [hoursWokred, setHoursWorked] = useState();
    const [wage, setWage] = useState('');
    const calcHoursDoneInMonths = (data) => {

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        // let incomeInMonth = [{"Jan":0},{"Feb":0},{"Mar":0},{"Apr":0},{"May":0},{"Jun":0},{"Jul":0},{"Aug":0},{"Sep":0},{"Oct":0},{"Nov":0},{"Dec":0}]
        let incomeInMonth = {
            "Jan": 0,
            "Feb": 0,
            "Mar": 0,
            "Apr": 0,
            "May": 0,
            "Jun": 0,
            "Jul": 0,
            "Aug": 0,
            "Sep": 0,
            "Oct": 0,
            "Nov": 0,
            "Dec": 0
        };
        let finalArray = []
        for(let month = 1; month <= 12; month++){
            data.forEach((record) => {
                const monthNumber = Number((record.date).substring(0,(record.date.indexOf('/'))));
                if(monthNumber === (month)){
                   // console.log(test["Jan"])
                    //incomeInMonth[month -1][months[month -1]] += (record.hours_worked * wage)
                    incomeInMonth[months[month -1]] += (record.hours_worked * 20)
                    console.log(wage)
                }
            })
        }

        Object.keys(incomeInMonth).map((month) => {
            finalArray.push(incomeInMonth[month])
        })
        console.log(finalArray)
        return finalArray;
    }
    useEffect(() => {
        fetch(`http://localhost:3000/employee/wage/06a783bf-61c7-437d-aee2-2418781bfbe7`, {
            method:'GET'
        })
        .then(response => response.json())
        .then(data => setWage(data.data))
        .catch(error => console.log(error))
    },[])

    useEffect(() => {
        fetch(`http://localhost:3000/timesheet/06a783bf-61c7-437d-aee2-2418781bfbe7`,{
            method:'GET',
        })
        .then(response => response.json())
        .then(data => {
            const records = data.data;
            let totalHours = 0;
            records.forEach((record) => {
                totalHours += record.hours_worked;
            })
            setMonthlyIncome(calcHoursDoneInMonths(records,wage))
            setHoursWorked(totalHours);
            setTimesheet(data.data)
        })
        .catch(error => console.log(error))
    },[])
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
    ];

    console.log(monthlyIncome)
    return (
        !timesheet || !monthlyIncome
        ?<CircularProgress />
        :<LineChart
            width={500}
            height={300}
            series={[{ data: monthlyIncome, label: 'pv' }]}
            xAxis={[{ scaleType: 'point', data: months }]}
        />
    )
    
}

export default IncomeChartWidget;