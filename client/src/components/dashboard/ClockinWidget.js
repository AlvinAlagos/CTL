import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { SubmitButton } from '../styles/dashboardStyles/dashboard.styled';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
const ClockinWidget = ({userInfo}) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    

    const handleClockin = (event) => {
        event.preventDefault();
        const body = {
            employee_id:userInfo.employeeId,
            employee_name: userInfo.fullName,
            start_time: startTime,
            end_time: endTime,
            date: selectedDate,
        }
        
        fetch(`http://localhost:3000/clockin`,{
            method:'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json",
                },
            body:JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => console.log(data.data))
        .catch(error => console.log(error))
        
    }
    return(
        <form onSubmit={(event) => handleClockin(event)}>           
            <TimePicker ampm={false}  onChange={(ev) => setStartTime(ev.$d.toLocaleTimeString('en-GB',{hour: '2-digit', minute:'2-digit'}))} label="Start"/>
            <TimePicker ampm={false}  onChange={(ev) => setEndTime(ev.$d.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'}))} label="End"/>
            <DatePicker onChange={(ev) => setSelectedDate(ev.$d.toLocaleDateString())} label="day" />
            <SubmitButton type="submit" variant="contained">Submit</SubmitButton>   
        </form>  
    )
}

export default ClockinWidget;