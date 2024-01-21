import { Box, CircularProgress, Container, FormControlLabel, TextField, Typography } from "@mui/material"
import useFetch from "../hooks/useFetch";

const UserWidget = ({auth}) => {
    const [employeeInfo] = useFetch(`https://ctl-rest.onrender.com/employee/${auth().identifier}`)
    const [userInfo] = useFetch(`https://ctl-rest.onrender.com/user/${auth().identifier}`)
    return (
        <Box>

            {
                !userInfo || !employeeInfo
                ?<CircularProgress/>
                :<Container>
                <FormControlLabel control={<TextField variant="standard" value={employeeInfo[0]._id} disabled={true}/>} label={'ID:'} labelPlacement="start"  sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                <FormControlLabel control={<TextField variant="standard" value={employeeInfo[0].employee_name} disabled={true}/>} label={'Name:'} labelPlacement="start"  sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                <FormControlLabel control={<TextField variant="standard" value={userInfo[0].email} disabled={true}/>} label={'Email:'} labelPlacement="start"  sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                <FormControlLabel control={<TextField variant="standard" value={employeeInfo[0].employee_address} disabled={true}/>} label={'Address:'} labelPlacement="start"  sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                <FormControlLabel control={<TextField variant="standard" value={`$${employeeInfo[0].hourly_wage}/h`} disabled={true}/>} label={'Wage:'} labelPlacement="start"  sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
                </Container>
            }
        </Box>
    )
}

export default UserWidget;