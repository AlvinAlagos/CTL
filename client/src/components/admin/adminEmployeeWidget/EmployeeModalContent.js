import { Box, Button, DialogActions, DialogContent, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import useFetchDelete from "../../hooks/useFetchDelete";
import useFetchPut from "../../hooks/useFetchPut";

const EmployeeModalContent = ({data,handleClose}) => {
    const [employeeInfo, setEmployeeInfo] = useState({
        _id:data._id,
        employee_address: data.employee_address,
        hourly_wage: data.hourly_wage,
        userId: data.userId,
        employee_name: data.employee_name
    })
    const [toDelete, setToDelete] = useState(false);
    const [toUpdate, setToUpdate] = useState(false);
    const [deleteConfirmation] = useFetchDelete(`http://localhost:3000/employees/${data._id}`, 'DELETE', toDelete, setToDelete)
    const [updateConfirmation] = useFetchPut(`http://localhost:3000/employees/`, 'PUT',employeeInfo, toUpdate, setToUpdate)
    const handleDelete = () => {
        handleClose();
        setToDelete(true);
    }

    const handleUpdate = () => {   
        setToUpdate(true);   
    }
    //console.log(data)
    return (
        <form onSubmit={() => {handleUpdate()}}>
            <DialogContent>              
                    <Box>
                        {
                            Object.keys(data).map((key) => {
                                return( 
                                    <FormControlLabel key={key} control={
                                        <TextField value={employeeInfo[key]} onChange={event => setEmployeeInfo({...employeeInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />
                                    } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                )
                            })
                        }
                    </Box>
            </DialogContent>
            <DialogActions>             
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleDelete()}>Delete</Button>
                <Button type="Submit" onClick={handleClose}>Save</Button>
            </DialogActions>
        </form>
    )
}

export default EmployeeModalContent;