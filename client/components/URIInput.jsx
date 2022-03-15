import React from 'react';
import { TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Computer from '@mui/icons-material/Computer';
import '../Styles/Dashboard.css';

function URIInput(props) {

    const { uri, setUri } = props;

    return (
        <div className='uri-input'>
            <form>
                <label form='postgreSQL'>PostgreSQL URI:</label><br></br>
                <TextField
                    variant='outlined'
                    size='small'
                    type='text'
                    className='uri-text'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Computer />
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    type='button'
                    size='medium'
                    variant='contained'
                    className='uri-button'>
                    Go!
                </Button>
            </form>
        </div>
    )
}

export default URIInput;