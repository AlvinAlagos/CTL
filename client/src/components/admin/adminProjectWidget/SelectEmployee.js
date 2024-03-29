import { FormControlLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const SelectEmployee = ({modalType,assignedEmployees,projectInfo,setProjectInfo}) => {
    const [selectedValue, setSelectedValue] = useState(assignedEmployees === null ? [] : assignedEmployees);

    const [employees] = useFetch(`https://ctl-rest.onrender.com/employees`, 'GET');

    const handleSelect = (value) => {
        setSelectedValue(value)
        let assigned = value.map(name => {
            const index = employees.findIndex((row) => row.employee_name === name)
            return {employee_id: employees[index]._id, name:name}
        });
        
        setProjectInfo({...projectInfo,project_assigned:assigned});
    }
    return (

        <FormControlLabel control={
            <Select multiple value={selectedValue} onChange={(event) => {handleSelect(event.target.value)}} sx={{minWidth:'50%'}}>
                {
                    !employees
                    ?null
                    :employees.map((employee) => {
                        return(
                            <MenuItem key={employee.employee_name} value={employee.employee_name}>
                                {employee.employee_name}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        } label={'project_assigned'} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
    )
}

export default SelectEmployee;