import { Box, Button, DialogActions, DialogContent, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import SelectEmployee from "./SelectEmployee";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFetchDelete from "../../hooks/useFetchDelete";
import useFetchPut from "../../hooks/useFetchPut";
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
    console.log(Object.keys(projectInfo))
    //FIX THE ASSIGNED SELECT NOT SHOWING
    return (
        <form onSubmit={() => modalType === 'edit' ? handleUpdate() : handleCreate()}>
            <DialogContent>              
                    <Box>
                        {
                            modalType === 'edit'
                            ?Object.keys(data).map((key) => {         
                                console.log('here edit')                       
                                if(key === 'project_assigned'){
                                    return (
                                        data[key] === null
                                        ?<SelectEmployee key={key} projectInfo={projectInfo} setProjectInfo={setProjectInfo} assignedEmployees={null}/>
                                        :<SelectEmployee key={key} projectInfo={projectInfo} setProjectInfo={setProjectInfo} assignedEmployees={data[key].map(employee => employee.name)}/>
                                    )
                                }else{           
                                                    
                                        return (
                                        <FormControlLabel key={key} control={<TextField value={projectInfo[key]} onChange={event => setProjectInfo({...projectInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />} label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>)
                                }
                            })
                            :Object.keys(projectInfo).map((key) => {               
                                console.log('here')                
                                if(key === 'project_assigned'){
                                    return (
                                        <SelectEmployee key={key} modalType={modalType} projectInfo={projectInfo} setProjectInfo={setProjectInfo} assignedEmployees={null}/>
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