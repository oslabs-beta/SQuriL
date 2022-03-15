import React from 'react';
import '../Styles/QueryContainer.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function QueryCard(props) {
    const { queryCard, getSchema, deleteQuery } = props;
    return (
        <div className='QueryCard'>
            <h4 style={{ cursor: 'pointer ' }}>
                <span onClick={() => getSchema(queryCard)}>
                    {`Query ${queryCard}`}
                </span>
                <IconButton
                    aria-label='delete'
                    type="button"
                    variant='text'
                    size='small'
                    className='delete-Query'
                    onClick={() => {
                        deleteQuery(queryCard)
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </h4>
        </div>
    );
}


export default QueryCard;