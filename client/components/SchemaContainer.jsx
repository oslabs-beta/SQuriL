import React, { useState, useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import '../Styles/SchemaContainer.css'
import { Controlled } from 'react-codemirror2';
import { SampleGQLServerCode } from '/server/sambleDB.js'

function SchemaContainer(props) {
// schemawindow prop to be passed down
    let { value, onChange, currentQueryId, createQuery } = props;
    const [ sample, setSample ] = useState(false);

    function handleChange(editor, data, value) {
        onChange(value);
        console.log(value);
    }

    function handleSubmit (e) {
        // e.preventDefault();
        props.createQuery(value);
    }

    return(
            <div className='SchemaContainer'>
                <h4>Schema</h4>
                <span>
                {/* <input type='text' id='queryName' name='queryName' placeholder='name your query here'></input> */}
                <button type='submit' className='saveSchema' value="Save" onClick={(e) => handleSubmit()}>Save</button>
                {/* <button type='submit' className='saveSchema' value="Save" onClick={() => console.log(value)}>Save</button> */}
                {/* <button type='submit' className='updateSchema' value="Update">Update</button> */}
                <button type='submit' className='sampleSchema' value="Sample" onClick={(e) => setSample(true)}>Sample</button>
            </span>
            <Controlled
                onBeforeChange={handleChange}
                value={ sample ? SampleGQLServerCode : value}
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

export default SchemaContainer;