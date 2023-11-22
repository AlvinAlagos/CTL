
import { useState } from "react";
import loginImg from "../../assets/loginImg.jpg"
import { Wrapper,LoginCard,CoverImg,Img,LoginForm,Inputs,Input,Submit,SignUp } from "../styles/loginStyles/login.styled";

import { useNavigate } from "react-router-dom";
//Redo organization and styling of page
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    }

    const handleLogin = () => {
        
    }

    return (
        <Wrapper>
            <LoginCard onSubmit={() => {handleLogin()}}>
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
                    <SignUp onClick={() => {handleSignup()}}>Don't have an account? Register your account now!</SignUp>
                </LoginForm>                
            </LoginCard>
        </Wrapper>
    )
}


export default LogIn;