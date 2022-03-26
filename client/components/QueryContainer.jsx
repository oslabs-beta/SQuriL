import React from 'react';
import PropTypes from 'prop-types';
import QueryCard from './QueryCard';
import '../Styles/QueryContainer.css';

function QueryContainer(props) {
  // array of QueryCard components
  const queryList = [];
  const { queryCard, deleteQuery, getSchema, isDarkTheme, currentQueryId } = props;
  // iterate through props.queryCard
  for (let i = 0; i < queryCard.length; i += 1) {
    queryList.push(<QueryCard key={queryCard[i]} queryCard={queryCard[i]} deleteQuery={deleteQuery} getSchema={getSchema} currentQueryId={currentQueryId} />);
  }

  return (
    <div className='query-container' style={isDarkTheme ? { border: '1px solid rgb(189,0,255)' } : { border: '1px solid black' }} data-testid='query-container'>
      <div className='QueryContainerHeader'>
        <h2>Schema List</h2>
      </div>
      <br />
      {queryList}
    </div>
  );
}

QueryContainer.defaultProps = {
  queryCard: [''],
  currentQueryId: 0,
};
QueryContainer.propTypes = {
  queryCard: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  getSchema: PropTypes.func.isRequired,
  deleteQuery: PropTypes.func.isRequired,
  currentQueryId: PropTypes.number,
  isDarkTheme: PropTypes.bool.isRequired,
};

export default QueryContainer;
