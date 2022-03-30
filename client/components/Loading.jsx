import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import '../Styles/SchemaContainer.css';

function Loading(props) {
  const { isDarkTheme } = props;
  return (
    <div className='loading'>
      <ReactLoading type='bars' color={isDarkTheme ? 'rgb(72, 20, 155)' : '#aedb95'} />
    </div>
  );
}

Loading.propTypes = {
  isDarkTheme: PropTypes.bool,
};

export default Loading;
