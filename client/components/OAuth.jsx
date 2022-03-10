import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '../Styles/Landing.css'

function OAuth() {
    return (
        <Button
            className='OAuth'
            variant='outlined'
            startIcon={<GitHubIcon />}
        //onClick method will go here
        >
        GitHub
        </Button>
    )
}

export default OAuth;