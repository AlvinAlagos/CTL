import styled from "styled-components"
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from "react-router-dom";
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
                :<SignoutBtn onClick={() => handleLogOut()}>Sign out</SignoutBtn>
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

const Logo = styled.h1`
    margin:auto;
    width:50%;
`

const SignoutBtn = styled.button`
    
`
export default UserNavbar;