import React from 'react';
import { Button } from '@mui/material'

function QueryCard(props) {
    return (
        <div className='QueryCard'>
            <h3 style={{ cursor: 'pointer ' }}>
                {props.queryCard}
            <Button variant='text' size='small' className='deleteQuery'>X</Button>
            </h3>
        </div>
    );
}


export default QueryCard;