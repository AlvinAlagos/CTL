import { Button, Dialog, DialogTitle,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import EmployeeModalContent from "./EmployeeModalContent";

const AdminEmployeesWidget = ({openModal,setOpenModal,modalType,setModalType}) => {

    const [employeeListings] = useFetch(`http://localhost:3000/employees`, 'GET');
    const [rows,setRows] = useState();
    const [rowSelected, setRowSelected] = useState({});
    

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleClick = (row) => {
        setModalType('edit')
        setRowSelected(row);
        setOpenModal(true);
    }
    return (
        <>
        <Dialog open={openModal} onClose={handleClose} sx={{['& .MuiDialog-paper']: {minWidth:{xl:'800px', sm:'600px', md:'800px', xs:'200px'}}}}>
            <DialogTitle>Edit</DialogTitle>
            <EmployeeModalContent modalType={modalType} data={rowSelected} handleClose={handleClose}/>           
        </Dialog>
        { !employeeListings
            ?<CircularProgress/>
            :<TableContainer component={Paper} sx={{minHeight:"300px",maxHeight:"300px"}}>
                <Table sx={{ minWidth: 650, minHeight:'100%' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {
                            Object.keys(employeeListings[0]).map((key) => {
                                if(key !== 'project_assigned' && key.includes('client') !== true){ return (
                                        <TableCell key={key}>{key}</TableCell>
                                    )}
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                                employeeListings.map((row) => {
                                return (<TableRow key={row._id}sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Button onClick={() => {handleClick(row)}} sx={{textAlign:'left'}}>{row._id}</Button>
                                </TableCell>
                                <TableCell align="left">{row.employee_address}</TableCell>
                                <TableCell align="left">{row.hourly_wage}</TableCell>
                                <TableCell align="left">{row.userId}</TableCell>
                                <TableCell align="left">{row.employee_name}</TableCell>
                                </TableRow>)
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}
export default AdminEmployeesWidget;