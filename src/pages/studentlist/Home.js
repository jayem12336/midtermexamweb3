import React from 'react';
import NavBar from '../../components/navbar/NavBar';

import {
    Box,
    Typography,
    Grid,
} from '@mui/material';

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

    return (
        <Box>
            <NavBar tabvalue={0} />
            <Box component={Grid} container justifyContent="center" sx={style.section1}>
                <Box component={Grid} container sx={{ width: 1200 }} justifyContent="center">
                    <Box component={Grid} container sx={style.titleStyle}>
                        <Typography variant="h5" color="textPrimary"> Top Students </Typography>
                    </Box>
                    <Grid item sx={style.columnContainer}>
                        <TopStudent
                            studName="Jomari"
                            numReviews="30"
                            numRating={2}
                        />
                    </Grid>
                    <Grid item sx={style.columnContainer}>
                        <TopStudent
                            studName="Nico"
                            numReviews="20"
                            numRating={2}
                        />
                    </Grid>
                    <Grid item sx={style.columnContainer}>
                        <TopStudent
                            studName="Aldrin"
                            numReviews="30"
                            numRating={2}
                        />
                    </Grid>
                    <Grid item sx={style.columnContainer}>
                        <TopStudent
                            studName="Jarvis"
                            numReviews="30"
                            numRating={2}
                        />
                    </Grid>
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
