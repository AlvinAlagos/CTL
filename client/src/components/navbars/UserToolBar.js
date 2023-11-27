import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddAlarmOutlinedIcon from '@mui/icons-material/AddAlarmOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
const UserToolBar = () => {
    return (
        <Box>
            <Drawer open={false}>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeOutlinedIcon/>
                                <ListItemText>Dashboard</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddAlarmOutlinedIcon/>
                                <ListItemText >Timesheet</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <ListAltOutlinedIcon/>
                                <ListItemText>Projects</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <ShowChartOutlinedIcon/>
                                <ListItemText>Income</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    )
}

export default UserToolBar;