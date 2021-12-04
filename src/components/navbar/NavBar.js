import React, { useState, useEffect } from 'react';

import { styled, alpha } from '@mui/material/styles';
import {
    Box,
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

import { useDispatch } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';

import { useTheme } from '@mui/material/styles';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';

import accountprofile from '../../assets/img/png/accountcircle.png';

import SideDrawer from './drawerComponent/SideDrawer';

import { FiFacebook } from 'react-icons/fi';

import { RiTwitterLine } from 'react-icons/ri';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useHistory } from 'react-router-dom';
import { logoutInitiate } from '../../redux/actions/userAction';
import { auth } from '../../utils/firebase';
import googleLogo from '../../assets/img/png/googleLogo.jpg'

const style = {
    accountButton: {
        fontSize: '20px',
        width: '100px',
        color: (theme) => theme.colors.navButton,
        '&:hover': {
            color: (theme) => theme.colors.navButtonHover,
        }
    },
    logoStyle: {
        height: "50px",
        width: "50px",
    },
    title: {
        fontSize: {
            xs: '22px',
            md: '25px'
        },
        marginLeft: 1,
        color: (theme) => theme.colors.navButton
    },
    menuLinks: {
        marginLeft: 8,
        '&:hover': {
            background: '#4877c2',
            color: (theme) => theme.colors.navButton,
        }
    },
    linkStyle: {
        textDecoration: "none",
        color: (theme) => theme.colors.textColor
    },
    btnLinks: {
        marginLeft: 3,
        fontSize: '25px',
        width: '100px',
        textDecoration: 'none',
        textTransform: 'none',
        '&:hover': {
            color: (theme) => theme.colors.navButtonHover,
        }
    },
    linkContainer: {
        flexGrow: {
            xs: '1',
            sm: '1',
            md: '0'
        }
    },
    toolbarStyle: {
        padding: {
            xs: 1,
            sm: 1,
            md: 2
        },
        width: 1800
    },
    iconStyle: {
        marginLeft: 2,
        marginTop: .1,
        fontSize: 28
    },
    menuStyle: {
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 2,

    },
    iconContainer: {
        display: "flex"
    },
    tabtextStyle: {
        color: "white",
        textTransform: "none",
        fontSize: 16,
        width: 180
    },
    indicator: {
        top: "0px",
        maxWidth: 30,
        marginLeft: 9.5
    },

};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        height: 34,
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavBar({ tabvalue }) {

    const history = useHistory();

    const dispatch = useDispatch();

    const [value, setValue] = React.useState(tabvalue);

    const [userAuth, setUserAuth] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();

    const matchMD = useMediaQuery(theme.breakpoints.up('md'));

    const btnSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // The signed-in user info.
                window.location.reload(false);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                alert(errorMessage);
                // The email of the user's account used.
                const email = error.email;
                alert(email);
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                alert(credential);
            });
    }

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])

    const btnLogout = () => {
        dispatch(logoutInitiate(history));
        setValue(tabvalue)
    }

    return (
        <Box component={Grid} container justifyContent="center">
            <AppBar position="fixed">
                <Grid container justifyContent="center">
                    <Toolbar sx={style.toolbarStyle}>
                        <Link href="#" sx={style.linkStyle}>
                            <Typography sx={style.title}>Student Review</Typography>
                        </Link>
                        <GridViewIcon sx={style.iconStyle} />
                        <Box component="span" sx={style.linkContainer} />

                        <Box component="span" sx={{ flexGrow: 1 }}>
                            {!matchMD ? <SideDrawer /> :
                                <>
                                    <Grid container justifyContent="center">
                                        <Tabs
                                            value={value}
                                            textColor="secondary"
                                            indicatorColor="secondary"
                                            aria-label="secondary tabs example"
                                            TabIndicatorProps={{
                                                sx: style.indicator,
                                            }}
                                        >
                                            <Tab value="one" label="Student List" sx={style.tabtextStyle} onClick={ () => history.push("/")}/>
                                            <Tab value="two" label="Student Evaluation" sx={style.tabtextStyle} />
                                            <Tab value="three" label="Blog" sx={style.tabtextStyle} />
                                        </Tabs>
                                    </Grid>
                                </>
                            }
                        </Box>
                        <IconButton
                            id="fade-button"
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={!userAuth ? handleClick : btnLogout}
                        >
                            {!userAuth ? <Avatar src={accountprofile} sx={{
                                marginLeft: {
                                    xs:  -3,
                                    md: 0
                                }
                            }} /> : <Avatar src={userAuth.photoURL} sx={{
                                marginLeft: {
                                    xs: -3,
                                    md: 0
                                },
                            }} />}

                        </IconButton>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                                sx: style.menuStyle
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            sx={{ marginTop: 2.2, }}
                            color="transparent"
                        >
                            <Box component={Grid} justifyContent="center" >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: "center",
                                        fontFamily: "roboto",
                                        lineHeight: "20px",
                                        marginBottom: 2
                                    }}>
                                    Sign In</Typography>
                                <Typography variant="subtitle1">Sign in to review and rate students</Typography>
                                <Box component={Grid} justifyContent="center" alignItems="center" sx={style.iconContainer}>
                                    <Avatar variant="square" sx={{
                                        backgroundColor: "#4267B2", borderRadius: 2,
                                        marginLeft: 2,
                                        cursor: "pointer",
                                        marginTop: 2
                                    }}>
                                        <FiFacebook color="#FFFFFF" />
                                    </Avatar>
                                    <Avatar variant="square" sx={{
                                        backgroundColor: "#00ACEE", borderRadius: 2,
                                        marginLeft: 2,
                                        cursor: "pointer",
                                        marginTop: 2
                                    }}>
                                        <RiTwitterLine color="#FFFFFF" />
                                    </Avatar>
                                    <Avatar variant="square" sx={{
                                        backgroundColor: "#4285F4", borderRadius: 2,
                                        marginLeft: 2,
                                        cursor: "pointer",
                                        marginTop: 2

                                    }}
                                        src={googleLogo}
                                        onClick={btnSignInWithGoogle}
                                    />
                                </Box>
                            </Box>
                        </Menu>
                        {!matchMD ? <SearchIcon sx={{ fontSize: 30 }} /> :
                            <>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </>
                        }
                    </Toolbar>
                </Grid>
            </AppBar>
        </Box>
    )
}