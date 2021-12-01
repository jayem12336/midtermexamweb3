import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/studentlist/Home';

import theme from '../utils/theme';

import { auth } from '../utils/firebase';

import { useDispatch, useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material';
import StudentInformation from '../pages/studentevaluation/StudentEvaluation';
import { setUser } from '../redux/actions/userAction';
import { getStudentData } from '../redux/actions/studentAction';


export default function RouterComponent() {

    const THEME = createTheme(theme);

    const { user } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(setUser(authUser));
            } else {
                dispatch(setUser(null));
            }
        })
    }, [dispatch])
    
    console.log(user)
    
    useEffect(() => {
        dispatch(getStudentData())
    }, [dispatch])

  
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