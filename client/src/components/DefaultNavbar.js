import styled from "styled-components";

const DefaultNavbar = () => {
    return (
        <NavbarWrapper>
            <Logo>CTL Inc.</Logo>
            <NavItems>
                <NavItem>Log In</NavItem>
                <NavItem>Sign Up</NavItem>
            </NavItems>
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
    
`

const NavItems = styled.div`
    display:flex;
    justify-content:space-evenly;
    gap:20px;
    flex-direction: row;
`
const NavItem = styled.a`
    color:white;
`
export default DefaultNavbar;