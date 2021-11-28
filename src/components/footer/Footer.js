import React from 'react';

import {
    Box,
    Typography,
    Grid,
    Button,
} from '@mui/material';

import { FiFacebook } from 'react-icons/fi';

import { RiDiscordLine } from 'react-icons/ri';

import { RiTwitterLine } from 'react-icons/ri';

const style = {
    //helper
    spanMarginLeft: {
        color:"#26CE8D",
        marginLeft: 5
    },
    spanMarginRight: {
        color:"#26CE8D",
        marginRight: 5
    },
    section1: {
        padding: 5,
        backgroundColor: (theme) => theme.colors.footerColor,
        display: "flex",
        alignItems: "center",
        boxShadow: '0 3px 5px 2px rgba(66, 66, 66, .3)',
    },
    iconStyle: {
        color: (theme) => theme.colors.navButtonHover,
        fontSize: 25,
        margin: 10
    },
    textColor: {
        color:"#26CE8D"
    },
    textStyle: {
        marginTop: 2,
        color: "#62666D"
    }
}

export default function Footer() {
    return (
        <Box component={Grid} container justifyContent="center" sx={style.section1}>
            <Box component={Grid} container sx={{ width: 1200 }} justifyContent="center">
                <Box sx={{display: 'block', textAlign: 'center'}}>
                    <Box>
                        <RiTwitterLine style={style.iconStyle} color="#26CE8D"/>
                        <RiDiscordLine style={style.iconStyle} color="#26CE8D"/>
                        <FiFacebook style={style.iconStyle} color="#26CE8D"/>
                    </Box>
                    <Box>
                        <Typography sx={style.textStyle}>Contact us: <span style={style.textColor}> support@studentreview.com</span></Typography>
                    </Box>
                    <Box>
                        <Typography sx={style.textStyle}>@ 2021 Student Review. All Right Reserved</Typography>
                    </Box>
                    <Box>
                        <Typography sx={style.textStyle}> <span style={style.spanMarginRight}> Terms of Services </span> | <span style={style.spanMarginLeft}>Privacy Policy</span></Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
