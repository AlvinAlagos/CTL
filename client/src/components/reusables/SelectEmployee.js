import { FormControlLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

const SelectEmployee = ({assignedEmployees,projectInfo,setProjectInfo}) => {
    const [selectedValue, setSelectedValue] = useState(assignedEmployees === null ? [] : assignedEmployees);
    const [employees, setEmployees] = useState([]);
    
    const handleSelect = (value) => {
        setSelectedValue(value)
        let assigned = value.map(name => {
            const index = employees.findIndex((row) => row.employee_name === name)
            
            return {_id: employees[index]._id, name:name}
        });
        
        setProjectInfo({...projectInfo,project_assigned:assigned});
    }
    useEffect(() => {
        fetch(`http://localhost:3000/employees`)
        .then(response => response.json())
        .then(data => setEmployees(data.data))
        .catch(error => console.log(error))
    },[])
    return (

        <FormControlLabel control={
            <Select multiple value={selectedValue} onChange={(event) => {handleSelect(event.target.value)}}sx={{minWidth:'50%'}}>
                {
                    !employees
                    ?null
                    :employees.map((employee) => {
                        return(<MenuItem
                            key={employee.employee_name}
                            value={employee.employee_name}
                        >
                            {employee.employee_name}
                        </MenuItem>)
                    })
                }
            </Select>
        } label={'project_assigned'} labelPlacement="start" sx={{display:'flex', justifyContent:'space-between', paddingTop:'10px'}}/>
    )
}

export default SelectEmployee;