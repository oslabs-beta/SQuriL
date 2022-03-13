import React, { useState, useEffect } from 'react';
import { SampleGQLServerCode } from '/server/sambleDB.js'
import { Button, TextField } from '@mui/material'
import { atelierForestDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { saveAs } from 'file-saver';
import SyntaxHighlighter from 'react-syntax-highlighter';
import black_logo from '../Public/black_logo.png'
import Loading from './Loading'
import '../Styles/Landing.css'

function Landing() {

    const [demo, setDemo] = useState(false);
    const [loading, setLoading] = useState(true);
    const exportGraphQLCode = () => {
        if(demo) {
            saveAs(new File([`${SampleGQLServerCode}`], 'SQLServerCode.js', {type: 'text/plain;charset=utf-8'}));
        }
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
    }, [])

    return (
        <>
            {loading === false ? (
                <div className="Landing">
                    <img src={black_logo} alt='logo' className='logoLanding' />
                    <Button size='small' variant='contained' onClick={() => setDemo(true)}>Show Demo</Button>
                    <form className='uri-form'>
                        <label form='postgreSQL' className='uri-label'>PostgreSQL URI</label><Button size='small' variant='contained'>Go!</Button>
                        <br></br>
                        <TextField type='text' fullWidth={true} size='string' variant='standard' className='entryForm' placeholder='Input URI...'></TextField>
                        <SyntaxHighlighter language='javascript' className='syntax-highlighter' showLineNumbers='true' wrapLongLines='false' style={atelierForestDark}>
                            {demo ? SampleGQLServerCode : ''}
                        </SyntaxHighlighter>
                        <Button size='small' variant='contained' onClick={() => { exportGraphQLCode();}}>Export</Button>
                    </form>
                </div >
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Landing;