import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";
import ModalContent from "../reusables/ModalContent";

const AdminProjectsWidget = () => {
    const [projectListings, setProjectListings] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [rowSelected, setRowSelected] = useState({});
    const handleClose = () => {
        setOpenModal(false);
    }

    const handleClick = (row) => {

        console.log(row)
        setRowSelected(row);
        setOpenModal(true);
    }
    useEffect(() => {
        fetch(`http://localhost:3000/projects`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => setProjectListings(data.data))
        .catch(error => console.log(error))
    }, [])

    
    return (
        <>
        <Dialog open={openModal} onClose={handleClose} sx={{['& .MuiDialog-paper']: {minWidth:'800px'}}}>
            <DialogTitle >Edit </DialogTitle>
            <ModalContent data={rowSelected} handleClose={handleClose}/>           
        </Dialog>

        {  !projectListings
        ?<CircularProgress/>
        :<TableContainer component={Paper} sx={{maxHeight:"300px"}}>
            <Table sx={{ minWidth: 650, minHeight:'100%' }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {
                        Object.keys(projectListings[0]).map((key) => {
                            if(key !== 'project_assigned' && key.includes('client') !== true){ return (
                                    <TableCell key={key}>{key}</TableCell>
                                )}
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                            projectListings.map((row) => {
                            return (<TableRow key={row._id}sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Button onClick={() => {handleClick(row)}}>{row._id}</Button>
                            </TableCell>
                            <TableCell align="left">{row.project_name}</TableCell>
                            <TableCell align="left"><a href="#">{(row.project_description).slice(0,30)}...</a></TableCell>
                            <TableCell align="left">{row.start_date}</TableCell>
                            <TableCell align="left">{row.end_date}</TableCell>
                            <TableCell align="left">{row.project_manager}</TableCell>
                            <TableCell align="left">{row.project_status}</TableCell>
                            <TableCell align="left">{row.project_location}</TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>}
    </>
    )
}

export default AdminProjectsWidget;