import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import styles from '../Styles/SchemaContainer.css'
import { Controlled } from 'react-codemirror2';

function SchemaWindow (props) {
    const { value, onChange } = props;

    function handleChange (editor, data, value) {
        onChange(value);
    } 
    return(
        <div className='SchemaWindow'>
            <Controlled 
                onBeforeChange={handleChange}
                value={value}
                className='SchemaWindow-Wrapper'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: 'material'
                }}
            />

        </div>
    )
}

export default SchemaWindow;