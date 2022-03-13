import React from 'react';
import { Dialog } from '@mui/material';
import Landing from './Landing'

const ModalDialogue = ({ open, handleClose }) => {
    return(
        //props received from App.js
        <Dialog open={open} onClose={handleClose} maxWidth='xl'>
            {/*form to be created*/}
            <Landing handleClose={handleClose} />
        </Dialog>
    );
};

export default ModalDialogue;