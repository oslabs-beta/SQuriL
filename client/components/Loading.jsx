import React from 'react';
import ReactLoading from 'react-loading';
import '../Styles/Landing.css'

function Loading () {
    return(
        <div className='loader'>
            <ReactLoading type='cylon' color="#0288d1" height={100} width={100}/>
        </div>
    );
}

export default Loading;