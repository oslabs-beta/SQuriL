import React from 'react';
import { Button, InputBase } from '@mui/material';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles'
import { ClassNames } from '@emotion/react';

function URIInput(props) {
    let theme = createTheme({
        palette: {
            primary: {
                main: '#ffffff'
            },
        }
    });
    return(
        <div className='URIInput'>
            {/* <h3>PostgreSQL URI:</h3> */}
            <form>
                <label for='postgreSQL'>PostgreSQL URI:</label><br></br>
                <input type='text' id='URIAddr' name='URIAddr'></input><button type='button' id='URIAddrButton'>Go!</button>
            {/* <TextField
            sx={{ m: 0.5 }}
            style={{width: '80%'}}
            size="small"
            type='text'
            placeholder='Add URI...'
            variant='outlined'
            />
            <Button
            sx={{ m: 0.5 }}
            variant="contained"
            size="small"
            type='submit'
            className='URIGo'>
                Go
            </Button> */}
            </form> 
        </div>
    )
}

export default URIInput;