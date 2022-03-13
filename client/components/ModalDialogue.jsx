import React from 'react';
import { Dialog } from '@mui/material';
import Landing from './Landing'

const ModalDialogue = ({ open, handleClose, isDarkTheme }) => {

    return (
        //props received from App.js
        <Dialog open={open} onClose={handleClose} maxWidth='xl'>
            {/*form to be created*/}
            <Landing handleClose={handleClose} isDarkTheme={isDarkTheme} />
        </Dialog>
    )
};

export default ModalDialogue;