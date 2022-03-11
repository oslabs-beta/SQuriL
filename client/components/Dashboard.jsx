import React, { useState, useEffect } from 'react';
import QueryContainer from './QueryContainer';
import SchemaContainer from './SchemaContainer';
import URIInput from './URIInput';
import Landing from './Landing';
import OutputContainer from './OutputContainer';
import OAuth from './OAuth';
import '../Styles/Dashboard.css'
import logo from '../Public/logo.png'
import { useCookies } from 'react-cookie';



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
  // cookie hook
  const [ cookies, setCookie ]= useCookies([])

  // const userCookie = Object.keys(cookies)[0];
  const userCookie = 'testUser';
  // console.log(userCookie);

    useEffect(() => {
    getQuery();
  })
  

  // // this is where we will put our CRUD functions

  // getQuery functionality still needs to be determined based on user login info
  const getQuery = () => {
    const url = `http://localhost:3000/allQueries/${userCookie}` // changed to username as param
    fetch(url)
      .then(data => data.json())
      .then(data => {
        console.log(data);
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
      const queryCopy = {...queryCard};
      delete queryCopy[query_id];
      setQueryCard(queryCopy);
    })
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
          />
        <SchemaContainer
          setSchema={setSchema}
          schema={schema}
        />
        <OutputContainer
          setOutput={setOutput}
          output={output}
        />
      </div>
    </div>
  );
}

export default Dashboard;