import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    Avatar,
} from '@mui/material';

import { useSelector } from 'react-redux';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Rating from '@mui/material/Rating';

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
    headerTextStyle: {
        color: "#62666D",
        marginRight: 7
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
        paddingLeft: 2,
        paddingTop: 0.8,
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
    }
}

export default function StudentList() {

    const [value, setValue] = React.useState(5);

    const { stud } = useSelector((state) => state);

    const [studInfo, setStudInfo] = useState([])

    useEffect(() => {
        setStudInfo(stud.studentData)
    }, [stud])

    console.log(studInfo)

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
                    <Typography sx={style.headerTextStyle}>Year & Section</Typography>
                    <Typography sx={style.headerTextStyle}>Reviews</Typography>
                    <Typography sx={style.headerTextStyle}>Rating</Typography>
                </Box>
            </Box>
            <Box component={Grid} container justifyContent='center' sx={{ paddingTop: 2 }}>
                {studInfo.map((studentinfo) => (
                    <Box sx={style.bodyStyle} key={studentinfo.id}>
                        <Box component={Grid} container justifyContent="flex-start">
                            <Typography sx={style.idStyle}> {studentinfo.id} </Typography>
                            <Avatar sx={style.avatarStyle} variant="square" />
                            <Typography sx={style.nameStyle}> {studentinfo.displayName} </Typography>
                        </Box>
                        <Box component={Grid} container justifyContent="flex-end">
                            <Typography sx={style.sectionStyle}> {studentinfo.section} </Typography>
                        </Box>
                        <Box component={Grid} container justifyContent="flex-end">
                            <Typography sx={style.reviewStyle}> {studentinfo.review} </Typography>
                        </Box>
                        <Box component={Grid} container justifyContent="flex-end" sx={{ paddingTop: 0.7 }}>
                            <Rating
                                name="simple-controlled"
                                value={studentinfo.rating}
                                readOnly 
                                sx={{ color: (theme) => theme.colors.navButtonHover }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <Box component={Grid} container justifyContent="center">
                    <Typography sx={style.nameStyle}> Pagination Here </Typography>
                </Box>
            </Box>
        </Box>
    )
}
