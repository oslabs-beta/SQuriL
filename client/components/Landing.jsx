import React, { useState } from 'react';
// import LogoLanding from './LogoLanding';
import OAuth from './OAuth';
import black_logo from '../Public/black_logo.png'
import '../Styles/Landing.css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { SampleGQLServerCode } from '/server/sambleDB.js'
import { Button, TextField } from '@mui/material'

// create a component that serves as login button and fx
function Landing(props) {

    const [ demo, setDemo ] = useState(false);
    console.log(demo)

    return (
        <div className="Landing">
            <img src={black_logo} alt='logo' className='logoLanding' />
            <Button size='small' variant='contained' onClick={() => setDemo(true)}>Show Demo</Button>
            <form className='uri-form'>
            <label form='postgreSQL' className='uri-label'>PostgreSQL URI</label><Button size='small' variant='contained'>Go!</Button>
            <br></br>
              <TextField  type='text' fullWidth={true} size='string' variant='standard' className='entryForm' placeholder='Input URI...'></TextField>
                <SyntaxHighlighter language='javascript' className='syntax-highlighter' showLineNumbers='true' wrapLongLines='false'>
                    {demo ? SampleGQLServerCode : ''}
                </SyntaxHighlighter>
            </form>
        </div > 
    )
}

export default Landing;