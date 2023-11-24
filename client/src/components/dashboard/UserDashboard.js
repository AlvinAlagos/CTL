
import Box from '@mui/material/Box';
import { Item, SubmitButton, CardHeaders} from "../styles/dashboardStyles/user/userDashboard.styled";
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ProjectWidget from './ProjectWidget';
import IncomeChartWidget from './IncomeChartWidget.js';
const UserDashboard = () => {
    
    return (
        <Box>
            <Grid container wrap="wrap" spacing={2} padding="50px">
                <Grid item spacing={4} xs={12} sm={6} xl={2} style={{ flexGrow: 1 }}>               
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Item>
                        <CardHeaders variant="h5">Clock in</CardHeaders>
                        <TimePicker label="Start"/>
                        <TimePicker label="End"/>
                        <SubmitButton variant="contained">Submit</SubmitButton>                   
                    </Item>
                </LocalizationProvider>
                </Grid>
                <Grid  item spacing={4} xs={12} sm={6} xl={8} style={{ flexGrow: 1 }}>
                    <Item>
                        <CardHeaders variant="h5">Project Listing</CardHeaders>
                        <ProjectWidget/>
                    </Item>
                </Grid>
                <Grid  item spacing={4} xl={6} style={{ flexGrow: 1 }}>
                    <Item id="test">
                        <CardHeaders variant="h5">Monthly Income</CardHeaders>
                        <IncomeChartWidget/>
                    </Item>
                </Grid>
                
            </Grid>
        </Box>
    )
}



export default UserDashboard;