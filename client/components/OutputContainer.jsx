import React from 'react';
import OutputWindow from './OutputWindow';
import '../Styles/OutputContainer.css'


function OutputContainer(props) {
    const { output, setOutput } = props;
    return (
        <div className='OutputContainer'>
            <h4>Output</h4>
        <OutputWindow
            onChange={setOutput}
            value={output}
        />
        </div>
    )

}

export default OutputContainer;