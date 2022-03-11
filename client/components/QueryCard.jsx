import React from 'react';
import '../Styles/QueryContainer.css'


function QueryCard(props) {
    return (
        <div className='QueryCard'>
            <h4 style={{ cursor: 'pointer ' }}>
                {props.queryCard}
            <button
            type="button"
            variant='text'
            size='small'
            className='deleteQuery'
            onClick={() => props.deleteQuery(props.query_id)}
            >X
            </button>
            </h4>
        </div>
    );
}


export default QueryCard;