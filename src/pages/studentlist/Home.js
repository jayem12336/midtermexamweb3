import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';
import { Helmet } from 'react-helmet'

import {
    Box,
    Typography,
    Grid,
} from '@mui/material';

import { onSnapshot, collection, limit, orderBy, query } from 'firebase/firestore';

import { db } from '../../utils/firebase';

import TopStudent from './TopStudents';

import StudentList from './StudentList';
import Footer from '../../components/footer/Footer';

const style = {
    section1: {
        paddingTop: 20,
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        alignItems: "center",
    },
    section2: {
        padding: "50px 0px",
        backgroundColor: (theme) => theme.palette.background.default,
        paddingBottom: '200px'
    },
    columnContainer: {
        padding: 2,
    },
    titleStyle: {
        marginLeft: {
            md: 7
        },
        marginBottom: 1,
        justifyContent: {
            xs: "center",
            md: "flex-start"
        },
    }
}
export default function Home() {

    const [fetchStudent, setFetchStudent] = useState([]);

    const colRef = collection(db, "studentlist");

    const queryRate = query(colRef, orderBy("rate", "desc"), limit(4));

    useEffect(() => {
        onSnapshot(queryRate, (snapshot) => {
            setFetchStudent(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        })
    }, [])

    return (
        <Box>
            <Helmet>
                <title>Student List</title>
                <meta
                    name="description"
                    content="College of Information Technology and Engineering"
                />
            </Helmet>
            <NavBar tabvalue={'one'} />
            <Box component={Grid} container justifyContent="center" sx={style.section1}>
                <Box component={Grid} container sx={{ width: 1200 }} justifyContent="center">
                    <Box component={Grid} container sx={style.titleStyle}>
                        <Typography variant="h5" color="textPrimary"> Top Students </Typography>
                    </Box>
                    {
                        fetchStudent.map((student) => (
                            <Grid item sx={style.columnContainer}>
                                <TopStudent
                                    key={student.id}
                                    studPhoto={student.photoURL}
                                    studName={student.displayName}
                                    numReviews={student.review}
                                    numRating={student.rate}
                                />
                            </Grid>
                        ))
                    }
                </Box>
            </Box>
            <Box component={Grid} container justifyContent="center" sx={style.section2}>
                <Box sx={{ width: 1090 }}>
                    <StudentList />
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}
