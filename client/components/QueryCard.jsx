import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from '@mui/material';
import '../Styles/QueryContainer.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

function QueryCard(props) {
  const { queryCard, getSchema, deleteQuery, currentQueryId } = props;

  return (
    <div className='QueryCard' data-testid='query-card'>
      <h3
        data-testid='query-card-h3'
        style={currentQueryId === queryCard ? { fontWeight: 'bolder', textDecoration: 'underline' } : { fontWeight: 'normal' }}
        onClick={() => getSchema(queryCard)}
      >
        {`Schema ${queryCard}`}
        <IconButton
          type='button'
          data-testid='query-delete'
          style={{ marginLeft: '20px' }}
          variant='text'
          color='primary'
          size='small'
          className='delete-Query'
          onClick={() => {
            deleteQuery(queryCard);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </h3>
      <Divider />
    </div>
  );
}

QueryCard.defaultProps = {
  queryCard: [''],
};

QueryCard.propTypes = {
  queryCard: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getSchema: PropTypes.func.isRequired,
  deleteQuery: PropTypes.func.isRequired,
  currentQueryId: PropTypes.number.isRequired,
};

export default QueryCard;
