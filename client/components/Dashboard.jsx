import React, { useState, useEffect } from 'react';
import QueryContainer from './QueryContainer';
import SchemaContainer from './SchemaContainer';
import { Button } from '@mui/material';
import URIInput from './URIInput';
import { saveAs } from 'file-saver';
import OutputContainer from './OutputContainer';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import '../Styles/Dashboard.css'
import SQuriL_logo_white from '../Public/SQuriL_logo_white.png'
import SQuriL_logo_black from '../Public/SQuriL_logo_black.png'
import github_white from '../Public/github_white.png'
import github_black from '../Public/github_black.png'

function Dashboard(props) {
  // pulling from props
  const { isDarkTheme, changeTheme, light, dark } = props;
  // all the queries which are shown in the QueryContainer
  const [queryCard, setQueryCard] = useState([]);
  // set state for schema window of a given query card
  const [schema, setSchema] = useState();
  // set state for the output window of a submitted query
  const [output, setOutput] = useState();
  // set state for uri address bar at the top of the screen
  const [uri, setUri] = useState();
  // the current query id that the user has selected
  const [currentQueryId, setCurrentQueryId] = useState();


  // loads querycards on page load ([] = just once)
  useEffect(() => {
    getQuery();
  }, []);


  // getQuery functionality still needs to be determined based on user login info
  const getQuery = () => {
    const url = `/user/allQueries`
    fetch(url)
      .then(data => data.json())
      .then(data => {
        setQueryCard([...data]);
      })
      .catch((err) => console.log('err', err));
  }

  // deleteQuery functionality works - just need to test once we have proper user connection
  const deleteQuery = (query_id) => {
    fetch(`/query/deleteQuery/${query_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        const queryCopy = [...queryCard];
        queryCopy.splice(query_id, 1);
        setQueryCard(queryCopy);
        setSchema('');
        getQuery();
      })
  }

  // getSchema function that fetches schema from database and populates schemaWindow CodeMirror component
  const getSchema = (query_id) => {
    const url = `/query/getQuery/${query_id}`;
    fetch(url)
      .then(data => data.json())
      .then(data => {
        setSchema(data.value);
        setCurrentQueryId(query_id);
      })
  }

  const createQuery = (schema_value) => {
    const url = `/query/createQuery`
    fetch(url, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: schema_value
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        getQuery();
      })
  }

  return (
    <div className='Dashboard'>
      <header>
        <div className='topright'>
          <img src={isDarkTheme ? SQuriL_logo_white : SQuriL_logo_black} alt='logo' className='dash-logo' />
        </div>
        <URIInput
          uri={uri}
          setUri={setUri}
        />
        <span>
          {isDarkTheme ? 'dark mode' : 'light mode'}
          <IconButton sx={{ ml: 1 }} size='small' onClick={changeTheme} color='inherit'>
            {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </span>
      </header>
      <div className='main'>
        <QueryContainer
          // drilling down of things happens here
          queryCard={queryCard}
          deleteQuery={deleteQuery}
          getSchema={getSchema}
          isDarkTheme={isDarkTheme}

        />
        <SchemaContainer
          onChange={setSchema} // to use in the save and update buttons in SchemaContainer?
          value={schema}
          currentQueryId={currentQueryId}
          createQuery={createQuery}
          isDarkTheme={isDarkTheme}

        />
        {/* <OutputContainer
       setOutput={setOutput}
       output={output}
     /> */}
      </div>
      <br></br>
      {/* <a href='https://github.com/oslabs-beta/SQuriL'>
        <img src={isDarkTheme ? github_white : github_black} alt='logo' className='github' />
      </a> */}
    </div>
  );
}

export default Dashboard;