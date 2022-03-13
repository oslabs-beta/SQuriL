import React, { useState, useEffect } from 'react';
import QueryContainer from './QueryContainer';
import SchemaContainer from './SchemaContainer';
import URIInput from './URIInput';
import Landing from './Landing';
import OutputContainer from './OutputContainer';
import OAuth from './OAuth';
import '../Styles/Dashboard.css'
import logo from '../Public/logo.png'

// function which sets the state
function Dashboard() {
  // all the queries which are shown in the QueryContainer
  // right now, the initial state is set to a test sample of Query topics - will be an empy object
  const [queryCard, setQueryCard] = useState({ 1: 'Query A', 2: 'Query B', 3: 'Query C' });
  // const [queryCard, setQueryCard] = useState();
  // set state for schema window of a given query card
  const [schema, setSchema] = useState();
  // set state for the output window of a submitted query
  const [output, setOutput] = useState();
  // set state for uri address bar at the top of the screen
  const [uri, setUri] = useState();
  // the current query id that the user has selected
  const [currentQueryId, setCurrentQueryId] = useState();

  useEffect(() => {
    getQuery();
  }, []);
  
  // postQuery function (saves query)
    // logic for when user doesn't enter a name
      // if (!queryName) {queryName = `Query ${ID}`}
    // logic for when user does enter a name
      // most important* - save a queryName
    // whether named or not, creates a new queryCard in queryContainer

  // putQuery function (updates query)
  
    // getQuery functionality still needs to be determined based on user login info
  const getQuery = () => {
    const url = `http://localhost:3000/user/allQueries` // changed to username as param
    fetch(url)
      .then(data => data.json())
      .then(console.log(data))
      .then(data => {
        console.log('getQuery data return ', data);
        setQueryCard(data);
      })
      .catch((err) => console.log('err', err));
  }

  // deleteQuery functionality works - just need to test once we have proper user connection
  const deleteQuery = (query_id) => {
    fetch(`http://localhost:3000/query/deleteQuery/${query_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        console.log('deletequery ', data);
        console.log('query_id ', query_id);
        const queryCopy = { ...queryCard };
        delete queryCopy[query_id];
        setQueryCard(queryCopy);
      })
  }

  // getSchema function that fetches schema from database and populates schemaWindow CodeMirror component
  const getSchema = (query_id) => {
    const url = `http://localhost:3000/query/getQuery/${query_id}`;
    console.log('This is triggering getSchema')
    fetch(url)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setSchema(data);
        setCurrentQueryId(query_id);
      })
  }

  const postQuery = (e) => {
    // e.preventDefault();
    // fetch('http://localhost/3000/query/createQuery', {
    //   method: 'Post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //   })
    // })
    const queryCopy = {...queryCard};
    queryCopy[4] = e;
    setQueryCard(queryCopy);
    // console.log({...queryCard})
    // console.log(e);
  }

  return (
    <div className='Dashboard'>
      <header>
        <img src={logo} alt='logo' className='logo' />
        <URIInput />
        {/* {typeof queryCard !== 'object' ? <OAuth />
        : <Button className='logoutButton' variant='outlined' href='/logout'>Log out</Button>} */}
        <OAuth />
      </header>
      <div className='main'>
        <QueryContainer
          // drilling down of things happens here
          queryCard={queryCard}
          deleteQuery={deleteQuery}
          getSchema={getSchema}
          // schema={schema}
        />
        <SchemaContainer
          setSchema={setSchema} // to use in the save and update buttons in SchemaContainer?
          schema={schema}
          currentQueryId={currentQueryId}
          postQuery={postQuery}
        />
        {/* <OutputContainer
          setOutput={setOutput}
          output={output}
        /> */}
      </div>
    </div>
  );
}

export default Dashboard;