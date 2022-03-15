import React, { useState } from 'react';
import { useCookies, cookie, allCookies } from 'react-cookie'
import Dashboard from './Dashboard.jsx';
import OAuth from './OAuth';
import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// import ModalDialog from './ModalDialog';
import SQuriL_logo_black from '../Public/SQuriL_logo_black.png'
import SQuriL_logo_white from '../Public/SQuriL_logo_white.png'
import github_white from '../Public/github_white.png'
import github_black from '../Public/github_black.png'
import '../Styles/App.css'

// set palette for light mode
const light = {
    palette: {
        mode: 'light',
    },
};

// set palette for dark mode
const dark = {
    palette: {
        mode: 'dark',
    },
};

function Landing() {

    // declare state for modal open
    const [ open, setOpen ] = useState(false);
    // declare state for dark theme
    const [ isDarkTheme, setIsDarkTheme ] = useState(false);
    // declare state for login
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    // declare react-cookie
    const [ cookies, setCookie, removeCookie ] = useCookies();

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
            <CssBaseline />
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
            {/* <Button variant='contained' color='primary' onClick={handleOpen}>
                Let's Go!
            </Button> */}
            </div>
            {/*display the modal and pass props*/}
            {/* <ModalDialogue
            className='lets-typescript'
            open={open}
            handleClose={handleClose}
            isDarkTheme={isDarkTheme}
            /> */}
        </div>
        </ThemeProvider>
    );
}

export default Landing;