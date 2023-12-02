import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    max-width:100%;
    min-height:100%;
`

export const LoginCard = styled.div`
    display:flex;
    justify-content:flex-start;
    flex-direction: row;
    min-width:30%;
    max-width:40%;
    margin-top:30px;
    /* border:1px solid black; */
    background-color:#ececec;
    border-radius: 30px;
    overflow:hidden;
    @media (max-width:1300px) {
        min-width:30%;
        max-width:90%;
    }
    
`

export const CoverImg = styled.div`
    overflow:hidden;
    max-width:50%;
    height:auto;

    @media (max-width:1300px) {
        display:none;
    }
`
export const Img = styled.img`
    max-width:100%;
    min-height:100%;
    object-fit:fill;
`
export const LoginForm = styled.form`
    display:flex;
    flex-direction:column;   
    justify-content:flex-start;
    gap:50px;
    width:100%;
    padding:50px 30px 50px 30px;

    @media (max-width:1300px) {
        min-width:30%;
        max-width:100%;
    }
`

export const Inputs = styled.div`
    display:flex;
    flex-direction: column;
    gap:10px;
`
export const Input = styled.input`
    width:100%;
    height:40px;
    border-radius:5px;
    outline: none;
    border:.5px solid black;
    
    &.warning {
        border-color:red;
    }
`

export const Submit = styled.input`
    background-color:#e8b833;
    color:white;
    border:none;
    max-width:150px;
    min-height:40px;
    border-radius: 20px;
    margin-top:30px;
    cursor:pointer;
`

export const SignUp = styled.a`
    color:#576a9c;
    text-decoration: none;

    &:hover{
        text-decoration: underline;
    }
`
// export const WarningBox = styled.div`
//     display:flex;
//     justify-content:center;
//     align-items:center;
// `