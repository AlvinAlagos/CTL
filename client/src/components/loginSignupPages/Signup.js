import { useNavigate } from "react-router-dom";
import { useState } from "react";
import signupImg from "../../assets/signupImg.jpg"
import { Wrapper,LoginCard,CoverImg,Img,LoginForm,Inputs,Input,Submit,SignUp, WarningBox } from "../styles/loginStyles/login.styled";
import { Alert, Collapse } from "@mui/material";
const Signup = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [wrongInfo, setWrongInfo] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        /**Implement client-side validation */
        const body = {
            employeeId,
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
                setWrongInfo(true);
                setWarningMsg('Passwords do not match!');
            }else if(data.data === 'not found'){
                setWrongInfo(true);
                setWarningMsg('The provided employee id is incorrect! Please use the correct ID provided by your employer.');
            }
        })
        .catch(error => console.log(error))
    }

    
    return (
        <Wrapper>
            {/* <WarningBox><p>This is a warning</p></WarningBox> */}
            <Collapse in={wrongInfo} sx={{marginTop:'20px'}}>
                        <Alert severity="error" >{warningMsg}</Alert>   
                </Collapse>
            <LoginCard>
                <LoginForm onSubmit={(event) => {handleSignup(event)}}>
                    <h2 style={{borderBottom:"1px solid black"}}>Register</h2>
                    <Inputs>
                        <Input type="text" placeholder="Employee Id" onChange={ev => setEmployeeId(ev.target.value)}/>
                        <Input type="text" placeholder="First Name" onChange={ev => setFirstName(ev.target.value)}/>
                        <Input type="text" placeholder="Last Name" onChange={ev => setLastName(ev.target.value)}/>
                        <Input type="text" placeholder="Email" onChange={ev => setEmail(ev.target.value)}/>
                        <Input type="password" placeholder="Password" onChange={ev => setPassword(ev.target.value)}/>
                        <Input type="password" placeholder="Confirm Password" onChange={ev => setconfirmPassword(ev.target.value)}/>                      
                        <Submit type="submit" value="Register"/>
                        
                    </Inputs>
                    
                    <SignUp>Already have an account? Log in now!</SignUp>
                </LoginForm>                
                <CoverImg>
                    <Img src={signupImg}/>
                </CoverImg>
            </LoginCard>
        </Wrapper>
    )
}

export default Signup;