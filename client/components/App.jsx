import React, { useState } from 'react';
// import Dashboard from './Dashboard.jsx'
import { Button } from '@mui/material';
import ModalDialogue from './ModalDialogue'
import Landing from './Landing.jsx'
import black_logo from '../Public/black_logo.png'
import '../Styles/App.css'


function App() {
    
    // declare a new state variable for modal open
    const [open, setOpen] = useState(false);

    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    };

    //function to handle modal close
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='App'>
            <div className='app-welcome'>
            <img src={black_logo} alt='logo' className='logo' />
            <Button variant='contained' color='primary' onClick={handleOpen}>
                Let's Go!
            </Button>
            </div>
            {/*display the modal and pass props*/}
            <ModalDialogue
            className='lets-typescript'
            open={open}
            handleClose={handleClose}
            />
        </div>
    );
}


export default App;