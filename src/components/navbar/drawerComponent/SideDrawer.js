import React, { useState } from 'react';

import {
    IconButton,
    List,
    Drawer,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

const style = {
    menuIconContainer: {
        marginLeft: 'auto',
        
    },
    icons: {
        fontSize: '1.5rem',
        marginTop: "5px",
        marginLeft: "15px",
        marginRight: "20px"
    },
    iconStyle: {
        color: "white",
        fontSize: 35
    }
};

export default function SideDrawer() {

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Box>
            <Drawer
                anchor='right'
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}

            >
                <List>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <ListAltIcon sx={style.icons} />
                            <ListItemText>Student List</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon sx={style.icons} />
                            <ListItemText>Student Evaluation</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <SmartDisplayIcon sx={style.icons} />
                            <ListItemText>Blog</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton
                sx={style.menuIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                {!openDrawer ? <MenuIcon sx={style.iconStyle} /> : <MenuOpenIcon sx={style.iconStyle} />}
            </IconButton>
        </Box>
    )
}
