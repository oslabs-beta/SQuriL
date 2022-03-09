import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import QueryContainer from './QueryContainer';
import SchemaContainer from './SchemaContainer';
import URIInput from './URIInput';
import Landing from './Landing';
import OutputContainer from './OutputContainer';
import Logo from './Logo';

// function which sets the state
function Dashboard() {
  // all the queries which are shown in the QueryContainer
  // right now, the initial state is set to a test sample of Query topics - will be an empy object
  const [ queryCard, setQueryCard ] = useState({1: 'Query A', 2: 'Query B', 3: 'Query C'});
  // set state for schema window of a given query card
  const [ schema, setSchema ] = useState();
  // set state for the output window of a submitted query
  const [ output, setOutput ] = useState();
  // set state for uri address bar at the top of the screen
  const [ uri, setUri ] = useState();
  // the current query id that the user has selected
  const [ currentQueryId, setCurrentQueryId ] = useState();
 
// this is where we will put our CRUD functions

  return (
    <div className='Dashboard'>
      <header>
        {/* <h1 id='mainTitle' className='squrilTitle'>SQuriL🐿️</h1>
        <p id='subTitle' className='Tagline'>Tagline goes here</p>
        {/* boilerplate logic for login/logout button, this will live in upper right corner of screen */}
        {/* {typeof queryCard !== 'object' ? <OAuth /> */}
        {/* // what is href in our case?  Check with backend team. */}
         {/* : <Button variant='outlined' href='/logout'>Log out</Button>} */}
        </header>
        <div className='containers'>
          {typeof queryCard === 'object' && 
          <QueryContainer
          // drilling down of things happens here
            queryCard={queryCard}
          />
         }
         {/* {currentQueryId && typeof queryCard === 'object' &&
         <SchemaContainer 
          // drilling down of things happens here
         />
         } */}
         </div>
        </div>
  );
}

export default Dashboard;