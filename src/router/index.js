import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/studentlist/Home';

import theme from '../utils/theme';

import { auth } from '../utils/firebase';

import { useSelector, useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material';
import StudentInformation from '../pages/studentevaluation/StudentEvaluation';
import { setUser } from '../redux/actions/userAction';
import { getStudentData } from '../redux/actions/studentAction';


export default function RouterComponent() {

    const THEME = createTheme(theme);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(setUser(authUser));
                dispatch(getStudentData());
            } else {
                dispatch(setUser(null));
            }
        })
    }, [dispatch])

    console.log(user);

    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Switch>
                    <Route component={Home} path="/" exact/>
                    <Route component={StudentInformation} path="/studentevaluation/:id" exact/>
                </Switch>
            </Router>
        </ThemeProvider>

    )
}