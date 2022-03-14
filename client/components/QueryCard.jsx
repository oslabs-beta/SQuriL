import React from 'react';
import '../Styles/QueryContainer.css'


function QueryCard(props) {
    const { queryCard } = props;
    return (
        <div className='QueryCard'>
            <h4 style={{ cursor: 'pointer ' }}>
                {/* <span onClick={() => console.log('clickedQueryCard ', props.query_id)}> This is a test*/}
                <span onClick={() => props.getSchema(props.query_id)}>
                {`Query ${queryCard}`}
                </span>
            <button
            type="button"
            variant='text'
            size='small'
            className='deleteQuery'
            onClick={() => {
                console.log('deleted this id', queryCard)
                props.deleteQuery(queryCard)
            }}
            >X
            </button>
            </h4>
        </div>
    );
}


export default QueryCard;