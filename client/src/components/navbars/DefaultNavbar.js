import styled from "styled-components";

const DefaultNavbar = () => {
    return (
        <NavbarWrapper>
            <Logo>CTL Inc.</Logo>
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
export default DefaultNavbar;