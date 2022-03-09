import React from 'react';
import OutputWindow from './OutputWindow';
import styles from '../Styles/OutputContainer.css'
import { Button } from '@mui/material';


function OutputContainer(props) {


    return (
        <div className='OutputContainer'>
            {/* <OutputWindow /> */}
            <span>
                <h4>Output</h4>
                <Button variant="contained" type='submit' className='submitButtons' value="Query">Query</Button>
            </span>
        </div>
    )

}

export default OutputContainer;