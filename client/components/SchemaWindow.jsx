import React, { useState, useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import '../Styles/SchemaContainer.css'
import { Controlled } from 'react-codemirror2';
import { SampleGQLServerCode } from '/server/sambleDB.js'


function SchemaWindow(props) {
    const { value, onChange, currentQueryId } = props;
    console.log('schema state', value);
    console.log('current query ID', currentQueryId)
    // console.log('selected schema', value[currentQueryId])

    function handleChange(editor, data, value) {
        onChange(value);
    }

    return (
        <div className='SchemaWindow'>
            <span>
                <input type='text' id='queryName' name='queryName' placeholder='name your query here'></input>
                <button type='submit' className='saveSchema' value="Save">Save</button>
                <button type='submit' className='updateSchema' value="Update">Update</button>
                <button type='submit' className='sampleSchema' value="Sample">Sample</button>
            </span>
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