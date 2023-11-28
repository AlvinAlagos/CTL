import { FormControlLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const SelectEmployee = ({modalType,assignedEmployees,projectInfo,setProjectInfo}) => {
    const [selectedValue, setSelectedValue] = useState(assignedEmployees === null ? [] : assignedEmployees);
    // const [selectedValue, setSelectedValue] = useState([]);

    const [employees] = useFetch(`http://localhost:3000/employees`, 'GET');

    const handleSelect = (value) => {
        console.log(value)
        // console.log(employees)
        setSelectedValue(value)
        console.log(selectedValue)
        let assigned = value.map(name => {
            const index = employees.findIndex((row) => row.employee_name === name)
            console.log(employees[index])
            return {_id: employees[index]._id, name:name}
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
                        console.log(employee.employee_name)
                        return(
                            // <MenuItem key={employee.employee_name} value={modalType === 'edit' ? employee.employee_name : undefined}>
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