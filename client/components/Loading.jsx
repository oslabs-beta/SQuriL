import React from 'react';
import ReactLoading from 'react-loading';
import '../Styles/SchemaContainer.css';

function Loading() {
  return (
    <div className='loading'>
      <ReactLoading type='bars' color='rgb(72, 20, 155)' />
    </div>
  );
}

export default Loading;
