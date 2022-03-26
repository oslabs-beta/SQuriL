import React from 'react';
import { TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Computer from '@mui/icons-material/Computer';
import { MVPschema } from '../../server/sampleDB';
import '../Styles/Dashboard.css';

function URIInput(props) {
  const { uri, setUri, loadingFunc, loading, setLoading, createGQLSchema } = props;

  return (
    <div className='uri-input' data-testid='uri'>
      <form>
        <label form='postgreSQL'>Input your PostgreSQL URI here:</label>
        <br></br>
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
      </form>
    </div>
  );
}

export default URIInput;
