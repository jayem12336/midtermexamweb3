import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/studentlist/Home';

import theme from '../utils/theme';

import { auth } from '../utils/firebase';

import { useDispatch } from 'react-redux';

import { createTheme, ThemeProvider, Box } from '@mui/material';
import StudentInformation from '../pages/studentevaluation/StudentEvaluation';
import { setUser } from '../redux/actions/userAction';
import { getStudentData, getStudentListData } from '../redux/actions/studentAction';

import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';


export default function RouterComponent(props) {

    const [loading, setLoading] = useState(true);

    const THEME = createTheme(theme);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentListData());
        dispatch(getStudentData());
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(setUser(authUser));
            } else {
                dispatch(setUser(null));
            }
        })
        setLoading(false);
    }, [dispatch])

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                // flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center',
                height: '100vh',
                width: '100vw'
            }}>
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: "#161717",
                        animationDuration: '550ms',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={200}
                    thickness={4}
                    {...props}
                />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Switch>
                    <Route component={Home} path="/" exact />
                    <Route component={StudentInformation} path="/studentevaluation/:id" exact />
                </Switch>
            </Router>
        </ThemeProvider>

    )
}