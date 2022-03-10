import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import styles from '../Styles/SchemaContainer.css'
import { Controlled } from 'react-codemirror2';

function SchemaWindow () {
    return(
        <div className='SchemaWindow'>
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

export default SchemaWindow;