import { Grid } from "@mui/material";
import UserToolBar from "../navbars/UserToolBar";
import { CardHeaders, DashboardWrapper, Item } from "../styles/dashboardStyles/dashboard.styled";
import AdminProjectsWidget from "./AdminProjectsWidget";
import AdminEmployeesWidget from "./AdminEmployeesWidget";


const AdminDashboard = () => {
    return (
        <DashboardWrapper>
            <UserToolBar/>
            <Grid container columnSpacing={2} rowSpacing={2} wrap="wrap" padding="50px" sx={{justifyContent:'center'}}>
                <Grid item   xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item>
                        <CardHeaders variant="h5">Project Listing</CardHeaders>
                        <AdminProjectsWidget/>
                    </Item>
                </Grid>
                <Grid  item  xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item id="test">
                        <CardHeaders variant="h5">Employees</CardHeaders>
                        <AdminEmployeesWidget/>
                    </Item>
                </Grid>
                
            </Grid>
        </DashboardWrapper>
    )
}

export default AdminDashboard;