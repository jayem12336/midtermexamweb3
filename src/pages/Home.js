import React from 'react'
import NavBar from '../components/navbar/NavBar'

import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Typography,
    Grid,
    useMediaQuery,
    Link,
    Avatar,
    IconButton,
    InputBase
} from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';

const style = {
    root: {
        paddingTop: 3
    },
    section1: {
        padding: "200px 0px",
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        alignItems: "center",
    },
    columnContainer: {
        padding: 2
    },
    cardStyle: {
        maxWidth: 345,
        borderRadius: 2,
        backgroundColor: (theme) => theme.colors.cardColor
    }
}
export default function Home() {

    const [value, setValue] = React.useState(2);
    return (
        <Box sx={style.root}>
            <NavBar tabvalue={0} />
            <Box component={Grid} container justifyContent="center" sx={style.section1}>
                <Grid item sx={style.columnContainer}>
                    <Card sx={style.cardStyle}>
                        <CardContent>
                            <Box sx={{ display: "flex" }}>
                                <Box>
                                    <Avatar src="" alt=""
                                        sx={{
                                            marginRight: 2,
                                            height: 50,
                                            width: 50
                                        }} />
                                </Box>
                                <Box component={Grid} container sx={{ flexDirection: "column" }}>
                                    <Typography variant="body2" sx={{ color: "black" }}>
                                        Nathan
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "black" }}>
                                        30 reviews
                                    </Typography>
                                </Box>
                            </Box>
                            <Box component={Grid} container justifyContent="center" sx={{ marginTop: 2 }}>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    sx={{ color: (theme) => theme.colors.navButtonHover }}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sx={style.columnContainer}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: "black" }}>
                                Nathan
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sx={style.columnContainer}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: "black" }}>
                                Nathan
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </Box>
    )
}
