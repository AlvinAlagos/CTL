import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

const ProjectWidget = () => {
    const [projectListings, setProjectListings] = useState();
    useEffect(() => {
        fetch(`http://localhost:3000/projects/655e751f32446adedd0c64a7/Alvin`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => setProjectListings(data.data))
        .catch(error => console.log(error))
    }, [])

    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {
                        !projectListings
                        ?<h1>Loadin</h1>
                        :Object.keys(projectListings[0]).map((key) => {
                        if(key !== 'project_assigned' && key.includes('client') !== true){ return (
                                <TableCell key={key}>{key}</TableCell>
                            )}
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    !projectListings
                    ?<h1>Loadin</h1>
                    :projectListings.map((row) => {
                        return (<TableRow key={row._id}sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            {row._id}
                        </TableCell>
                        <TableCell align="left">{row.project_name}</TableCell>
                        <TableCell align="left"><a href="#">{(row.project_description).slice(0,30)}...</a></TableCell>
                        <TableCell align="left">{row.start_date}</TableCell>
                        <TableCell align="left">{row.end_date}</TableCell>
                        <TableCell align="left">{row.project_manager}</TableCell>
                        <TableCell align="left">{row.project_status}</TableCell>
                        <TableCell align="left">{row.project_location}</TableCell>
                        </TableRow>)
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default ProjectWidget;