import React from 'react';

import {
    Box,
    Typography,
    Grid,
    Avatar,
    Rating,
    Button,
} from '@mui/material';

import { useSelector } from 'react-redux';

const style = {
    //helper
    marginTextLeft: {
        marginLeft: 2
    },
    linkColorStyle: {
        color: (theme) => theme.colors.navButtonHover
    },
    avatarStyle: {
        borderRadius: 2,
        width: {
            xs: 80,
            sm: 100,
            md: 100
        },
        height: {
            xs: 80,
            sm: 100,
            md: 100
        },
        border: '2px solid white',
        marginBottom: {
            xs: 0,
            sm: 2,
            md: 2,
        }
    },
    floatChild: {
        width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
        },
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
        marginBottom: 1,
        "&:hover": {
            backgroundColor: '#26CE8D'
        }
    },
    notPassRateStyle: {
        backgroundColor: '#E03E65',
        borderRadius: 3,
        marginTop: -1,
        height: 30,
        marginBottom: 1,
        "&:hover": {
            backgroundColor: '#E03E65'
        }
    },
    studNameStyle: {
        color: (theme) => theme.colors.textColor,
        fontSize: {
            xs: 26,
            sm: 30,
            md: 30
        },
        marginLeft: {
            xs: 5,
            sm: 22,
            md: 12
        },

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
        marginLeft: {
            xs: 0,
            sm: 10,
            md: 12
        }
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
        marginLeft: {
            xs: 1,
            md: 0
        }
    },
    footerStyle: {
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        marginTop: 4,
        marginLeft: {
            xs: 0,
            md: 12
        }
    },
    linkStyle: {
        color: "#62666D",
        fontSize: 15,
        cursor: 'pointer',
    },
}
export default function StudentInfo() {

    const { stud } = useSelector((state) => state);

    const rate = stud.studentInfo.rate;
    return (
        <Box>
            <Box style={style.floatChild}
                sx={{
                    padding: 5, marginLeft: {
                        sm: 20, md: 0
                    }
                }} >
                <Box component={Grid} container justifyContent="center">
                    <Box component={Grid} container justifyContent="center">
                        <Avatar variant="square" sx={style.avatarStyle} src={stud.studentInfo.photoURL} />
                    </Box>
                    <Box component={Grid} container justifyContent="center">
                        <Rating
                            precision={0.5}
                            name="simple-controlled"
                            value={stud.studentInfo.rate}
                            sx={{ color: (theme) => theme.colors.navButtonHover, marginTop: 2, fontSize: 40 }}
                            readOnly
                        />
                    </Box>
                </Box>
                <Box component={Grid} container justifyContent="center">
                    <Typography sx={style.textStyle}> {Number(rate).toFixed(2)} Overall Rating </Typography>
                    <Typography sx={{ ...style.textStyle, ...style.marginTextLeft }}> {stud.studentInfo.review} Reviews </Typography>
                </Box>
            </Box>
            <Box style={style.floatChild}>
                <Box component={Grid} container justifyContent="flex-start" sx={{ paddingBottom: 4, marginTop: -1 }}>
                    <Typography sx={style.studNameStyle}> {stud.studentInfo.displayName}</Typography>
                    <Typography sx={style.studSectionStyle}>{stud.studentInfo.section}</Typography>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Gender: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }}>
                        <Typography sx={{
                            color: "#62666D",
                            fontSize: 15,
                            marginLeft: {
                                xs: 2,
                                md: 2
                            }
                        }}>{stud.studentInfo.gender}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end">
                        <Typography variant="body2" color="textPrimary" sx={{ marginLeft: { xs: 9, md: 8 } }}>  Teamwork: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                        <Button variant="outlined" sx={style.passRateStyle}>4.0</Button>
                    </Box>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Birthday: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }}>
                        <Typography sx={style.sectionStyle}>{stud.studentInfo.birthday}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end">
                        <Typography variant="body2" color="textPrimary" sx={{ marginLeft: { xs: 6.5, md: 8 } }}>Creativity: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                        <Button variant="outlined" sx={style.passRateStyle}>3.0</Button>
                    </Box>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Address: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }}>
                        <Typography sx={style.sectionStyle}>{stud.studentInfo.address}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end">
                        <Typography variant="body2" color="textPrimary" sx={{ marginLeft: { xs: 5, md: 7 } }}>Adaptability: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                        <Button variant="outlined" sx={style.notPassRateStyle}>1.0</Button>
                    </Box>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Nickname: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }}>
                        <Typography sx={style.sectionStyle}>{stud.studentInfo.nickname}</Typography>
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
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }}>
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
                        <a href={`${stud.studentInfo.facebookUrl}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <Typography sx={{ ...style.linkStyle, ...style.linkColorStyle }}> Facebook </Typography>
                        </a>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography sx={{ ...style.linkStyle, ...style.linkColorStyle }}> Linkedin </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography sx={style.linkStyle}> Twitter </Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
