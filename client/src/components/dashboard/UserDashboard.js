
import Box from '@mui/material/Box';
import { Item, DashboardWrapper, CardHeaders} from "../styles/dashboardStyles/dashboard.styled.js";
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ProjectWidget from './ProjectWidget';
import IncomeChartWidget from './IncomeChartWidget.js';
import ClockinWidget from './ClockinWidget.js';
import UserWidget from './UserWidget.js';
const UserDashboard = ({auth}) => {
    
    return (
        <DashboardWrapper>
            <Grid container columnSpacing={2} rowSpacing={2} wrap="wrap" padding="50px" sx={{justifyContent:'center'}}>
                <Grid item  xs={12} sm={12} xl={3} style={{ flexGrow: 1 }}>               
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Item>
                        <CardHeaders variant="h5">Clock in</CardHeaders>
                        <ClockinWidget auth={auth}/>                  
                    </Item>
                </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} xl={3} style={{ flexGrow: 1 }}>
                    <Item>
                        <CardHeaders variant="h5">User</CardHeaders>
                        <UserWidget auth={auth}/>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item>
                        <CardHeaders variant="h5">Project Listing</CardHeaders>
                        <ProjectWidget auth={auth}/>
                    </Item>
                </Grid>
                
                <Grid  item  xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item id="test">
                        <CardHeaders variant="h5">Monthly Income</CardHeaders>
                        <IncomeChartWidget auth={auth}/>
                    </Item>
                </Grid>
                
            </Grid>
        </DashboardWrapper>
    )
}



export default UserDashboard;