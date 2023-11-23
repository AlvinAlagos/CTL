import {DashboardWrapper} from "../styles/dashboardStyles/user/userDashboard.styled"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Item } from "../styles/dashboardStyles/user/userDashboard.styled";
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const UserDashboard = () => {
    
    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection:'row',
            padding:'50px'
        }}>
        <Grid container spacing={4}  sx={{ 
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],}}>
            <Grid item xs={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Item>
                        <TimePicker label="Start"/>
                        <TimePicker label="End"/>                          
                    </Item>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
            <Item>xs=4</Item>
            </Grid>
            <Grid item xs={4}>
            <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
            <Item>xs=8</Item>
            </Grid>
        </Grid>
    </Box>
    )
}

export default UserDashboard;