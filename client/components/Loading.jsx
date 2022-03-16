import React from 'react';
import ReactLoading from 'react-loading';
import '../Styles/SchemaContainer.css'

function Loading () {
    return(
        <div className='loading'>
            <ReactLoading type='cylon' color="#0288d1"/>
        </div>
    );
}

export default Loading;