import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../Styles/Landing.css';

function OAuth() {
  const oAuthGo = () => {
    window.location = '/oauth/authorize';
  };

  return (
    <div data-testid='OAuth-1'>
      <Button
        data-testid='OAuth-2'
        variant='contained'
        size='large'
        startIcon={<GitHubIcon />}
        sx={{ borderRadius: 12.5, fontWeight: 'bold' }}
        onClick={oAuthGo}
      >
        github
      </Button>
    </div>
  );
}

export default OAuth;
