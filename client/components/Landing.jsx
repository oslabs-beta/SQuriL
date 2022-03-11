import React from 'react';
import LogoLanding from './LogoLanding';
import OAuth from './OAuth';

// create a component that serves as login button and fx
function Landing(props) {
    return (
        <div className="Landing">
            <LogoLanding />
            <div className='Tagline'>
        <h3>Stach your Cache</h3>
        </div>   
        <OAuth />
        </div > 
    )
}

export default Landing;