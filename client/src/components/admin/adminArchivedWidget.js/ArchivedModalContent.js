import { Box, Button, DialogActions, DialogContent, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import useFetchDelete from "../../hooks/useFetchDelete";

const ArchivedModalContent = ({data, handleClose}) => {
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
    const [deleteConfirmation] = useFetchDelete(`https://ctl-rest.onrender.com/archived/${data._id}`, 'DELETE', toDelete, setToDelete)

    const handleDelete = () => {
        handleClose();
        setToDelete(true);
    }

    return (
        <form>
            <DialogContent>              
                    <Box>
                        {
                            Object.keys(data).map((key) => {                        
                                if(key === 'project_assigned'){
                                }else if(key === 'project_status'){
                                    return (
                                        <FormControlLabel key={key} control={
                                            <Select value={projectInfo[key]} onChange={event => setProjectInfo({...projectInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} disabled={true}>
                                                <MenuItem value={'Not Started'}>{'Not Started'}</MenuItem>
                                                <MenuItem value={'On Hold'}>{'On Hold'}</MenuItem>
                                                <MenuItem value={'In Progress'}>{'In Progress'}</MenuItem>
                                                <MenuItem value={'Completed'}>{'Completed'}</MenuItem>
                                            </Select>
                                        } label={'project_assigned'} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                    )
                                }else{                                                               
                                        return (
                                        <FormControlLabel key={key} control={<TextField value={projectInfo[key]} onChange={event => setProjectInfo({...projectInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} disabled={true}/>} label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>)
                                }
                            })
                            
                        }
                    </Box>
            </DialogContent>
            <DialogActions>             
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="Submit" onClick={() => handleDelete()}>Delete</Button>
                <Button type="Submit" onClick={handleClose}>Save</Button>
            </DialogActions>
        </form>
    )
}

export default ArchivedModalContent;