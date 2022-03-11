import React from 'react';
import OutputWindow from './OutputWindow';
import styles from '../Styles/OutputContainer.css'
import { Button } from '@mui/material';


function OutputContainer(props) {
    const { output, setOutput } = props;
    return (
        <div className='OutputContainer'>
            <span>
            <h4>Output</h4>
            <Button variant="contained" type='submit' className='submitButtons' value="Query">Query</Button>
            </span>
        <OutputWindow
            onChange={setOutput}
            value={output}
        />
        </div>
    )

}

export default OutputContainer;