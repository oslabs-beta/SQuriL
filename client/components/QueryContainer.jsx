import React from 'react';
import QueryCard from './QueryCard';

function QueryContainer(props) {
    const queryList = [];
    //iterate through props.queryCard
    for (const query_id in props.queryCard) {
        queryList.push(<QueryCard key={query_id} queryCard={props.queryCard[query_id]}/>)
    }

    return (
        <div className='QueryContainer'>
          <h2>Queries</h2>
          <br></br>
          {queryList}
        </div>
    )
}

export default QueryContainer;