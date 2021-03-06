import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Computer from '@mui/icons-material/Computer';
import '../Styles/Dashboard.css';

function URIInput(props) {
  const { uri, setUri, setLoading, createGQLSchema, createTsSchema } = props;
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  return (
    <div className='uri-input' data-testid='uri'>
      <h3>Input your PostgreSQL URI here:</h3>
      <TextField
        sx={{ borderRadius: 12.5 }}
        onChange={(e) => setUri(e.target.value)}
        variant='outlined'
        value={uri}
        size='small'
        type='text'
        className='uri-text'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Computer />
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{ borderRadius: 12.5, fontWeight: 'bold' }}
        onClick={() => {
          if (uri < 0 || !uri.includes('postgres://')) {
            setErrorMsg('Please enter a valid PostgreSQL URI');
            setIsError(true);
          } else {
            setIsError(false);
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
            createGQLSchema(uri);
            // createTsSchema();
            setUri('');
          }
        }}
        type='button'
        size='medium'
        variant='contained'
        style={{ marginLeft: '5px' }}
        className='uri-button'
      >
        Go!
      </Button>
      <br />
      <div className='error'>{isError ? <span>{errorMsg}</span> : null}</div>
    </div>
  );
}

URIInput.propTypes = {
  uri: PropTypes.string,
  setUri: PropTypes.func,
  setLoading: PropTypes.func,
  createGQLSchema: PropTypes.func,
  createTsSchema: PropTypes.func,
};

export default URIInput;
