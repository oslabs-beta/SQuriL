import React from 'react';
import LogoLanding from './LogoLanding';
import OAuth from './OAuth';
import styles from '../Styles/Landing.css'

// create a component that serves as login button and fx
function Landing (props) {
    return(
        <div className="Landing">
            <div className='Landing-inner'>
        <LogoLanding />    
        <OAuth />
        </div>
        </div>
    )
}

export default Landing;