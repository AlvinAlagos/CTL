import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const ProjectWidget = ({auth}) => {
    // const [projectListings, setProjectListings] = useState();
    const [projectListings] = useFetch(`http://localhost:3000/projects/${auth().identifier}`)


    return (
    !projectListings
    ?<CircularProgress/>
    :
        projectListings <= 0 
        ? <Typography>No projects assigned</Typography>
        :<TableContainer component={Paper} sx={{maxHeight:"300px"}}>
        <Table sx={{ minWidth: 650, minHeight:'100%' }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {
                    Object.keys(projectListings[0]).map((key) => {
                        if(key !== 'project_assigned' && key.includes('client') !== true){ return (
                                <TableCell key={key}>{key}</TableCell>
                            )}
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                        projectListings.map((row) => {
                        return (<TableRow key={row._id}sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            {row._id}
                        </TableCell>
                        <TableCell align="left">{row.project_name}</TableCell>
                        <TableCell align="left">{row.project_description}</TableCell>
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