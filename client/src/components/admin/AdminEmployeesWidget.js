import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";

const AdminEmployeesWidget = () => {

    const [employeeListings, setEmployeeListings] = useState();
    const [rows,setRows] = useState();
    useEffect(() => {
        fetch(`http://localhost:3000/employees`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {

            setEmployeeListings(data.data)
        })
        .catch(error => console.log(error))
    }, [])
    console.log(employeeListings)
    return (
        !employeeListings
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
                                {row._id}
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
        </TableContainer>
    )
}
export default AdminEmployeesWidget;