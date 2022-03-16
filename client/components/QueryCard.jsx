import React, { useState } from 'react';
import { Button } from '@mui/material';
import '../Styles/QueryContainer.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

function QueryCard(props) {
    const { queryCard, getSchema, deleteQuery, currentQueryId } = props;

    return (
        <div className='QueryCard'>
            <h4
            style={currentQueryId === queryCard ? {fontWeight: 'bolder', textDecoration: 'underline'} : {fontWeight: 'normal'}}
            onClick={() => getSchema(queryCard)}
            >
                    {`Schema ${queryCard}`}
                <IconButton
                    type="button"
                    style={{ marginLeft: '20px' }}
                    variant='text'
                    color='primary'
                    size='small'
                    className='delete-Query'
                    onClick={() => {
                        deleteQuery(queryCard)
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </h4>
            <Divider />
        </div>
    );
}


export default QueryCard;