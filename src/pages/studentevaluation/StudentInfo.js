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
        borderRadius: 2,
        paddingTop: 0.4,
        marginTop: -1,
        height: 30,
        width: 40,
        textAlign: "center",
        marginBottom: 1,
        "&:hover": {
            backgroundColor: '#26CE8D'
        }
    },
    notPassRateStyle: {
        backgroundColor: '#E03E65',
        borderRadius: 2,
        paddingTop: 0.4,
        marginTop: -1,
        height: 30,
        width: 40,
        textAlign: "center",
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

    const rate = stud.studentInfo.rate / stud.studentInfo.review;
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
                            value={rate}
                            sx={{ color: (theme) => theme.colors.navButtonHover, marginTop: 2, fontSize: 40 }}
                            readOnly
                        />
                    </Box>
                </Box>
                <Box component={Grid} container justifyContent="center">
                    <Typography sx={style.textStyle}> {!rate ? "0" : Number(rate).toFixed(2)} Overall Rating </Typography>
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
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }} sx={{ marginLeft: -3 }}>
                        <Typography sx={{
                            color: "#62666D",
                            fontSize: 15,
                            marginLeft: {
                                xs: 12,
                                md: 0
                            },
                            marginRight: { xs: 0, md: -3.5 }
                        }}>{stud.studentInfo.gender}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ marginLeft: 3 }}>
                        <Typography variant="body2" color="textPrimary" sx={{
                            marginLeft: { xs: 4, md: 8 },
                            marginRight: {
                                xs: 0.5, md: 0
                            }
                        }}>  Teamwork: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                        <Box sx={style.passRateStyle}>4.0</Box>
                    </Box>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Birthday: </Typography>
                    </Box>
                    <Box component={Grid}
                        container
                        justifyContent={{ md: "flex-end", xs: "flex-start" }}
                        sx={{
                            marginLeft: { xs: 2, md: 0 }
                        }}>
                        <Typography sx={style.sectionStyle}>{stud.studentInfo.birthday}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end">
                        <Typography variant="body2" color="textPrimary" sx={{
                            marginLeft: { xs: 2, md: 7 },
                            marginRight: {
                                xs: -2.2, md: 0
                            }
                        }}>Creativity: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                        <Box sx={style.passRateStyle}>3.0</Box>
                    </Box>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Address: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end"
                        sx={{
                            marginLeft: {
                                xs: -2, md: 4
                            },
                            marginRight: { xs: -6, md: 0 }
                        }}>
                        <Typography sx={style.sectionStyle}>{stud.studentInfo.address}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end">
                        <Typography variant="body2" color="textPrimary"
                            sx={{
                                marginLeft: {
                                    xs: 0, md: 8
                                },
                                marginRight: {
                                    xs: -4.8, md: 0
                                }
                            }}>Adaptability: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                        <Box sx={style.notPassRateStyle}>1.0</Box>
                    </Box>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Nickname: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }} sx={{
                        marginLeft: {
                            xs: 6, md: 2,

                        }
                    }}>
                        <Typography sx={style.sectionStyle}>{stud.studentInfo.nickname}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{
                        marginLeft: {
                            xs: 0, md: 2
                        }
                    }}>
                        <Typography variant="body2" color="textPrimary" sx={{
                            marginLeft: 2,
                            marginRight: {
                                xs: -1.2, md: 0
                            }
                        }}>Leadership: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                        <Box sx={style.notPassRateStyle}>2.0</Box>
                    </Box>
                </Box>
                <Box sx={style.bodyStyle}>
                    <Box component={Grid} container justifyContent="flex-start">
                        <Typography variant="body2" color="textPrimary"> Skills / Languages: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent={{ md: "flex-end", xs: "flex-start" }}
                        sx={{ marginLeft: { xs: 5, md: 0 } }}>
                        <Typography sx={style.sectionStyle}>{stud.studentInfo.skills}</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end">
                        <Typography variant="body2" color="textPrimary" sx={{
                            marginLeft: { xs: 3.8, md: 8 },

                        }}>Persuasion: </Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7, marginLeft: -1 }}>
                        <Box sx={style.passRateStyle}>3.0</Box>
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
