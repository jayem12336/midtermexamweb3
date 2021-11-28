import React, { useState } from 'react'
import NavBar from '../../components/navbar/NavBar'

import {
    Box,
    Typography,
    Grid,
    Item,
    Avatar,
    Rating,
    Button
} from '@mui/material';

import TopStudent from '../studentlist/TopStudents';
import StudentList from '../studentlist/StudentList';
import Footer from '../../components/footer/Footer';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const style = {
    //helper
    marginStyle: {
        marginRight: 2
    },
    marginTextLeft: {
        marginLeft: 2
    },
    linkColorStyle: {
        color: (theme) => theme.colors.navButtonHover
    },
    section1: {
        padding: '200px 20px',
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        alignItems: "center",
    },
    studInfoContainer: {
        borderRadius: 2,
        backgroundColor: (theme) => theme.colors.cardColor,
        border: `1px solid gray`,
        padding: 5,
        width: 1090,
    },
    avatarStyle: {
        borderRadius: 2,
        width: 100,
        height: 100,
        border: '2px solid white',
        marginBottom: 2
    },
    floatChild: {
        width: '50%',
        float: 'left',
    },
    textStyle: {
        color: (theme) => theme.colors.textColor,
        marginTop: 1
    },
    passRateStyle: {
        backgroundColor: '#26CE8D',
        borderRadius: 3,
        marginTop: -1,
        height: 30,
        marginBottom: .5
    },
    notPassRateStyle: {
        backgroundColor: '#E03E65',
        borderRadius: 3,
        marginTop: -1,
        height: 30,
        marginBottom: .5
    },
    studNameStyle: {
        color: (theme) => theme.colors.textColor,
        fontSize: 30
    },
    studSectionStyle: {
        color: "#D1D4C9",
        marginTop: 2,
        marginLeft: 2,
        fontSize: 15
    },
    bodyStyle: {
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
    },
    idStyle: {
        color: "#62666D",
        fontSize: 20,
        paddingRight: 5,
        paddingTop: 0.4,
        width: '20%'
    },
    nameStyle: {
        color: (theme) => theme.colors.textColor,
        paddingLeft: 2,
        paddingTop: 0.8,
    },
    sectionStyle: {
        color: "#62666D",
        fontSize: 15,
    },
    reviewStyle: {
        color: "#62666D",
        fontSize: 20,
        paddingRight: 3,
        paddingTop: 0.4,
    },
    footerStyle: {
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        marginTop: 4
    },
    linkStyle: {
        color: "#62666D",
        fontSize: 15,
        cursor: 'pointer'
    },
    section2: {
        padding: '50px 0',
    },
    btnFilterStyle: {
        marginTop: -1,
        marginLeft: 1,
        color: (theme) => theme.colors.textColor,
        textTransform: 'none',
        fontWeight: '50',
        border: '1px solid white'
    },
    headerStyle: {
        flexDirection: 'row',
        display: 'flex',
        width: {
            xs: '100%',
            sm: '75%,',
            md: '57%'
        }
    },
    commentContainer: {
        flexDirection: 'row',
        display: 'flex',
        border: '1px solid gray',
        padding: 2,
        paddingLeft: 5,
        borderRadius: 2,
        backgroundColor: (theme) => theme.colors.cardColor,
        width: '100%',
        marginTop: 4
    }
}
export default function StudentEvaluation() {

    const [value, setValue] = React.useState(3);

    return (
        <Box>
            <NavBar tabvalue={0} />
            <Box component={Grid} container justifyContent="center" sx={style.section1}>
                <Box sx={style.studInfoContainer}>
                    <Box style={style.floatChild} sx={{ padding: 5 }}>
                        <Box component={Grid} container justifyContent="center">
                            <Box component={Grid} container justifyContent="center">
                                <Avatar variant="square" sx={style.avatarStyle} />
                            </Box>
                            <Box component={Grid} container justifyContent="center">
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    sx={{ color: (theme) => theme.colors.navButtonHover, marginTop: 2, fontSize: 40 }}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box component={Grid} container justifyContent="center">
                            <Typography sx={style.textStyle}> 3.0 Overall Rating </Typography>
                            <Typography sx={{ ...style.textStyle, ...style.marginTextLeft }}> 2000 Reviews </Typography>
                        </Box>
                    </Box>
                    <Box style={style.floatChild}>
                        <Box component={Grid} container justifyContent="flex-start" sx={{ paddingBottom: 4, marginTop: -1 }}>
                            <Typography sx={style.studNameStyle}> Hipolito, Jonathan J.</Typography>
                            <Typography sx={style.studSectionStyle}> BSIT 4B </Typography>
                        </Box>
                        <Box sx={style.bodyStyle}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="textPrimary"> Gender: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography sx={style.sectionStyle}> Male </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography variant="body2" color="textPrimary" sx={{ marginLeft: 10 }}>  Teamwork: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                                <Button variant="outlined" sx={style.passRateStyle}>4.0</Button>
                            </Box>
                        </Box>
                        <Box sx={style.bodyStyle}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="textPrimary"> Birthday: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography sx={style.sectionStyle}> 02-24-1997 </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography variant="body2" color="textPrimary" sx={{ marginLeft: 8 }}>Creativity: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                                <Button variant="outlined" sx={style.passRateStyle}>3.0</Button>
                            </Box>
                        </Box>
                        <Box sx={style.bodyStyle}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="textPrimary"> Address: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography sx={style.sectionStyle}> Bustos Bulacan </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography variant="body2" color="textPrimary" sx={{ marginLeft: 7 }}>Adaptability: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                                <Button variant="outlined" sx={style.notPassRateStyle}>1.0</Button>
                            </Box>
                        </Box>
                        <Box sx={style.bodyStyle}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="textPrimary"> Nickname: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography sx={style.sectionStyle}> Nathan </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography variant="body2" color="textPrimary" sx={{ marginLeft: 7 }}>Leadership: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                                <Button variant="outlined" sx={style.notPassRateStyle}>2.0</Button>
                            </Box>
                        </Box>
                        <Box sx={style.bodyStyle}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="textPrimary"> Skills / Languages: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography sx={style.sectionStyle}> Javascript, Python </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Typography variant="body2" color="textPrimary" sx={{ marginLeft: 7 }}>Persuasion: </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                                <Button variant="outlined" sx={style.passRateStyle}>3.0</Button>
                            </Box>
                        </Box>
                        <Box sx={style.footerStyle}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography sx={style.linkStyle}> Github </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography sx={{ ...style.linkStyle, ...style.linkColorStyle }}> Facebook </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography sx={{ ...style.linkStyle, ...style.linkColorStyle }}> Linkedin </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography sx={style.linkStyle}> Twitter </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box component={Grid} container justifyContent="center" sx={style.section2}>
                    <Box component={Grid} container justifyContent="center">
                        <Typography color="textPrimary" variant="h4">Add Your Rating</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="center">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            sx={{ color: (theme) => theme.colors.navButtonHover, marginTop: 4, fontSize: 40 }}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>
                </Box>
                <Box component={Grid} container justifyContent="center" sx={style.section2}>
                    <Box sx={{ width: 1090 }}>
                        <Box component={Grid} container justifyContent="flex-end">
                            <Typography color="textPrimary">
                                Sort By:
                            </Typography>
                            <Button variant="outlined" sx={{ ...style.btnFilterStyle, ...style.marginStyle }} endIcon={<ArrowDropDownIcon />}>
                                Most Recent
                            </Button>
                            <Typography color="textPrimary">
                                Filter:
                            </Typography>
                            <Button variant="outlined" sx={style.btnFilterStyle} endIcon={<ArrowDropDownIcon />}>
                                No Filter
                            </Button>
                        </Box>
                        <Box component={Grid} container sx={style.commentContainer}>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar />
                                <Typography variant='caption' color='textPrimary' sx={{marginLeft: 1}}> JohnDoe@gmail.com <br /> <span style={{color: "#62666D"}}> Posted 3 hours Ago </span></Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2}}>
                                <Avatar />
                                <Typography variant='caption' color='textPrimary' sx={{marginLeft: 1}}> JohnDoe@gmail.com <br /> <span style={{color: "#62666D"}}> Posted 3 hours Ago </span></Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
