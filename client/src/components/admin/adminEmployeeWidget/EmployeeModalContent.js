import { Box, Button, DialogActions, DialogContent, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import useFetchDelete from "../../hooks/useFetchDelete";
import useFetchPut from "../../hooks/useFetchPut";

const EmployeeModalContent = ({modalType,data,handleClose}) => {
    const [employeeInfo, setEmployeeInfo] = useState({
        _id:data._id,
        employee_address: data.employee_address,
        hourly_wage: data.hourly_wage,
        userId: data.userId,
        employee_name: data.employee_name
    });

    const [toDelete, setToDelete] = useState(false);
    const [toUpdate, setToUpdate] = useState(false);
    const [toCreate, setToCreate] = useState(false);
    const [deleteConfirmation] = useFetchDelete(`https://ctl-rest.onrender.com/employees/${data._id}`, 'DELETE', toDelete, setToDelete)
    const [updateConfirmation] = useFetchPut(`https://ctl-rest.onrender.com/employees/`, 'PUT',employeeInfo, toUpdate, setToUpdate)
    const [createConfirmation] = useFetchPut(`https://ctl-rest.onrender.com/employees/`, 'POST',employeeInfo, toCreate, setToCreate)

    const handleDelete = () => {
        handleClose();
        setToDelete(true);
    }

    const handleUpdate = (event) => {   
        setToUpdate(true);   
    }

    const handleCreate = () => {
        setToCreate(true)
    }

    return (
        <form onSubmit={() => {modalType === 'edit' ? handleUpdate() : handleCreate()}}>
            <DialogContent>              
                    <Box>
                        {
                            modalType === 'edit'
                            ?Object.keys(data).map((key) => {
                                return( 
                                    <FormControlLabel key={key} control={
                                        <TextField value={employeeInfo[key]} onChange={event => setEmployeeInfo({...employeeInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />
                                    } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                )
                            })
                            :Object.keys(employeeInfo).map((key) => {
                                if(key !== '_id'){
                                    return( 
                                        key === 'userId'
                                        ?<FormControlLabel key={key} control={
                                            <TextField value={'To be assigned'} sx={{minWidth:'50%'}} disabled={true} />
                                        } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>

                                        :<FormControlLabel key={key} control={
                                            <TextField  onChange={event => setEmployeeInfo({...employeeInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />
                                        } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                    )
                                }
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