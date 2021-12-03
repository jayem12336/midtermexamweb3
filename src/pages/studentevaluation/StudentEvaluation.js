import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navbar/NavBar'

import {
    Box,
    Typography,
    Grid,
    Avatar,
    Rating,
    Button,
    TextField,
    LinearProgress
} from '@mui/material';

import Footer from '../../components/footer/Footer';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StudentInfo from './StudentInfo';

import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../../utils/firebase';

import Swal from 'sweetalert2';

import { doc, onSnapshot, collection, addDoc, updateDoc, orderBy, query, getDoc } from '@firebase/firestore';

import RatingComponent from './RatingComponent';

import { useHistory } from 'react-router';
import { toggleStudentData } from '../../redux/actions/studentAction';

const style = {
    //helper
    marginStyle: {
        marginRight: 2
    },
    marginTopRating: {
        marginTop: 1
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
    floatChild: {
        width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
        },
        float: 'left',

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
    bodyStyle: {
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
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

    const history = useHistory();

    const dispatch = useDispatch();

    const [showInputRating, setShowInputRating] = useState(false)

    const [inputValue, setInputValue] = useState('');

    const [userAuth, setUserAuth] = useState("");

    const [loading, setLoading] = useState(true);

    const { stud } = useSelector((state) => state);

    const [post, setPost] = useState([]);

    const id = stud.studentInfo.id;

    const [breakDownRating, setBreakDownRating] = useState({
        teamwork: 0,
        creativity: 0,
        adaptability: 0,
        leadership: 0,
        persuasion: 0,
        averageRating: 0
    });

    const colRef = collection(db, "studentlist", id, "post");

    const q = query(colRef, orderBy("timestamp", "desc"));

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setPost(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        }
        )
        return () => {
            setPost({}); // This worked for me
        };
    }, [])


    const userPost = async () => {
        if (inputValue === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Type Something!',
            })
        }
        else if (breakDownRating.teamwork === 0 || breakDownRating.creativity === 0 || breakDownRating.adaptability === 0 || breakDownRating.leadership === 0 || breakDownRating.persuasion === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please complete the following rating!',
            })
        }
        else {
            breakDownRating.averageRating =
                ((
                    breakDownRating.teamwork
                    + breakDownRating.creativity
                    + breakDownRating.adaptability
                    + breakDownRating.leadership
                    + breakDownRating.persuasion)
                    / 5
                )
            const updateRef = doc(db, "studentlist", id);
            await updateDoc(updateRef, {
                review: stud.studentInfo.review + 1,
                rate: (stud.studentInfo.rate + breakDownRating.averageRating) / (stud.studentInfo.review) ,
            });

            const docRef = await addDoc(collection(db, "studentlist", id, "post"), {
                post: inputValue,
                email: userAuth.email,
                averagerating: breakDownRating.averageRating,
                photoURL: userAuth.photoURL,
                timestamp: new Date(),
                userid: id
            });
            const docSnap = await getDoc(updateRef);

            console.log(docSnap.data());
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
            })
            setBreakDownRating({ ...breakDownRating, averageRating: 0, teamwork: 0, creativity: 0, adaptability: 0, leadership: 0, persuasion: 0 });
            setShowInputRating(false);
            setInputValue('');
        }
    }

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
                                    value={breakDownRating.teamwork}
                                    precision={0.5}
                                    sx={style.ratingStyle}
                                    onChange={(event, newValue) => {
                                        setBreakDownRating({ ...breakDownRating, teamwork: newValue });
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
                        <Button variant="contained" sx={style.submitBtn} onClick={() => userPost(id)}>Submit</Button>
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
                        {loading ?
                            (
                                <LinearProgress />
                            ) :
                            (
                                ""
                            )}
                        {
                            post.map((postdata) => (
                                <RatingComponent
                                    key={postdata.id}
                                    postid={postdata.id}
                                    postemail={postdata.email}
                                    postrateaverage={postdata.averagerating}
                                    timestamp={postdata.timestamp}
                                    postphotourl={postdata.photoURL}
                                    post={postdata.post}
                                />
                            ))
                        }
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
