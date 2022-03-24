import React from 'react';
import styled, { keyframes } from 'styled-components';
import { tada } from 'react-animations';
import SQuriLts_logos_white_loading from '../Public/SQuriLts_logos_white_loading.png';
import '../Styles/App.css'

const Pulse = styled.div`animation: 2s ${keyframes`${tada}`} infinite`;

function LoadingLogo () {
    return(
        <div className='loading'>
            <Pulse><img src={SQuriLts_logos_white_loading} className='logo-load' /></Pulse>
        </div>
    );
}

export default LoadingLogo;