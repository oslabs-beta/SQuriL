import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../Styles/Landing.css'

function OAuth() {

    return (
        <Button
        variant="contained"
        size="large"
        startIcon={<GitHubIcon />}
        onClick={()=>location.href = '/oauth/authorize'}
      >
        github
      </Button>
    )
}

export default OAuth;