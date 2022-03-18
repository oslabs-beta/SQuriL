import React from 'react';
import { TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Computer from '@mui/icons-material/Computer';
import { MVPschema } from '/server/sampleDB.js'
import '../Styles/Dashboard.css';

function URIInput(props) {

    const { uri, setUri, loadingFunc, onChange, loading, setLoading } = props;

    return (
        <div className='uri-input'>
            <form>
                <label form='postgreSQL'>Input your PostgreSQL URI here:</label><br></br>
                <TextField
                    variant='outlined'
                    value={uri}
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
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 2000);
                        onChange(MVPschema)
                        setUri('')
                    }}
                    type='button'
                    size='medium'
                    variant='contained'
                    style={{marginLeft: '5px'}}
                    className='uri-button'>
                    Go!
                </Button>
            </form>
        </div>
    )
}

export default URIInput;