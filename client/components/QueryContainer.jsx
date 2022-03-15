import React from 'react';
import QueryCard from './QueryCard';
import '../Styles/QueryContainer.css'

function QueryContainer(props) {
    const queryList = [];
    const { queryCard, deleteQuery, getSchema, isDarkTheme, } = props;
    //iterate through props.queryCard
    for (let i = 0; i < queryCard.length; i++) {
        queryList.push(<QueryCard
                        key={queryCard[i]}
                        queryCard={queryCard[i]}
                        deleteQuery={deleteQuery}
                        getSchema={getSchema}
                        />)
    }

    return (
        <div className='query-container' style={isDarkTheme ? {border: '1px solid white'} : {border: '1px solid black'}}>
            <div className='QueryContainerHeader'>
          <h3>Queries</h3>
          </div>
          <br></br>
          {queryList}
        </div>
    )
}

export default QueryContainer;