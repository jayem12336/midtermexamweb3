import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/studentlist/Home';

import theme from '../utils/theme';

import { auth, db } from '../utils/firebase';

import { useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material';
import StudentInformation from '../pages/studentevaluation/StudentEvaluation';
import { setUser } from '../redux/actions/userAction';
import { getStudentData, toggleStudentListData, getStudentListData } from '../redux/actions/studentAction';


export default function RouterComponent() {

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

    if (loading) return <h1>Loading...</h1>

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