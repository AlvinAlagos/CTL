
import { styled } from '@mui/material/styles';
import {Container, Typography,TextField, Box} from "@mui/material";

export const PageWrapper = styled(Container)(({theme}) => ({
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    [theme.breakpoints.only('xl')]: {
        maxWidth:'1600px'
    },
})) 

export const FilterBox = styled(Box)(({theme}) => ({
    marginTop:'50px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    
}))

export const FilterItemsBox = styled(Box)(({theme}) => ({
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
}))

export const Header2 = styled(Typography)(({theme}) => ({
    textAlign:'left'
}));

export const SearchBar = styled(TextField)(({theme}) => ({
    
    display:'flex', 
    justifyContent:'center',
    
    ['&.MuiTextField-root']:{
        minWidth:'500px',
        
    },
    ['& .MuiInputBase-root']:{
        borderRadius:'15px',
    },
    ['& .MuiOutlinedInput-input']:{
        maxHeight:'10px',
    }
}));
