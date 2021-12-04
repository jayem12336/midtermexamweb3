import React from 'react';

import {
    Box,
    Typography,
    Grid,
    Avatar,
} from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';

const style = {
    cardStyle: {
        width: 250,
        borderRadius: 2,
        backgroundColor: (theme) => theme.colors.cardColor,
        border: '1px solid #2e2c2c'
    },
}
export default function TopStudents( {studName, numReviews, numRating, studPhoto}) {

    const [value, setValue] = React.useState(numRating/numReviews);

    return (
        <Box>
            <Card sx={style.cardStyle}>
                <CardContent>
                    <Box sx={{ display: "flex" }}>
                        <Box>
                            <Avatar src={studPhoto} alt="" variant="square"
                                sx={{
                                    marginRight: 2,
                                    height: 50,
                                    width: 50,
                                    borderRadius: 2
                                }} />
                        </Box>
                        <Box component={Grid} container sx={{ flexDirection: "column" }}>
                            <Typography variant="body1">
                                {studName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#62666D" }}>
                                {numReviews} reviews
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
        </Box >
    )
}
