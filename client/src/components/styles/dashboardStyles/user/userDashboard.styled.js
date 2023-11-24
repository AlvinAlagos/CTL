
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button, Container, TextField, Typography } from "@mui/material";
export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  }));

export const SubmitButton = styled(Button)(({theme}) => ({
    backgroundColor:'#e8b833',
    width:"50%",
    marginTop:"10px"
}));

export const CardHeaders = styled(Typography)(({theme}) => ({
    textAlign:'left'
}));