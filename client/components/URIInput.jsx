import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Computer from '@mui/icons-material/Computer';
import '../Styles/Dashboard.css';

function URIInput(props) {
  const { uri, setUri, setLoading, createGQLSchema } = props;

  return (
    <div className='uri-input' data-testid='uri'>
      <h3>Input your PostgreSQL URI here:</h3>
      <br />
      <TextField
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
        onClick={() => {
          // console.log(uri);
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
          createGQLSchema(uri);
          setUri('');
        }}
        type='button'
        size='medium'
        variant='contained'
        style={{ marginLeft: '5px' }}
        className='uri-button'
      >
        Go!
      </Button>
    </div>
  );
}

URIInput.defaultProps = {
  uri: '',
};
URIInput.propTypes = {
  uri: PropTypes.string,
  setUri: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  createGQLSchema: PropTypes.func.isRequired,
};

export default URIInput;
