import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";

const TimesheetWidget = ({auth}) => {
    const [timesheet] = useFetch(`http://localhost:3000/timesheet/${auth().identifier}`,'GET')
    console.log(timesheet)
    return (
        !timesheet
        ?<CircularProgress/>
        :
            timesheet <= 0 
            ? <Typography>No hours done yet</Typography>
            :<TableContainer component={Paper} sx={{maxHeight:"440px"}}>
            <Table sx={{ minWidth: 650, minHeight:'100%' }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {
                        Object.keys(timesheet[0]).map((key) => {
                            if(key !== '_id' && key.includes('client') !== true){ return (
                                    <TableCell key={key}>{key}</TableCell>
                                )}
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                            timesheet.map((row) => {
                            return (<TableRow key={row._id}sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.employee_id}
                            </TableCell>
                            <TableCell align="left">{row.employee_name}</TableCell>
                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">{row.start_time}</TableCell>
                            <TableCell align="left">{row.end_time}</TableCell>
                            <TableCell align="left">{row.hours_worked}</TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TimesheetWidget;