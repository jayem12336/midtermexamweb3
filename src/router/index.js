import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/studentlist/Home';

import theme from '../utils/theme';

import { createTheme, ThemeProvider } from '@mui/material';
import StudentInformation from '../pages/studentevaluation/StudentEvaluation';


export default function RouterComponent() {

    const THEME = createTheme(theme);

    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Switch>
                    <Route component={Home} path="/" exact/>
                    <Route component={StudentInformation} path="/studentevaluation" exact/>
                </Switch>
            </Router>
        </ThemeProvider>

    )
}