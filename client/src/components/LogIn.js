import styled from "styled-components";

import loginImg from "../assets/loginImg.jpg"
const LogIn = () => {
    return (
        <Wrapper>
            <LoginCard>
                <CoverImg>
                    <Img src={loginImg}/>
                </CoverImg>
                <LoginForm>
                    <h2 style={{borderBottom:"1px solid black"}}>Log In</h2>
                    <Inputs>
                        <Input type="text" placeholder="Email"/>
                        <Input type="password" placeholder="Password"/>
                        <Submit type="submit" value="Log In"/>
                    </Inputs>
                    <SignUp href="#">Don't have an account? Register your account now!</SignUp>
                </LoginForm>                
            </LoginCard>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    max-width:100%;
    min-height:100%;
`

const LoginCard = styled.div`
    display:flex;
    justify-content:flex-start;
    flex-direction: row;
    min-width:30%;
    max-width:40%;
    margin-top:60px;
    /* border:1px solid black; */
    background-color:#ececec;
    border-radius: 30px;
    overflow:hidden;
`

const CoverImg = styled.div`
    overflow:hidden;
    max-width:50%;
    height:auto;
`
const Img = styled.img`
    max-width:100%;
    min-height:100%;
    object-fit:fill;
`
const LoginForm = styled.form`
    display:flex;
    flex-direction:column;   
    justify-content:flex-start;
    gap:50px;
    width:100%;
    padding:50px 30px 50px 30px;
`

const Inputs = styled.div`
    display:flex;
    flex-direction: column;
    gap:10px;
`
const Input = styled.input`
    width:100%;
    height:40px;
    border-radius:5px;
    outline: none;
    border:.5px solid black;
    
`

const Submit = styled.input`
    background-color:#e8b833;
    color:white;
    border:none;
    max-width:150px;
    min-height:40px;
    border-radius: 20px;
    margin-top:30px;
`

const SignUp = styled.a`
    color:#576a9c;
    text-decoration: none;

    &:hover{
        text-decoration: underline;
    }
`
export default LogIn;