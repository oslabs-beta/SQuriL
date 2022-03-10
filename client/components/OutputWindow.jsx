import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import styles from '../Styles/OutputContainer.css'
import { Controlled } from 'react-codemirror2';

function OutputWindow () {
    return(
        <div className='OutputWindow'>
            <Controlled 
                // onBeforeChange={handleChange}
                value={'Hello Squirrel'}
                className='JavaScript-Wrapper'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: 'javascript',
                    lineNumbers: true,
                }}
            />

        </div>
    )
}

export default OutputWindow;