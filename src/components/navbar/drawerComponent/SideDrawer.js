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
        marginRight: "20px",
        color: "white"
    },
    iconStyle: {
        color: "white",
        fontSize: 35
    },
    paper: {
        backgroundColor: (theme) => theme.palette.background.default,
        height: "100%"
    },
    textStyle: {
        color: (theme) => theme.colors.textColor
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
                <List sx={style.paper}>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <ListAltIcon sx={style.icons} />
                            <ListItemText sx={style.textStyle}>Student List</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon sx={style.icons} />
                            <ListItemText sx={style.textStyle}>Student Evaluation</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem
                        button
                    >
                        <ListItemIcon>
                            <SmartDisplayIcon sx={style.icons} />
                            <ListItemText sx={style.textStyle}>Blog</ListItemText>
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
