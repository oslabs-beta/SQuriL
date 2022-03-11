import React from 'react';
import { Button } from '@mui/material';
// import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '../Styles/Landing.css'

function OAuth() {

    // const handleSubmit = (e) => {
        // e.preventDefault();
        // location.href = '/oauth/authorize'
        // fetch('http://localhost:3000/oauth/authorize', {
        //     mode: 'no-cors'
        // }) 
        //     .then(result => {
        //         console.log('successful request')  
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // fetch('http://localhost:3000/oauth/callback', {
        //     method: 'POST'
        // })
        //     .then(result => {
        //         console.log('executed the callback route');
        //     })
        //     .catch(err => {
        //         console.log('error in the callback route');
        //     })
        
    // };

    return (
        <button        
            className='OAuth'
            variant='outlined'
            // startIcon={<GitHubIcon />}
            // onClick={handleSubmit}
            onClick={()=>location.href = '/oauth/authorize'}
        >
        GitHub Login
        </button>
    )
}

export default OAuth;