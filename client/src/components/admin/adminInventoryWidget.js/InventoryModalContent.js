import { Box, Button, DialogActions, DialogContent, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import useFetchDelete from "../../hooks/useFetchDelete";
import useFetchPut from "../../hooks/useFetchPut";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const InventoryModalContent = ({modalType,data,handleClose}) => {
    const [inventoryInfo, setInventoryInfo] = useState({
        _id:data._id,
        description:data.description,
        store:data.store,
        price:data.price,
        quantity:data.quantity,
        date:data.date
    });

    const [toDelete, setToDelete] = useState(false);
    const [toUpdate, setToUpdate] = useState(false);
    const [toCreate, setToCreate] = useState(false);
    const [deleteConfirmation] = useFetchDelete(`http://localhost:3000/inventory/${data._id}`, 'DELETE', toDelete, setToDelete);
    const [updateConfirmation] = useFetchPut(`http://localhost:3000/inventory/`, 'PUT',inventoryInfo, toUpdate, setToUpdate);
    const [createConfirmation] = useFetchPut(`http://localhost:3000/inventory/`, 'POST', inventoryInfo, toCreate, setToCreate);

    const handleDelete = () => {
        handleClose();
        setToDelete(true);
    }

    const handleUpdate = (event) => {   
        setToUpdate(true);   
    }

    const handleCreate = (event) => {
        setToCreate(true)
    }

    console.log(inventoryInfo)
    return (
        <form onSubmit={(event) => {modalType === 'edit' ? handleUpdate(event) : handleCreate(event)}}>
            <DialogContent>              
                    <Box>
                        {
                            modalType === 'edit'
                            ?Object.keys(data).map((key) => {
                                if(key !== '_id'  && key !== 'total'){
                                    return( 
                                        key === 'date'
                                        ?<FormControlLabel key={key} control={
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker value={dayjs(inventoryInfo[key])} onChange={(ev) => setInventoryInfo({...inventoryInfo,[key]:ev.$d.toLocaleDateString()})} label="day"  sx={{minWidth:'50%'}}/>
                                            </LocalizationProvider>
                                        } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>

                                        :<FormControlLabel key={key} control={
                                            <TextField value={inventoryInfo[key]} onChange={event => setInventoryInfo({...inventoryInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />
                                        } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                    )
                                }
                            })
                            :Object.keys(inventoryInfo).map((key) => {
                                if(key !== '_id' && key !== 'total'){
                                    return( 
                                        key === 'date'
                                        ?<FormControlLabel key={key} control={
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker  onChange={(ev) => setInventoryInfo({...inventoryInfo,[key]:ev.$d.toLocaleDateString()})} label="day"  sx={{minWidth:'50%'}}/>
                                            </LocalizationProvider>
                                        } label={key} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                                        
                                        :<FormControlLabel key={key} control={
                                            <TextField  onChange={event => setInventoryInfo({...inventoryInfo,[key]:event.target.value})} sx={{minWidth:'50%'}} />
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

export default InventoryModalContent;