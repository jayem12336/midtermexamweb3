import React, { useState, useEffect } from 'react';

import {
    Box,
    Typography,
    Grid,
    Avatar,
    Rating,
    Button,
    TextField,
} from '@mui/material';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { BiShare } from 'react-icons/bi';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { auth, db } from '../../utils/firebase';

import Swal from 'sweetalert2';

import { onSnapshot, collection, addDoc, query, orderBy } from '@firebase/firestore';

const style = {
    marginStyle: {
        marginRight: 2
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
        marginLeft: 2,
        fontSize: 17
    },
    submitBtn: {
        backgroundColor: '#26CE8D',
        color: (theme) => theme.colors.textColor,
        "&:hover": {
            backgroundColor: '#26CE8D'
        }
    },
}

export default function RatingComponent({ postemail, postrateaverage, post, timestamp, postphotourl, postid }) {

    const [showInput, setShowInput] = useState(false);

    const [userAuth, setUserAuth] = useState("");

    const [values, setValues] = useState({
        comment: '',
    });

    const [commentList, setCommentList] = useState([]);

    const { stud } = useSelector((state) => state);

    const id = stud.studentInfo.id;

    const [totalDoclNumbers, setTotalDoclNumbers] = useState(0);


    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])


    const colRef = collection(db, "studentlist", id, "post", postid, "comment");

    const queryTimeStamp = query(colRef, orderBy("timestamp", "desc"));

    useEffect(() => {
        onSnapshot(queryTimeStamp, (snapshot) => {
            setCommentList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setTotalDoclNumbers(snapshot.docs.length);
        }
        )

    }, [])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const userComment = async () => {
        await addDoc(collection(db, "studentlist", id, "post", postid, "comment"), {
            text: values.comment,
            email: userAuth.email,
            photoURL: userAuth.photoURL,
            timestamp: new Date(),
        });
        setValues({ ...values, comment: "" });
    }

    return (
        <Box component={Grid} container sx={style.commentContainer}>
            <Box component={Grid} container justifyContent="flex-start" sx={{ display: 'flex', flexDirection: 'row' }}>
                <Avatar src={postphotourl} />
                <Typography color='textPrimary' sx={{ marginLeft: 2, fontSize: 15 }}>{postemail}<br /> <span style={{ color: "#62666D" }}> Posted {moment(timestamp.toDate().toISOString()).fromNow()}</span></Typography>
            </Box>
            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 6 }}>
                <Rating
                    precision={0.5}
                    name="simple-controlled"
                    value={postrateaverage}
                    sx={{ color: (theme) => theme.colors.navButtonHover, fontSize: 30 }}
                    readOnly
                />
            </Box>
            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 5.5 }}>
                <Typography color='textPrimary' sx={{ marginLeft: 1, fontSize: 18 }}>{post}</Typography>
            </Box>
            <Box component={Grid} container justifyContent="flex-end" sx={{ marginTop: 3 }}>
                <Button
                    sx={{ ...style.btnCommentReportStyle, ...style.marginStyle }}
                    startIcon={<ChatBubbleOutlineIcon
                        style={{
                            fontSize: {
                                xs: 12,
                                md: 25
                            }
                        }}
                    />}
                    onClick={() => setShowInput(!showInput)}
                >
                    {totalDoclNumbers} comment
                </Button>
                <Button
                    sx={{ ...style.btnCommentReportStyle, ...style.marginStyle }}
                    startIcon={<ErrorOutlineIcon
                        style={{
                            fontSize: {
                                xs: 12,
                                md: 25
                            }
                        }} />}
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
                                value={values.comment}
                                onChange={handleChange('comment')}
                                sx={{
                                    backgroundColor: '#131414',
                                    borderRadius: 3
                                }}
                                disabled={!userAuth ? true : false}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container justifyContent="center" sx={{ paddingTop: 1 }}>
                                <Button variant="contained" disabled={!values.comment} sx={style.submitBtn} onClick={userComment}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {
                    commentList.map((comments) => (
                        <Box component={Grid} container sx={style.commentStyle}>
                            <BiShare style={style.shareStyle} />
                            <Typography sx={style.textComment}> {comments.email} </Typography>
                            <Typography sx={style.textComment}> {moment(comments.timestamp.toDate().toISOString()).fromNow()} </Typography>
                            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 2.5 }}>
                                <Typography color='textPrimary' sx={{ marginLeft: 1, fontSize: 18 }}>{comments.text}</Typography>
                            </Box>
                        </Box>
                    ))
                }
                <Box component={Grid} container justifyContent="center" sx={{ marginTop: 5 }}>
                    <Typography sx={{ marginLeft: 1, fontSize: 18, color: '#26CE8D' }}> Loading more comments ...</Typography>
                </Box>
            </>
                : ""
            }
        </Box>
    )
}
