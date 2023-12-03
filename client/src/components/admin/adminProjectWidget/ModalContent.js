import { Box, Button, DialogActions, DialogContent, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import SelectEmployee from "./SelectEmployee";
import { useState } from "react";
import useFetchDelete from "../../hooks/useFetchDelete";
import useFetchPut from "../../hooks/useFetchPut";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const ModalContent = ({modalType,data, handleClose}) => {
    const [projectInfo, setProjectInfo] = useState(
        {
            _id: data._id,
            project_name: data.project_name,
            project_description: data.project_description,
            start_date: data.start_date,
            end_date: data.end_date,
            project_manager:data.project_manager,
            project_status: data.project_status,
            client_name: data.client_name,
            client_email: data.client_email,
            project_location: data.project_location,
            project_assigned:data.project_assigned
        } 
    );
    const [selectedValue, setSelectedValue] = useState('');
    const [toDelete, setToDelete] = useState(false);
    const [toUpdate, setToUpdate] = useState(false);
    const [toCreate, setToCreate] = useState(false);
    const [deleteConfirmation] = useFetchDelete(`http://localhost:3000/projects/${data._id}`, 'DELETE', toDelete, setToDelete)
    const [updateConfirmation] = useFetchPut(`http://localhost:3000/projects/`, 'PUT',projectInfo, toUpdate, setToUpdate)
    const [createConfirmation] = useFetchPut(`http://localhost:3000/projects/`, 'POST',projectInfo, toCreate, setToCreate)

    //PUT CONFIRM SCREEN
    const handleDelete = () => {
        handleClose();
        setToDelete(true);
    }

    const handleUpdate = () => {   
        setToUpdate(true);   
    }
    const handleCreate = () => {
        setToCreate(true);
    }

    return (
        <form onSubmit={() => modalType === 'edit' ? handleUpdate() : handleCreate()}>
            <DialogContent >   
                    {/* Convert this myabe if else to switch*/}
                    <Box>
                        {
                            modalType === 'edit'
                            ?Object.keys(data).map((key) => {                        
                                if(key === 'project_assigned'){
                                    return (
                                        data[key] === null
                                        ?<SelectEmployee key={key} projectInfo={projectInfo} setProjectInfo={setProjectInfo} assignedEmployees={null}/>
                                        :<SelectEmployee key={key} projectInfo={projectInfo} setProjectInfo={setProjectInfo} assignedEmployees={data[key].map(employee => employee.name)}/>
                                    )
                                }else if(key === 'project_status'){
                                    return (
                                        <FormControlLabel control={
                                            <Select value={projectInfo[key]} onChange={event => setProjectInfo({...projectInfo,[key]:event.target.value})} sx={{minWidth:'50%'}}>
                                                <MenuItem value={'Not Started'}>{'Not Started'}</MenuItem>
                                                <MenuItem value={'On Hold'}>{'On Hold'}</MenuItem>
                                                <MenuItem value={'In Progress'}>{'In Progress'}</MenuItem>
                                                <MenuItem value={'Completed'}>{'Completed'}</MenuItem>
                                            </Select>
                                        } label={'project_status'} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                    )
                                }else if(key === 'start_date' || key === 'end_date'){
                                    return (
                                        <FormControlLabel key={key} control={
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker value={dayjs(projectInfo[key])} onChange={(ev) => setProjectInfo({...projectInfo,[key]:ev.$d.toLocaleDateString()})} label="day"  sx={{minWidth:'50%'}}/>
                                            </LocalizationProvider>
                                        } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                    )
                                }else{           
                                        return (
                                        <FormControlLabel key={key} control={<TextField value={projectInfo[key]} onChange={event => setProjectInfo({...projectInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />} label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>)
                                }
                            })
                            :Object.keys(projectInfo).map((key) => {                      
                                if(key === 'project_assigned'){
                                    return (
                                        <SelectEmployee key={key} modalType={modalType} projectInfo={projectInfo} setProjectInfo={setProjectInfo} assignedEmployees={null}/>
                                    )
                                }else if(key === 'project_status'){
                                    return (
                                        <FormControlLabel control={
                                            <Select onChange={event => setProjectInfo({...projectInfo,[key]:event.target.value})} sx={{minWidth:'50%'}}>
                                                <MenuItem value={'Not Started'}>{'Not Started'}</MenuItem>
                                                <MenuItem value={'On Hold'}>{'On Hold'}</MenuItem>
                                                <MenuItem value={'In Progress'}>{'In Progress'}</MenuItem>
                                                <MenuItem value={'Completed'}>{'Completed'}</MenuItem>
                                            </Select>
                                        } label={'project_status'} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                    )
                                }else if(key === 'start_date' || key === 'end_date'){
                                    return (
                                        <FormControlLabel key={key} control={
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker  onChange={(ev) => setProjectInfo({...projectInfo,[key]:ev.$d.toLocaleDateString()})} label={key}  sx={{minWidth:'50%'}}/>
                                            </LocalizationProvider>
                                        } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                    )
                                }else{           
                                                    
                                        return (
                                        key === '_id'
                                        ?null
                                        :<FormControlLabel key={key} control={<TextField onChange={event => setProjectInfo({...projectInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />} label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>)
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

export default ModalContent;