import {Button, Dialog, DialogTitle,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ModalContent from "./ModalContent";

const AdminProjectsWidget = ({openModal,setOpenModal,modalType, setModalType}) => {
    const [rowSelected, setRowSelected] = useState({});
    const [projectListings, setProjectListings] = useFetch('http://localhost:3000/projects', 'GET');
    const handleClose = () => {
        setOpenModal(false);
    }

    const handleClick = (row) => {
        setModalType('edit');
        setRowSelected(row);
        setOpenModal(true);
    }
    const parseObject = (data) => {
        if(data !== null){
            const assignedNames = data.map(name =>name.name)   
            let formattedString = '';
            assignedNames.map(name => {formattedString += `${name}\n`})
            return formattedString;
        }else{
            return 'None assigned'
        }
    }

    return (
        <>
        <Dialog open={openModal} onClose={handleClose} sx={{['& .MuiDialog-paper']: {minWidth:{xl:'800px', sm:'600px', md:'800px', xs:'200px'}}}}>
            <DialogTitle >Edit </DialogTitle>
            <ModalContent modalType={modalType} data={rowSelected} handleClose={handleClose}/>           
        </Dialog>

        {!projectListings
        ?<CircularProgress/>
        :<TableContainer component={Paper} sx={{maxHeight:"300px"}}>
            <Table sx={{ minWidth: 650, minHeight:'100%' }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {
                        Object.keys(projectListings[0]).map((key) => {
                                return (
                                    <TableCell key={key}>{key}</TableCell>
                                )
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
                            <TableCell align="left">{row.client_name}</TableCell>
                            <TableCell align="left">{row.client_email}</TableCell>
                            <TableCell align="left">{row.project_location}</TableCell>
                            <TableCell align="left">{row.project_assigned === undefined ? null : parseObject(row.project_assigned)}</TableCell>
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