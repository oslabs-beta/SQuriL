import React from 'react';
import LogoLanding from './LogoLanding';
import OAuth from './OAuth';
import styles from '../Styles/Landing.css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// create a component that serves as login button and fx
function Landing(props) {
    return (
        <div className="Landing">
            <LogoLanding />
            {/* <div className='Tagline'>
        <h3>Stach your Cache</h3>
        </div>   
        <OAuth /> */}
 <SyntaxHighlighter language="javascript" style={docco}>
     {'hello world'}
    </SyntaxHighlighter>
        </div > 
    )
}

export default Landing;