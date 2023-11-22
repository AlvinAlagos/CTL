import { useNavigate } from "react-router-dom";
import { useState } from "react";
import signupImg from "../../assets/signupImg.jpg"
import { Wrapper,LoginCard,CoverImg,Img,LoginForm,Inputs,Input,Submit,SignUp, WarningBox } from "../styles/loginStyles/login.styled";
const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [warningPassword, setWarningPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        /**Implement client-side validation */
        const body = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }
        console.log(body)
        fetch('http://localhost:3000/register',{
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
                navigate('/login')
            } else if(data.data === 'password'){
                setWarningPassword('warning')
            }
        })
        .catch(error => console.log(error))
    }

    
    return (
        <Wrapper>
            {/* <WarningBox><p>This is a warning</p></WarningBox> */}
            <LoginCard>
                <LoginForm onSubmit={(event) => {handleSignup(event)}}>
                    <h2 style={{borderBottom:"1px solid black"}}>Register</h2>
                    <Inputs>
                        <Input type="text" placeholder="First Name" onChange={ev => setFirstName(ev.target.value)}/>
                        <Input type="text" placeholder="Last Name" onChange={ev => setLastName(ev.target.value)}/>
                        <Input type="text" placeholder="Email" onChange={ev => setEmail(ev.target.value)}/>
                        <Input type="password" className={warningPassword}placeholder="Password" onChange={ev => setPassword(ev.target.value)}/>
                        <Input type="password" placeholder="Confirm Password" onChange={ev => setconfirmPassword(ev.target.value)}/>                      
                        <Submit type="submit" value="Register"/>
                        
                    </Inputs>
                    
                    <SignUp>Don't have an account? Register your account now!</SignUp>
                </LoginForm>                
                <CoverImg>
                    <Img src={signupImg}/>
                </CoverImg>
            </LoginCard>
        </Wrapper>
    )
}

export default Signup;