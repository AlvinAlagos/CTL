import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { SubmitButton } from '../styles/dashboardStyles/dashboard.styled';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import useFetchPost from '../hooks/useSearchPost';
const ClockinWidget = ({auth}) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [toCreate, setToCreate] = useState(false);
    const [body, setBody] = useState({});
    const [createTimestamp] = useFetchPost(`http://localhost:3000/clockin`, 'POST', body, toCreate, setToCreate)

    const handleClockin = (event) => {
        event.preventDefault();
        const body = {
            employee_id:auth().identifier,
            start_time: startTime,
            end_time: endTime,
            date: selectedDate,
        }
        setBody(body);
        setToCreate(true);
        
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