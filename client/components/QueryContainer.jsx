import React from 'react';
import QueryCard from './QueryCard';
import '../Styles/QueryContainer.css'

function QueryContainer(props) {
    const queryList = [];
    //iterate through props.queryCard
    for (const query_id in props.queryCard) {
        queryList.push(<QueryCard
                        key={query_id}
                        queryCard={props.queryCard[query_id]}
                        query_id={query_id}
                        deleteQuery={props.deleteQuery}
                        getSchema={props.getSchema}
                        />)
    }

    return (
        <div className='QueryContainer'>
            <div className='QueryContainerHeader'>
          <h3>Queries</h3>
          </div>
          <br></br>
          {queryList}
        </div>
    )
}

export default QueryContainer;