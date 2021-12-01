import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navbar/NavBar'

import {
    Box,
    Typography,
    Grid,
    Avatar,
    Rating,
    Button,
    TextField
} from '@mui/material';

import Footer from '../../components/footer/Footer';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { BiShare } from 'react-icons/bi';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StudentInfo from './StudentInfo';

import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../../utils/firebase';

import { setDoc, doc } from '@firebase/firestore';
import { v4 as uuidv4 } from 'uuid';



const style = {
    //helper
    marginStyle: {
        marginRight: 2
    },
    marginTextLeft: {
        marginLeft: 2
    },
    marginTopRating: {
        marginTop: 1
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
        border: '1px solid #2e2c2c',
        padding: {
            xs: 1,
            sm: 3,
            md: 5,
        },
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
        fontSize: 30,
        marginLeft: {
            xs: 0,
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
    section2: {
        padding: '50px 0',
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
    commentContainer: {
        flexDirection: 'row',
        display: 'flex',
        border: '1px solid #2e2c2c',
        padding: 5,
        paddingLeft: 5,
        borderRadius: 2,
        backgroundColor: (theme) => theme.colors.cardColor,
        width: '100%',
        marginTop: 4
    },
    btnCommentReportStyle: {
        marginTop: -1,
        marginLeft: 1,
        color: (theme) => theme.colors.textColor,
        textTransform: 'none',
        fontSize: 20,

    },
    commentStyle: {
        flexDirection: 'row',
        display: 'flex',
        padding: 4,
        paddingLeft: 5,
        borderRadius: 2,
        backgroundColor: "#2C2F31",
        width: '95%',
        marginTop: 4,
        marginLeft: '5%'
    },
    shareStyle: {
        color: "#62666D",
        fontSize: 20
    },
    textComment: {
        color: "#62666D",
        marginTop: -.5,
        marginLeft: 1,
        fontSize: 17
    },
    submitBtn: {
        backgroundColor: '#26CE8D',
        color: (theme) => theme.colors.textColor,
        "&:hover": {
            backgroundColor: '#26CE8D'
        }
    },
    ratingContainer: {
        border: '1px solid #2e2c2c',
        padding: 4,
        borderRadius: 2,
        backgroundColor: (theme) => theme.colors.cardColor,
        maxWidth: 400,
        marginTop: 4
    },
    ratingName: {
        fontSize: 15,
        color: '#D1D4C9'
    },
    ratingStyle: {
        color: (theme) => theme.colors.navButtonHover,
        fontSize: 32,
        marginTop: -.5
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
export default function StudentEvaluation() {

    const [value, setValue] = React.useState(3.5);

    const [showInput, setShowInput] = useState(false);

    const [showInputRating, setShowInputRating] = useState(false)

    const [inputValue, setInputValue] = useState('');

    const [userAuth, setUserAuth] = useState("");

    const [comment, setComment] = useState("");

    const { stud } = useSelector((state) => state);

    const id = stud.studentInfo.id;

    const [breakDownRating, setBreakDownRating] = useState({
        teamwork: 4,
        creativity: 3,
        adaptability: 1,
        leadership: 2,
        persuasion: 2,
        averageRating: 0
    })

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])

    const postComment = async () => {
        if (inputValue === "") {
            alert("please fill up the following fields")
        }
        else {
            const docRef = doc(db, "commentsection", userAuth.uid);
            const payload = {
                comments: inputValue,
                message: 'hello world'
            };
            await setDoc(docRef, payload);
        }
    }

    console.log(id)

    return (
        <Box>
            <NavBar tabvalue={'two'} />
            <Box component={Grid} container justifyContent="center" sx={style.section1}>
                <Box sx={style.studInfoContainer}>
                    <StudentInfo />
                </Box>
                <Box component={Grid} container justifyContent="center" sx={style.section2}>
                    <Box component={Grid} container justifyContent="center">
                        <Typography color="textPrimary" variant="h5">Add Your Rating</Typography>
                    </Box>
                    <Box component={Grid} container justifyContent="center">
                        <Rating
                            name="simple-controlled"
                            value={breakDownRating.averageRating}
                            precision={0.5}
                            sx={{ color: (theme) => theme.colors.navButtonHover, marginTop: 4, fontSize: 50 }}
                            onChange={(event, newValue) => {
                                setBreakDownRating({ ...breakDownRating, averageRating: newValue });
                                setShowInputRating(!showInputRating);
                            }}
                            readOnly={!userAuth ? true : false}

                        />
                    </Box>
                </Box>

                {showInputRating ?
                    <Box component={Grid} container sx={style.ratingContainer} justifyContent="center">
                        <Typography color="#D1D4C9" variant="h7" sx={{ marginBottom: 2, color: '#D1D4C9' }}>Rating</Typography>
                        <Box sx={{ ...style.bodyStyle, ...style.marginTopRating }}>
                            <Box component={Grid} justifyContent="flex-start">
                                <Typography variant="body2" color="#D1D4C9"> Teamwork </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    precision={0.5}
                                    sx={style.ratingStyle}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ ...style.bodyStyle, ...style.marginTopRating }}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="#D1D4C9"> Creativity </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Rating
                                    name="simple-controlled"
                                    value={breakDownRating.creativity}
                                    precision={0.5}
                                    sx={style.ratingStyle}
                                    onChange={(event, newValue) => {
                                        setBreakDownRating({ ...breakDownRating, creativity: newValue });
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ ...style.bodyStyle, ...style.marginTopRating }}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="#D1D4C9"> Adaptability </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Rating
                                    name="simple-controlled"
                                    value={breakDownRating.adaptability}
                                    precision={0.5}
                                    sx={style.ratingStyle}
                                    onChange={(event, newValue) => {
                                        setBreakDownRating({ ...breakDownRating, adaptability: newValue });
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ ...style.bodyStyle, ...style.marginTopRating }}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="#D1D4C9"> Leadership </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Rating
                                    name="simple-controlled"
                                    value={breakDownRating.leadership}
                                    precision={0.5}
                                    sx={style.ratingStyle}
                                    onChange={(event, newValue) => {
                                        setBreakDownRating({ ...breakDownRating, leadership: newValue });
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ ...style.bodyStyle, ...style.marginTopRating }}>
                            <Box component={Grid} container justifyContent="flex-start">
                                <Typography variant="body2" color="#D1D4C9"> Persuasion </Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end">
                                <Rating
                                    name="simple-controlled"
                                    value={breakDownRating.persuasion}
                                    precision={0.5}
                                    sx={style.ratingStyle}
                                    onChange={(event, newValue) => {
                                        setBreakDownRating({ ...breakDownRating, persuasion: newValue });
                                    }}
                                />
                            </Box>
                        </Box>
                        <Typography color="textPrimary" variant="h7" sx={{ marginBottom: 2, color: '#D1D4C9', marginTop: 3 }}>Share us your thoughts!</Typography>
                        <TextField
                            variant="filled"
                            multiline
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            fullWidth
                            minRows={4}
                            sx={{ borderBottom: 'none', marginBottom: 3 }}
                        />
                        <Button variant="contained" sx={style.submitBtn} onClick={ () => postComment(id)}>Submit</Button>
                    </Box>
                    :
                    ''
                }
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
                                <Typography color='textPrimary' sx={{ marginLeft: 2, fontSize: 15 }}> JohnDoe@gmail.com <br /> <span style={{ color: "#62666D" }}> Posted 3 hours Ago </span></Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 6 }}>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    sx={{ color: (theme) => theme.colors.navButtonHover, fontSize: 30 }}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 5.5 }}>
                                <Typography color='textPrimary' sx={{ marginLeft: 1, fontSize: 18 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end" sx={{ marginTop: 3 }}>
                                <Button sx={{ ...style.btnCommentReportStyle, ...style.marginStyle }} startIcon={<ChatBubbleOutlineIcon style={{ fontSize: 25 }} />}>
                                    0 comment
                                </Button>
                                <Button sx={{ ...style.btnCommentReportStyle, ...style.marginStyle }} startIcon={<ErrorOutlineIcon style={{ fontSize: 25 }} />}>
                                    Report
                                </Button>
                            </Box>
                        </Box>
                        <Box component={Grid} container sx={style.commentContainer}>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar />
                                <Typography color='textPrimary' sx={{ marginLeft: 2, fontSize: 15 }}> JohnDoe@gmail.com <br /> <span style={{ color: "#62666D" }}> Posted 3 hours Ago </span></Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 6 }}>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    sx={{ color: (theme) => theme.colors.navButtonHover, fontSize: 30 }}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 5.5 }}>
                                <Typography color='textPrimary' sx={{ marginLeft: 1, fontSize: 18 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                            </Box>
                            <Box component={Grid} container justifyContent="flex-end" sx={{ marginTop: 3 }}>
                                <Button
                                    sx={{ ...style.btnCommentReportStyle, ...style.marginStyle }}
                                    startIcon={<ChatBubbleOutlineIcon style={{ fontSize: 25 }} />}
                                    onClick={() => setShowInput(!showInput)}
                                >
                                    0 comment
                                </Button>
                                <Button
                                    sx={{ ...style.btnCommentReportStyle, ...style.marginStyle }}
                                    startIcon={<ErrorOutlineIcon style={{ fontSize: 25 }} />}
                                >
                                    Report
                                </Button>
                            </Box>
                            {showInput ? <>
                                <Box component={Grid} container sx={style.commentStyle}>
                                    <BiShare style={style.shareStyle} />
                                    <Typography sx={style.textComment}> Add your comment </Typography>
                                    <Box component={Grid} container sx={{ marginTop: 2 }} spacing={2}>
                                        <Grid item xs={10}>
                                            <TextField
                                                id="outlined-basic"
                                                fullWidth
                                                onChange={(e) => setComment(e.target.value)}
                                                sx={{
                                                    backgroundColor: '#131414',
                                                    borderRadius: 3
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Grid container justifyContent="center" sx={{ paddingTop: 1 }}>
                                                <Button variant="contained" disabled={!comment} sx={style.submitBtn} >Submit</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Box component={Grid} container sx={style.commentStyle}>
                                    <BiShare style={style.shareStyle} />
                                    <Typography sx={style.textComment}> Useremail@gmail.com </Typography>
                                    <Typography sx={style.textComment}> 3 hours ago </Typography>
                                    <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 2.5 }}>
                                        <Typography color='textPrimary' sx={{ marginLeft: 1, fontSize: 18 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                                    </Box>
                                </Box>
                                <Box component={Grid} container sx={style.commentStyle}>
                                    <BiShare style={style.shareStyle} />
                                    <Typography sx={style.textComment}> Useremail@gmail.com </Typography>
                                    <Typography sx={style.textComment}> 3 hours ago </Typography>
                                    <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 2.5 }}>
                                        <Typography color='textPrimary' sx={{ marginLeft: 1, fontSize: 18 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                                    </Box>
                                </Box>
                                <Box component={Grid} container justifyContent="center" sx={{ marginTop: 5 }}>
                                    <Typography sx={{ marginLeft: 1, fontSize: 18, color: '#26CE8D' }}> Loading more comments ...</Typography>
                                </Box>
                            </>
                                : ""
                            }
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
                </Box>
            </Box>
            <Footer />

        </Box >
    )
}
