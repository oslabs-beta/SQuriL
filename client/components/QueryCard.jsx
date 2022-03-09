import React from 'react';
import { Button } from '@mui/material'
import styles from '../Styles/QueryContainer.css'


function QueryCard(props) {
    return (
        <div className='QueryCard'>
            <h4 style={{ cursor: 'pointer ' }}>
                {props.queryCard}
            <Button variant='text' size='small' color='inherit' className='deleteQuery'>X</Button>
            </h4>
        </div>
    );
}


export default QueryCard;