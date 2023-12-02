import { Box, Button, CircularProgress, Collapse, Container, Dialog, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { PageWrapper,Header2,SearchBar,FilterBox,FilterItemsBox, SearchBarBox } from "../../styles/dashboardStyles/admin/projectPage.styled";
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from "../../hooks/useFetch";
import useSearchPost from "../../hooks/useSearchPost";
import { useEffect, useRef, useState } from "react";
import ModalContent from "../adminProjectWidget/ModalContent";

/**
 * 
 * FIXXX NULL WITH PROJECT ASSIGNEDD
 * 
 */
const AdminProjectsPage = ({URL}) => {
    const searchInput = useRef();

    const [view, setView] = useState('Projects')
    const [search, setSearch] = useState('');
    const [toCreate, setToCreate] = useState(false)
    const [rowSelected, setRowSelected] = useState({});
    const [openProjectsModal, setOpenProjectsModal] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [fetchURL, setFetchURL] = useState(URL === undefined ? 'http://localhost:3000/projects' : URL);
    const [openSearch, setOpenSearch] = useState(false);
    const [defaultProjectListings, setDefaultProjectListings] = useFetch(fetchURL, 'GET');
    const [projectListings, setProjectListings] = useFetch(fetchURL, 'GET');

    const [searchValue] = useSearchPost('http://localhost:3000/projects/search', 'POST', {search_input: search},toCreate,setToCreate,setProjectListings);

    const parseObject = (data) => {
        if(data !== null){
            const assignedNames = data.map(name =>name.name)   
            let formattedString = '';
            assignedNames.map(name => {formattedString += `${name}\n`})
            return formattedString;
        }else{
            return 'None assigned'
        }
    }

    const handleExport = () => {
        let csv = '';
        const header = Object.keys(projectListings[0]).join(',');
        const values = projectListings.map(project => (Object.values(project).join(','))).join('\n');
        csv += header + '\n' + values;

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURI(csv));
        element.setAttribute('download', 'ArchivedProjects');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    const handleClose = () => {
        setOpenProjectsModal(false);
    }

    const handleSearch = (event) => {

        if(openSearch === true){
        setSearch(searchInput.current.value)
        setToCreate(true);
        }else{
            setOpenSearch(true)
        }
    }

    const handleCloseSearch = () => {
        setOpenSearch(false)
        setProjectListings(defaultProjectListings)
    }

    const handleClick = (row) => {
        setModalType('edit');
        setRowSelected(row);
        setOpenProjectsModal(true);
    }

    const handleViewSelect = (value) => {
        
        if(value === 'Projects'){
            setView(value);
            setFetchURL('http://localhost:3000/projects')
        }else if(value === 'Archived'){
            setView(value);
            setFetchURL('http://localhost:3000/archived')
        }
    }
    console.log(projectListings)
    return (
        <PageWrapper>
            <Dialog open={openProjectsModal} onClose={handleClose} sx={{['& .MuiDialog-paper']: {minWidth:'800px'}}}>
                <DialogTitle >Create </DialogTitle>
                <ModalContent modalType={modalType} data={rowSelected} handleClose={handleClose}/>           
            </Dialog>
            <FilterBox>
            <Grid container columnSpacing={2} rowSpacing={2} wrap="wrap">
                <Grid item   xs={12} sm={2} md={2} xl={2} style={{ flexGrow: 1 }}>
                    <Header2 variant="h4">{view}</Header2>
                </Grid>
                <Grid item   xs={12} sm={10} md={10} xl={10} style={{ flexGrow: 1 }} sx={{display:'flex',flexDirection:'row', justifyContent:'end'}}>
                    <FilterItemsBox>
                        <FormControl sx={{display:'flex', justifyContent:'center'}}>
                            <InputLabel id="demo-simple-select-standard-label">View</InputLabel>
                            <Select label="View"value={view} onChange={(event) => handleViewSelect(event.target.value)} sx={{ maxHeight:'43px', borderRadius:'15px', minWidth:'180px'}}>
                                <MenuItem value={'Projects'}>Projects</MenuItem>
                                <MenuItem value={'Archived'}>Archived Projects</MenuItem>
                            </Select>
                        </FormControl>
                        {view === 'Projects' ? <Button onClick={() => {setModalType('create');setOpenProjectsModal('true');}}><AddIcon sx={{color:'#ffa726'}}/></Button> : null}
                        {/* SEARCH DOES NOT WORK FOR ACHIVED */}
                    </FilterItemsBox>
                    {
                        view === 'Archived'
                        ?<Button onClick={() => handleExport()} sx={{marginLeft:'20px'}}>Export</Button>
                        :<SearchBarBox>                   
                            <Collapse in={openSearch} orientation={"horizontal"}>
                                    <SearchBar inputRef={searchInput} autoComplete={"false"} InputProps={{endAdornment: <Button onClick={() => {handleCloseSearch()}}><CloseIcon/></Button>}}/> 
                            </Collapse>
                            <Button onClick={() => {handleSearch()}}><SearchIcon/></Button>
                        </SearchBarBox>
                    }
                </Grid>
            </Grid>
            </FilterBox>
            <Box>
                {
                !projectListings
                ?<CircularProgress/>
                :<TableContainer component={Paper} sx={{maxHeight:"1000px", marginTop:'30px',}}>
                    <Table sx={{ minWidth: 650, minHeight:'100%' }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {
                                Object.keys(projectListings[0]).map((key) => {
                                        return (
                                            <TableCell key={key}>{key}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                    projectListings.map((row) => {    
                                    return (<TableRow key={row._id}sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Button onClick={() => handleClick(row)}>{row._id}</Button>
                                    </TableCell>
                                    <TableCell align="left">{row.project_name}</TableCell>
                                    <TableCell align="left"><a href="#">{(row.project_description).slice(0,30)}...</a></TableCell>
                                    <TableCell align="left">{row.start_date}</TableCell>
                                    <TableCell align="left">{row.end_date}</TableCell>
                                    <TableCell align="left">{row.project_manager}</TableCell>
                                    <TableCell align="left">{row.project_status}</TableCell>
                                    <TableCell align="left">{row.client_name}</TableCell>
                                    <TableCell align="left">{row.client_email}</TableCell>
                                    <TableCell align="left">{row.project_location}</TableCell>
                                    <TableCell align="left">{row.project_assigned === undefined ? null : parseObject(row.project_assigned)}</TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
            </Box>
        </PageWrapper>
    )
}

export default AdminProjectsPage;