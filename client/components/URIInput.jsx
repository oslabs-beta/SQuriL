import React from 'react';
import { TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Computer from '@mui/icons-material/Computer';

function URIInput(props) {

    const { uri, setUri } = props;

    return (
        <div className='URIInput'>
            <form>
                <label form='postgreSQL'>PostgreSQL URI:</label><br></br>
                <TextField
                    variant='outlined'
                    size='small'
                    type='text'
                    id='URIAddr'
                    name='URIAddr'
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
                    size='large'
                    variant='contained'
                    id='uri-button'>
                    Go!
                </Button>
            </form>
        </div>
    )
}

export default URIInput;