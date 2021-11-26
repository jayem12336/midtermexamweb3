import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';

import theme from '../utils/theme';

import { createTheme, ThemeProvider } from '@mui/material';


export default function RouterComponent() {

    const THEME = createTheme(theme);

    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Switch>
                    <Route component={Home} path="/" exact/>
                </Switch>
            </Router>
        </ThemeProvider>

    )
}