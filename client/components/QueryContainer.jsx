import React from 'react';
import PropTypes from 'prop-types';
import QueryCard from './QueryCard';
import '../Styles/QueryContainer.css';
import { borderRadius } from '@mui/system';

function QueryContainer(props) {
  // array of QueryCard components
  const queryList = [];
  const { queryCard, deleteQuery, getSchema, isDarkTheme, currentQueryId, setCurrentQueryId } = props;
  // iterate through props.queryCard
  for (let i = 0; i < queryCard.length; i += 1) {
    queryList.push(
      <QueryCard
        key={queryCard[i]}
        queryCard={queryCard[i]}
        setCurrentQueryId={setCurrentQueryId}
        deleteQuery={deleteQuery}
        getSchema={getSchema}
        currentQueryId={currentQueryId}
      />
    );
  }

  return (
    <div
      className='query-container'
      style={isDarkTheme ? { background: 'rgba(255, 255, 255, 0.3)', borderRadius: '25px' } : { border: '1px solid black' }}
      data-testid='query-container'
    >
      <div className='QueryContainerHeader'>
        <h3>Schema List</h3>
      </div>
      <br />
      {queryList}
    </div>
  );
}

QueryContainer.propTypes = {
  queryCard: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  getSchema: PropTypes.func,
  deleteQuery: PropTypes.func,
  currentQueryId: PropTypes.number,
  isDarkTheme: PropTypes.bool,
  setCurrentQueryId: PropTypes.func,
};

export default QueryContainer;
