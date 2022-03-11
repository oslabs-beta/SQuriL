import React from 'react';
import { Button } from '@mui/material'
import styles from '../Styles/QueryContainer.css'


function QueryCard(props) {
    return (
        <div className='QueryCard'>
            <h4 style={{ cursor: 'pointer ' }}>
                {props.queryCard}
            <Button
            variant='text'
            size='small'
            className='deleteQuery'
            onClick={() => props.deleteQuery(props.query_id)}
            >X
            </Button>
            </h4>
        </div>
    );
}


export default QueryCard;