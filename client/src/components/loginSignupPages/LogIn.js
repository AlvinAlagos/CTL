
import { useState } from "react";
import loginImg from "../../assets/loginImg.jpg"
import { Wrapper,LoginCard,CoverImg,Img,LoginForm,Inputs,Input,Submit,SignUp } from "../styles/loginStyles/login.styled";

import { useNavigate } from "react-router-dom";
import {useSignIn} from "react-auth-kit";
//Redo organization and styling of page
const LogIn = ({setUserInfo}) => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const login = useSignIn();

    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    }

    const successfullLogin = (userInfo) => {
        setUserInfo({...userInfo})
        navigate("/");
    }
    const handleLogin = (event) => {
        event.preventDefault();
        const body = {
            email:email,
            password:password
        }
        fetch('http://localhost:3000/login',{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.data === 'success'){
                login({
                    token:data.token,
                    expiresIn:3600,
                    tokenType: "Bearer",
                    authState: {user: data.user, email:email},
                });
                successfullLogin(data.userInfo)
            } else if(data.data === 'password'){
                
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <Wrapper>
            <LoginCard onSubmit={(event) => {handleLogin(event)}}>
                <CoverImg>
                    <Img src={loginImg}/>
                </CoverImg>
                <LoginForm>
                    <h2 style={{borderBottom:"1px solid black"}}>Log In</h2>
                    <Inputs>
                        <Input type="text" placeholder="Email" onChange={ev => setEmail(ev.target.value)}/>
                        <Input type="password" placeholder="Password" onChange={ev => setPassword(ev.target.value)}/>
                        <Submit type="submit" value="Log In"/>
                    </Inputs>
                    <SignUp onClick={() => {handleSignup()}}>Don't have an account? Register your account now!</SignUp>
                </LoginForm>                
            </LoginCard>
        </Wrapper>
    )
}


export default LogIn;