import React, { useState, useEffect } from 'react';
import QueryContainer from './QueryContainer';
import SchemaContainer from './SchemaContainer';
import URIInput from './URIInput';
import { saveAs } from 'file-saver';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import graphql_logo from '../Public/graphql_logo.png'
import LoadingLogo from './LoadingLogo'
import IconButton from '@mui/material/IconButton';
import '../Styles/Dashboard.css';
import SQuriLts_logos_black from '../Public/SQuriLts_logos_black.png';
import SQuriLts_logos_white from '../Public/SQuriLts_logos_white.png';
import github_white from '../Public/github_white.png'
import github_black from '../Public/github_black.png'

function Dashboard(props) {
  // pulling from props
  const { isDarkTheme, changeTheme, light, dark } = props;
  // all the queries which are shown in the QueryContainer
  const [queryCard, setQueryCard] = useState([]);
  // set state for schema window of a given query card
  const [schema, setSchema] = useState('');
  // set state for the output window of a submitted query
  const [output, setOutput] = useState();
  // set state for uri address bar at the top of the screen
  const [uri, setUri] = useState('');
  // the current query id that the user has selected
  const [currentQueryId, setCurrentQueryId] = useState();
  // state for main loading screen
  const [isLoaded, setLoaded] = useState(false);
  // state for loading schema
  const [loading, setLoading] = useState(false);

  // loads querycards on page load ([] = just once)
  useEffect(() => {
    setTimeout(() => setLoaded(true), 3500)
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
        // const queryCopy = [...queryCard];
        // queryCopy.splice(query_id, 1);
        // setQueryCard(queryCopy);
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

  // createQuery function that saves Schema to DB
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

  const createGQLSchema = (uri_addr) => {
    const url = `/api/createGqlSchema`
    fetch(url, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: uri_addr
      })
    })
    .then(data => data.json())
    .then(data => {
      const GQL = data;
      setSchema(GQL)
    })
  }

  return (
    <>
      {isLoaded === false ? (
        <LoadingLogo />
      ) : (
        <div
        className='Dashboard'
        data-testid='dashboard'
        >
          <header>
            <div className='topright'>
              <img src={isDarkTheme ? SQuriLts_logos_white : SQuriLts_logos_black} alt='logo' className='dash-logo' />
            </div>
            <URIInput
              createGQLSchema={createGQLSchema}            
              value={schema}
              onChange={setSchema}
              uri={uri}
              setUri={setUri}
              loading={loading}
              setLoading={setLoading}
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
              currentQueryId={currentQueryId}

            />
            <SchemaContainer
              onChange={setSchema} // to use in the save and update buttons in SchemaContainer?
              value={schema}
              currentQueryId={currentQueryId}
              createQuery={createQuery}
              isDarkTheme={isDarkTheme}
              queryCard={queryCard}
              loading={loading}
              setLoading={setLoading}
            />
            {/* <OutputContainer
       setOutput={setOutput}
       output={output}
     /> */}
          </div>
          <br></br>
          <footer>
            <a href='https://github.com/oslabs-beta/SQuriL'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='github' />
            </a>
            <a href='https://graphql.org/learn/'>
              <img src={graphql_logo} alt='graphql' className='graphql' style={{ marginLeft: '10px' }} />
            </a>
          </footer>
        </div>
      )}
    </>
  );
}

export default Dashboard;