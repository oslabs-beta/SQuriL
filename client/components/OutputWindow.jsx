import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import '../Styles/OutputContainer.css'
import { Controlled } from 'react-codemirror2';

function OutputWindow(props) {
    const { value, onChange } = props;

    function handleChange(editor, data, value) {
        onChange(value);
    }

    return (
        <div className='OutputWindow'>
            <button type='submit' className='graphQLSubmit' value="Query">Query</button>
            <Controlled
                onBeforeChange={handleChange}
                value={value}
                className='JavaScript-Wrapper'
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
export default OutputWindow;