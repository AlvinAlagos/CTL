import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddAlarmOutlinedIcon from '@mui/icons-material/AddAlarmOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import styled from "styled-components"
import { Box } from "@mui/material";
const AdminNavbar = ({auth}) => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const handleLogOut = () => {
        signOut();
        navigate('/login');
    }
    return (
        <NavbarWrapper>
            <Logo href="/">CTL Inc.</Logo>
            {
                auth() === null
                ?null
                :<Box sx={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'20px',
                    marginRight:'20px'
                }}>
                    <Button onClick={() => navigate('/')}>Dashboard</Button>      
                    <Button onClick={() => navigate('/projects')}>Projects</Button>                 
                    <Button onClick={() => navigate('/')}>Timesheet</Button>                 
                    <Button onClick={() => handleLogOut()} >Sign out</Button>                   
                </Box>
                
            }
        </NavbarWrapper>
    )
}

const NavbarWrapper = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    padding:20px;   
    background-color:#e8b833;
`

const Logo = styled.a`
    font-size:30px;
    text-decoration: none;
    color:black;
    width:50%;
`
const Button = styled.button`
    color:black;
    
`
export default AdminNavbar;