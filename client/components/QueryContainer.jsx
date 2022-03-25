import React from 'react';
import QueryCard from './QueryCard';
import '../Styles/QueryContainer.css'

function QueryContainer(props) {
    // array of QueryCard components
    const queryList = [];
    const { queryCard, deleteQuery, getSchema, isDarkTheme, currentQueryId } = props;
    //iterate through props.queryCard
    for (let i = 0; i < queryCard.length; i++) {
        queryList.push(<QueryCard
                        key={queryCard[i]}
                        queryCard={queryCard[i]}
                        deleteQuery={deleteQuery}
                        getSchema={getSchema}
                        currentQueryId={currentQueryId}
                        />)
    }

    return (
        <div
        className='query-container'
        style={isDarkTheme ? {border: '1px solid rgb(189,0,255)'} : {border: '1px solid black'}}
        data-testid='query-container'
        >
            <div className='QueryContainerHeader'>
          <h2>Schema List</h2>
          </div>
          <br></br>
          {queryList}
        </div>
    )
}

export default QueryContainer;