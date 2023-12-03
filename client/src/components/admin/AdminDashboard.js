import { Button, Grid, Link } from "@mui/material";
import { CardHeaders, DashboardWrapper, Item } from "../styles/dashboardStyles/dashboard.styled";
import AdminProjectsWidget from "../admin/adminProjectWidget/AdminProjectsWidget";
import AdminEmployeesWidget from "./adminEmployeeWidget/AdminEmployeesWidget";
import AdminInventoryWidget from "./adminInventoryWidget.js/AdminInventoryWidget";
import AdminArchivedWidget from "./adminArchivedWidget.js/AdminArchivedWidget";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [openProjectsModal, setOpenProjectsModal] = useState(false);
    const [openEmployeesModal, setOpenEmployeesModal] = useState(false)
    const [openInventoryModal, setOpenInventoryModal] = useState(false)
    const [openArchivedModal, setOpenArchivedModal] = useState(false)
    const [modalType, setModalType] = useState('create');
    const navigate = useNavigate();
    return (
        <DashboardWrapper>
            <Grid container columnSpacing={2} rowSpacing={2} wrap="wrap" padding="50px" sx={{justifyContent:'center'}}>
                <Grid item   xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item>
                        <CardHeaders variant="h5"><Link onClick={() => {navigate('/projects')}}>Project Listing</Link> <Button onClick={() => {setOpenProjectsModal(true); setModalType('create')}} sx={{float:'right'}}><AddIcon/></Button></CardHeaders>
                        <AdminProjectsWidget openModal={openProjectsModal} setOpenModal={setOpenProjectsModal} modalType={modalType} setModalType={setModalType}/>
                    </Item>
                </Grid>
                <Grid  item  xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item id="test">
                        <CardHeaders variant="h5">Employees <Button onClick={() => {setModalType('create');setOpenEmployeesModal(true);}} sx={{float:'right'}}><AddIcon/></Button></CardHeaders>
                        <AdminEmployeesWidget openModal={openEmployeesModal} setOpenModal={setOpenEmployeesModal} modalType={modalType} setModalType={setModalType}/>
                    </Item>
                </Grid>
                <Grid  item  xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item id="test">
                        <CardHeaders variant="h5">Inventory <Button onClick={() => {setModalType('create');setOpenInventoryModal(true);}} sx={{float:'right'}}><AddIcon/></Button></CardHeaders>
                        <AdminInventoryWidget openModal={openInventoryModal} setOpenModal={setOpenInventoryModal} modalType={modalType} setModalType={setModalType}/>
                    </Item>
                </Grid>
                <Grid  item  xs={12} sm={12} xl={6} style={{ flexGrow: 1 }}>
                    <Item id="test">
                        <CardHeaders variant="h5">Archived Projects </CardHeaders>
                        <AdminArchivedWidget openModal={openArchivedModal} setOpenModal={setOpenArchivedModal} modalType={modalType} setModalType={setModalType}/>
                    </Item>
                </Grid>
                
            </Grid>
        </DashboardWrapper>
    )
}

export default AdminDashboard;