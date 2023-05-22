import React from 'react';
import ReactLoading from 'react-loading';
import '../Styles/SchemaContainer.css';

interface LoadingProps {
  isDarkTheme?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isDarkTheme }) => {
  return (
    <div className='loading'>
      <ReactLoading type='bars' color={isDarkTheme ? 'rgb(72, 20, 155)' : '#aedb95'} />
    </div>
  );
};

export default Loading;
