import { Box, Button, DialogActions, DialogContent, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import SelectEmployee from "./SelectEmployee";
import { useState } from "react";
const ModalContent = ({data, handleClose}) => {
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
    //PUT CONFIRM SCREEN
    const handleDelete = () => {
        handleClose();
        fetch(`http://localhost:3000/projects/${data._id}`,{
            method:'DELETE',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/projects',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(projectInfo)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
        console.log('Submitted')
        console.log(projectInfo)
    }
    console.log(projectInfo)
    return (
        <form onSubmit={(event) => {handleUpdate(event)}}>
            <DialogContent>
                
                    <Box>
                        {
                            Object.keys(data).map((key) => {
                                
                                if(key === 'project_assigned'){
                                    console.log(key)
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