import React from 'react';
import OutputWindow from './OutputWindow';
import '../Styles/OutputContainer.css'


function OutputContainer(props) {
    const { output, setOutput } = props;
    return (
        <div className='OutputContainer'>
            <span>
            <h4>Output</h4>
            <button type='submit' className='graphQLSubmit' value="Query">Query</button>
            </span>
        <OutputWindow
            onChange={setOutput}
            value={output}
        />
        </div>
    )

}

export default OutputContainer;