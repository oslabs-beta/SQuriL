import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../Styles/Landing.css';

function OAuth() {
  return (
    <div data-testid='OAuth-1'>
      <Button
        data-testid='OAuth-2'
        variant='contained'
        size='large'
        startIcon={<GitHubIcon />}
        onClick={() => (window.location = '/oauth/authorize')}
      >
        github
      </Button>
    </div>
  );
}

export default OAuth;
