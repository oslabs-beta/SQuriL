import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import squirltsLogosBlack2 from '../Public/squirltsLogosBlack2.png';
import SQuriLts_logos_white2 from '../Public/SQuriLts_logos_white2.png';
import QueryContainer from './QueryContainer';
import SchemaContainer from './SchemaContainer';
import URIInput from './URIInput';
import LoadingLogo from './LoadingLogo';
import TSContainer from './TSContainer';
import '../Styles/Dashboard.css';

function Dashboard(props) {
  // pulling from props
  const { isDarkTheme, changeTheme } = props;
  // all the queries which are shown in the QueryContainer
  const [queryCard, setQueryCard] = useState([]);
  // set state for schema window of a given query card
  const [schema, setSchema] = useState('');
  // set state for the output window of a submitted query
  const [tsSchema, setTsSchema] = useState();
  // set state for uri address bar at the top of the screen
  const [uri, setUri] = useState('');
  // the current query id that the user has selected
  const [currentQueryId, setCurrentQueryId] = useState();
  // state for main loading screen
  const [isLoaded, setLoaded] = useState(false);
  // state for loading schema
  const [loading, setLoading] = useState(false);

  // getQuery functionality still needs to be determined based on user login info
  const getQuery = () => {
    const url = `/user/allSchemas`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setQueryCard([...data]);
      })
      .catch((err) => console.log('err', err));
  };

  // loads querycards on page load ([] = just once)
  useEffect(() => {
    setTimeout(() => setLoaded(true), 3500);
    getQuery();
  }, []);

  // deleteQuery functionality works - just need to test once we have proper user connection
  const deleteQuery = (queryId) => {
    fetch(`/schemas/deleteSchemas/${queryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setSchema('');
      setTsSchema('');
      getQuery();
    });
  };

  // getSchema function that fetches schema from database and populates schemaWindow CodeMirror component
  const getSchema = (queryId) => {
    const url = `/schemas/getSchemas/${queryId}`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setSchema(data.gqlschema);
        setTsSchema(data.tsschema);
        setCurrentQueryId(queryId);
      });
  };

  // createQuery function that saves Schema to DB
  const createQuery = (schemaValue, tsValue) => {
    const url = `/schemas/createSchemas`;
    fetch(url, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gqlSchema: schemaValue,
        tsSchema: tsValue,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        getQuery();
      });
  };

  const createGQLSchema = (uriAddr) => {
    const url = `/api/createGqlSchema`;
    fetch(url, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: uriAddr,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const GQL = data;
        setSchema(GQL);
      });
  };

  const createTsSchema = () => {
    const url = `/api/codegen`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const TsGQL = data;
        setTsSchema(TsGQL);
      });
  };

  return (
    <div>
      {isLoaded === false ? (
        <LoadingLogo />
      ) : (
        <div className='Dashboard' data-testid='dashboard'>
          <header>
            <div className='topright'>
              <img src={isDarkTheme ? SQuriLts_logos_white2 : squirltsLogosBlack2} alt='logo' className='dash-logo' />
            </div>
            <URIInput
              createGQLSchema={createGQLSchema}
              createTsSchema={createTsSchema}
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
              setCurrentQueryId={setCurrentQueryId}
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
              tsSchema={tsSchema}
            />
            <TSContainer isDarkTheme={isDarkTheme} value={tsSchema} onChange={setTsSchema} loading={loading} setLoading={setLoading} />
          </div>
          <br />
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default Dashboard;
