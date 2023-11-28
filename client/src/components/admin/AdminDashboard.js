import { Button, Grid } from "@mui/material";
import UserToolBar from "../navbars/UserToolBar";
import { CardHeaders, DashboardWrapper, Item } from "../styles/dashboardStyles/dashboard.styled";
import AdminProjectsWidget from "../admin/adminProjectWidget/AdminProjectsWidget";
import AdminEmployeesWidget from "./adminEmployeeWidget/AdminEmployeesWidget";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

const AdminDashboard = () => {
    const [openProjectsModal, setOpenProjectsModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    return (
        <DashboardWrapper>
            <UserToolBar/>
            <Grid container columnSpacing={2} rowSpacing={2} wrap="wrap" padding="50px" sx={{justifyContent:'center'}}>
                <Grid item   xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item>
                        <CardHeaders variant="h5">Project Listing <Button onClick={() => {setOpenProjectsModal(true); setModalType('create')}} sx={{float:'right'}}><AddIcon/></Button></CardHeaders>
                        <AdminProjectsWidget openModal={openProjectsModal} setOpenModal={setOpenProjectsModal} modalType={modalType} setModalType={setModalType}/>
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