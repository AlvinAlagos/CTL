
import Box from '@mui/material/Box';
import { Item, DashboardWrapper, CardHeaders} from "../styles/dashboardStyles/dashboard.styled.js";
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserToolBar from '../navbars/UserToolBar.js';
import ProjectWidget from './ProjectWidget';
import IncomeChartWidget from './IncomeChartWidget.js';
import ClockinWidget from './ClockinWidget.js';
const UserDashboard = ({userInfo}) => {
    
    return (
        <DashboardWrapper>
            <UserToolBar/>
            <Grid container columnSpacing={2} rowSpacing={2} wrap="wrap" padding="50px" sx={{justifyContent:'center'}}>
                <Grid item  xs={12} sm={12} xl={3} style={{ flexGrow: 1 }}>               
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Item>
                        <CardHeaders variant="h5">Clock in</CardHeaders>
                        {/* CHECK WHERE TO STORE USER INFO EITHER STATE OR LOCAL */}
                        <ClockinWidget userInfo={userInfo}/>                  
                    </Item>
                </LocalizationProvider>
                </Grid>
                <Grid item   xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item>
                        <CardHeaders variant="h5">Project Listing</CardHeaders>
                        <ProjectWidget userInfo={userInfo}/>
                    </Item>
                </Grid>
                <Grid  item  xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item id="test">
                        <CardHeaders variant="h5">Monthly Income</CardHeaders>
                        <IncomeChartWidget userInfo={userInfo}/>
                    </Item>
                </Grid>
                
            </Grid>
        </DashboardWrapper>
    )
}



export default UserDashboard;