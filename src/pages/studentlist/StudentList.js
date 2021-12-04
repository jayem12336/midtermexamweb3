import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    Avatar,
    TextField,
    LinearProgress
} from '@mui/material';

import { useDispatch } from 'react-redux';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useHistory } from 'react-router';

import Rating from '@mui/material/Rating';
import { toggleStudentData } from '../../redux/actions/studentAction';

import { onSnapshot, collection } from 'firebase/firestore';

import { db } from '../../utils/firebase';

const style = {
    //helper
    marginStyle: {
        marginRight: 2
    },
    btnFilterStyle: {
        marginTop: -1,
        marginLeft: 1,
        color: (theme) => theme.colors.textColor,
        textTransform: 'none',
        fontWeight: '50',
        border: '1px solid #2e2c2c'
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
    bodyStyle: {
        flexDirection: 'row',
        display: 'flex',
        border: '1px solid #2e2c2c',
        padding: 2,
        paddingLeft: 5,
        borderRadius: 2,
        backgroundColor: (theme) => theme.colors.cardColor,
        width: '100%',
        marginTop: 1.5
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
        paddingTop: 0.8,
        cursor: 'pointer',
        paddingLeft: {
            xs: 3,
            md: 2
        },
        fontSize: {
            xs: 14,
            md: 15
        },
    },
    sectionStyle: {
        color: "#62666D",
        fontSize: 20,
        paddingRight: 1,
        paddingTop: 0.4,

    },
    reviewStyle: {
        color: "#62666D",
        fontSize: 20,
        paddingRight: 3,
        paddingTop: 0.4,
    },
    avatarStyle: {
        borderRadius: 2,
        marginLeft: {
            xs: -1,
        },
    },
    arrowLeftContainer: {
        backgroundColor: 'transparent',
        border: '2px solid #2C2F31',
        borderRadius: 2,
        marginRight: 2
    },
    arrowRightContainer: {
        backgroundColor: 'transparent',
        border: '2px solid #2C2F31',
        borderRadius: 2,
        marginLeft: 2
    }
}

export default function StudentList() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)

    const history = useHistory();

    const [fetchStudent, setFetchStudent] = useState([]);

    let [count, setCount] = useState(1);

    const studInfoBtn = (studentData) => {
        dispatch(toggleStudentData(studentData, history));
        setCount(1);
    }
    useEffect(() => {
        onSnapshot(collection(db, "studentlist"), (snapshot) => {
            setFetchStudent(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        })
    }, [])

    return (
        <Box>
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
            <Box component={Grid} container justifyContent='flex-end' sx={{ paddingTop: 5 }}>
                <Box sx={style.headerStyle} component={Grid} container justifyContent='space-between'>
                    <Typography sx={{
                        color: "#62666D",
                        marginLeft: {
                            xs: 7,
                            md: 0
                        },
                        marginRight: {
                            md: 7
                        }
                    }}>Year & Section</Typography>
                    <Typography sx={{
                        color: "#62666D",
                        marginRight: {
                            xs: 2,
                            md: 7
                        },
                        marginLeft: {
                            xs: 2
                        }
                    }}>Reviews</Typography>
                    <Typography sx={{
                        color: "#62666D",
                        marginRight: {
                            xs: 7,
                            md: 7
                        }
                    }}>Rating</Typography>
                </Box>
            </Box>
            {loading ?
                (
                    <LinearProgress />
                ) :
                (
                    ""
                )}
            <Box component={Grid} container justifyContent='center' sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
                {fetchStudent.map((studentdata) => (
                    <Box sx={style.bodyStyle} key={studentdata.id}>
                        <Box component={Grid} container justifyContent="flex-start">
                            <Typography sx={style.idStyle}> {count++} </Typography>
                            <Avatar sx={style.avatarStyle} variant="square" src={studentdata.photoURL}/>
                            <Typography sx={style.nameStyle} onClick={() => studInfoBtn(studentdata)}> {studentdata.displayName} </Typography>
                        </Box>
                        <Box component={Grid} container justifyContent="flex-end" 
                        sx={{
                            marginRight: {
                                xs: -5
                            }
                        }}
                        >
                            <Typography sx={style.sectionStyle}> {studentdata.section} </Typography>
                        </Box>
                        <Box component={Grid} container justifyContent="flex-end">
                            <Typography sx={style.reviewStyle}> {studentdata.review} </Typography>
                        </Box>
                        <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                            <Rating
                                name="simple-controlled"
                                value={studentdata.rate}
                                readOnly
                                sx={{ color: (theme) => theme.colors.navButtonHover }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{ marginTop: 5 }}>
                <Box component={Grid} container justifyContent="center">
                    <Avatar variant="square" sx={style.arrowLeftContainer}>
                        <ArrowBackIcon style={{ color: "#2C2F31", fontSize: 30 }} />
                    </Avatar>
                    <Typography sx={{ color: "#D1D4C9", marginTop: .8, marginRight: 1 }}>Page</Typography>
                    <TextField
                        sx={{ marginTop: -.2 }}
                        inputProps={{
                            sx: { height: 10, width: 20, backgroundColor: '#090807' }
                        }}
                        defaultValue={1}
                    />
                    <Typography sx={{ color: "#D1D4C9", marginTop: .8, marginLeft: 1 }}> of 100</Typography>
                    <Avatar variant="square" sx={style.arrowRightContainer}>
                        <ArrowForwardIcon style={{ color: "#2C2F31", fontSize: 30 }} />
                    </Avatar>
                </Box>
            </Box>
        </Box>
    )
}
