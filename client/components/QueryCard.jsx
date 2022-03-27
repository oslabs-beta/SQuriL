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
        data-testid='query-card-h3'
        variant='contained'
        style={currentQueryId === queryCard ? { fontWeight: 'bolder', textDecoration: 'underline' } : { fontWeight: 'normal' }}
        onClick={() => getSchema(queryCard)}
      >
        {`Schema ${queryCard}`}
        <IconButton
          type='button'
          data-testid='query-delete'
          style={{ marginLeft: '20px' }}
          variant='text'
          color='secondary'
          size='small'
          className='delete-Query'
          onClick={() => {
            deleteQuery(queryCard);
            setCurrentQueryId(0);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Button>
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
