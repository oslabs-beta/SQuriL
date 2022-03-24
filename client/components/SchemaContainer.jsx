import React, { useState, useEffect } from 'react';
import { TextField, Button, autocompleteClasses } from '@mui/material';
import Loading from './Loading'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/mode/javascript/javascript';
import '../Styles/SchemaContainer.css'
import { Controlled } from 'react-codemirror2';
import { SampleGQLServerCode } from '/home/mtrapani/SQuriL/server/sampleDB.js'

function SchemaContainer(props) {
    // schemawindow prop to be passed down
    let { value, onChange, currentQueryId, createQuery, isDarkTheme, queryCard, loading, setLoading } = props;
    const [sample, setSample] = useState(false);
    const [open, setOpen] = useState(false);
    // const [loading, setLoading] = useState(false);

    // tooltip function close - copy button
    const handleTooltipClose = () => {
        setOpen(false);
    }

    // tooltip function open - copy button
    const handleTooltipOpen = () => {
        setOpen(true);
    }

    // handleChange function for code-mirror editor window
    function handleChange(editor, data, value) {
        onChange(value);
    }

    // save schema functionality
    function handleSubmit(e) {
        createQuery(value);
    }

    // export code functionality
    const exportCode = () => {
        saveAs(new File([`${value}`], 'schemaExport.js', { type: 'text/plain;charset=utf-8' }))
    }

    // purple bar loading in schema container
    function loadingFunc() {
        setTimeout(() => setLoading(false), 2000)
        onChange(SampleGQLServerCode)
    };

    return (
        <div
        className='SchemaContainer'
        style={isDarkTheme ? { border: '2px solid rgb(72, 20, 155)' } : { border: '2px solid black' }}
        data-testid='schema-container'
        >
            <h2>{currentQueryId ? `Schema ${currentQueryId}` : 'Schema'}</h2>
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
                {' '}
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                placement='top'
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Copied to clipboard"
                                >
                                <Button
                                    variant='outlined'
                                    onClick={(e) => {
                                        setOpen(true)
                                        navigator.clipboard.writeText(value);
                                        setTimeout(() => setOpen(false), 1000)
                                        }}>
                                    Copy
                                </Button>
                            </Tooltip>
                    </ClickAwayListener>
            </span>
            <FormControlLabel control={<Switch />} label="TypeScript" className='switch' />
            {loading === false ? (
                <Controlled
                    onBeforeChange={handleChange}
                    value={sample ? SampleGQLServerCode : value}
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