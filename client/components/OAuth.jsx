import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function OAuth() {
    return (
        <Button
            variant='outlined'
            startIcon={<GitHubIcon />}
        //onClick method will go here
        >
        GitHub
        </Button>
    )
}

export default OAuth;