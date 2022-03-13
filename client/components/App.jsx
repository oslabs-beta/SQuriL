import React, { useState } from 'react';
// import Dashboard from './Dashboard.jsx'
import { Button, CssBaseline, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ModalDialogue from './ModalDialogue'
import black_logo from '../Public/black_logo.png'
import logo from '../Public/logo.png'
import '../Styles/App.css'

const light = {
    palette: {
        mode: 'light',
    },
};

const dark = {
    palette: {
        mode: 'dark',
    },
};

function App() {
    
    // declare a new state variable for modal open
    const [open, setOpen] = useState(false);
    const [ isDarkTheme, setIsDarkTheme ] = useState(false);

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    };

    //function to handle modal close
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
            <CssBaseline />
        <div className='App'>
            <FormGroup>
                <FormControlLabel control={ <Switch checked={isDarkTheme} onChange={changeTheme}/>}
                label="Dark Theme" />
            </FormGroup>
            <div className='app-welcome' style={isDarkTheme ? {border: '2px solid white'} : {border: '2px solid black'}}>
            <img src={isDarkTheme ? logo : black_logo} alt='logo' className='logo' />
            <Button variant='contained' color='primary' onClick={handleOpen}>
                Let's Go!
            </Button>
            </div>
            {/*display the modal and pass props*/}
            <ModalDialogue
            className='lets-typescript'
            open={open}
            handleClose={handleClose}
            isDarkTheme={isDarkTheme}
            />
        </div>
        </ThemeProvider>
    );
}


export default App;