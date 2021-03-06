import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import '../Styles/QueryContainer.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

function QueryCard(props) {
  const { queryCard, getSchema, deleteQuery, currentQueryId, setCurrentQueryId } = props;

  return (
    <div className='QueryCard' data-testid='query-card'>
      <Button
        sx={{ borderRadius: 12.5, padding: '0px, 20px, 0px, 20px' }}
        data-testid='query-card-h3'
        color='secondary'
        size='small'
        variant='contained'
        style={currentQueryId === queryCard ? { fontWeight: 'bold', textDecoration: 'underline' } : { fontWeight: 'bold' }}
        onClick={() => getSchema(queryCard)}
      >
        {`Schema ${queryCard}`}
      </Button>
      <IconButton
        type='button'
        data-testid='query-delete'
        style={{ marginLeft: '20px' }}
        variant='text'
        // color='secondary'
        size='small'
        className='delete-Query'
        onClick={() => {
          deleteQuery(queryCard);
          setCurrentQueryId(0);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

QueryCard.propTypes = {
  queryCard: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getSchema: PropTypes.func,
  deleteQuery: PropTypes.func,
  currentQueryId: PropTypes.number,
  setCurrentQueryId: PropTypes.func,
};

export default QueryCard;
