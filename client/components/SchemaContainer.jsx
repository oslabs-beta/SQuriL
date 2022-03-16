import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Loading from './Loading'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/mode/javascript/javascript';
import '../Styles/SchemaContainer.css'
import { Controlled } from 'react-codemirror2';
import { SampleGQLServerCode } from '/server/sampleDB.js'

function SchemaContainer(props) {
    // schemawindow prop to be passed down
    let { value, onChange, currentQueryId, createQuery, isDarkTheme, queryCard, loading, setLoading } = props;
    const [sample, setSample] = useState(false);
    // const [loading, setLoading] = useState(false);


    function handleChange(editor, data, value) {
        onChange(value);
    }

    function handleSubmit(e) {
        createQuery(value);
    }

    const exportCode = () => {
        saveAs(new File([`${value}`], 'schemaExport.js', { type: 'text/plain;charset=utf-8' }))
    }

    function loadingFunc() {
        setTimeout(() => setLoading(false), 2000)
        onChange(SampleGQLServerCode)
    };

    return (
        <div className='SchemaContainer' style={isDarkTheme ? { border: '2px solid rgb(72, 20, 155)' } : { border: '2px solid black' }}>
            <h3>{currentQueryId ? `Schema ${currentQueryId}` : 'Schema'}</h3>
            <span>
                <Button
                    type='button'
                    className='save-schema'
                    variant='contained'
                    onClick={(e) => handleSubmit()}>
                    Save
                </Button>
                {' '}
                {/* <button type='submit' className='updateSchema' value="Update">Update</button> */}
                <Button
                    type='button'
                    className='sample-schema'
                    variant='contained'
                    onClick={(e) => {
                        setLoading(true);
                        loadingFunc();
                    }}>
                    Sample
                </Button>
                {' '}
                <Button
                    variant='outlined'
                    onClick={() => { exportCode(); }}
                >
                    Export
                </Button>
            </span>
            <FormControlLabel control={<Switch />} label="TypeScript" className='switch'/>
            {loading === false ? (
                <Controlled
                    onBeforeChange={handleChange}
                    value={sample ? SampleGQLServerCode : value}
                    className='schemaWindow-wrapper'
                    options={{
                        lineWrapping: true,
                        showCursorWhenSelecting: true,
                        scrollbarStyle: null,
                        lint: true,
                        mode: 'javascript',
                        lineNumbers: true,
                        theme: (isDarkTheme ? 'duotone-dark' : 'cobalt')
                    }}
                />
            ) : (
                <Loading />
            )
            }
        </div>
    )
}

export default SchemaContainer;