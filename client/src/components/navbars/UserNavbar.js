import styled from "styled-components"
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddAlarmOutlinedIcon from '@mui/icons-material/AddAlarmOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import { Box } from "@mui/material";
const UserNavbar = ({auth}) => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const handleLogOut = () => {
        signOut();
        navigate('/login');
    }
    return (
        <NavbarWrapper>
            <Logo>CTL Inc.</Logo>
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
                    <HomeOutlinedIcon/>
                    <AddAlarmOutlinedIcon/>
                    <ListAltOutlinedIcon/>
                    <ShowChartOutlinedIcon/>
                    <SignoutBtn onClick={() => handleLogOut()}>Sign out</SignoutBtn>                   
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
    padding:10px;   
    background-color:#e8b833;
`

const Logo = styled.h1`
`

const SignoutBtn = styled.button`
    
`
export default UserNavbar;