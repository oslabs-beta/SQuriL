import React from 'react';
import QueryCard from './QueryCard';
import '../Styles/QueryContainer.css'

function QueryContainer(props) {
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
        <div className='query-container' style={isDarkTheme ? {border: '2px solid rgb(125, 54, 175)'} : {border: '2px solid black'}}>
            <div className='QueryContainerHeader'>
          <h2>Schema List</h2>
          </div>
          <br></br>
          {queryList}
        </div>
    )
}

export default QueryContainer;