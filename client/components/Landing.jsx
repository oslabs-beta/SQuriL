import React, { useState } from 'react';
import Dashboard from './Dashboard.jsx';
import OAuth from './OAuth';
import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SQuriL_logo_black from '../Public/SQuriL_logo_black.png'
import SQuriL_logo_white from '../Public/SQuriL_logo_white.png'
import github_white from '../Public/github_white.png'
import github_black from '../Public/github_black.png'
import '../Styles/App.css'

function Landing(props) {

    // grab probs from App
    const { isDarkTheme, changeTheme, light, dark } = props;
    // declare state for login
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    return (
        // <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
        //     <CssBaseline />
        <div className='App'>
            <a href='https://github.com/oslabs-beta/SQuriL'>
            <img src={isDarkTheme ? github_white : github_black} alt='logo' className='github'/>
            </a>
            <span>
            { isDarkTheme ? 'dark mode' : 'light mode'}
            <IconButton sx={{ ml: 1 }} onClick={changeTheme} color='inherit'>
                { isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon /> }
            </IconButton>
            </span>
            <div className='app-welcome' style={isDarkTheme ? {border: '2px solid white'} : {border: '2px solid black'}}>
            <img src={isDarkTheme ? SQuriL_logo_white : SQuriL_logo_black} alt='logo' className='logo' />       
            <OAuth />
            </div>
        </div>
        // </ThemeProvider>
    );
}

export default Landing;