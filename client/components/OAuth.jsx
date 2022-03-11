import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '../Styles/Landing.css'

function OAuth() {

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/oauth/authorize', {
            mode: 'no-cors'
        }) 
            .then(result => {
                console.log('successful request')
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <Button
            className='OAuth'
            variant='outlined'
            startIcon={<GitHubIcon />}
            // onClick={handleSubmit}
            onClick={()=>location.href = '/oauth/authorize'}
        >
        GitHub
        </Button>
    )
}

export default OAuth;