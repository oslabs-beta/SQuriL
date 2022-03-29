import React from 'react';
import PropTypes from 'prop-types';
// import Dashboard from './Dashboard';
// import { Button, CssBaseline } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import OAuth from './OAuth';
import squirltsLogosBlack from '../Public/squirltsLogosBlack.png';
import SQuriLts_logos_white from '../Public/SQuriLts_logos_white.png';
import github_white from '../Public/github_white.png';
import github_black from '../Public/github_black.png';
import graphql_logo from '../Public/graphql_logo.png';
import Mark from '../Public/Mark.jpg';
import Frank from '../Public/Frank.jpg';
import Diana from '../Public/Diana.jpg';
import liBlack from '../Public/liBlack.png';
import liWhite from '../Public/liWhite.png';
import Michael from '../Public/Michael.jpg';
import '../Styles/Landing.css';

function Landing(props) {
  // grab probs from App
  const { isDarkTheme, changeTheme } = props;

  return (
    <div className='Landing'>
      <span>
        {isDarkTheme ? 'dark mode' : 'light mode'}
        <IconButton className='switch' sx={{ ml: 1 }} onClick={changeTheme} color='inherit'>
          {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </span>
      <img src={isDarkTheme ? SQuriLts_logos_white : squirltsLogosBlack} alt='logo' className='logo' />
      <div className='squril-info'>
        <h1>
          Meet SQuriL.ts, an open source GraphQL schema generation and storage tool that creates customized, production-ready GraphQL schemas from a PostgreSQL
          URI for both JavaScript and TypeScript compatible environments.
        </h1>
      </div>
      <div className='app-welcome' style={isDarkTheme ? { background: '#212121', borderRadius: '25px' } : { background: '#fff', borderRadius: '25px' }}>
        <h2>Login with your GitHub Account</h2>
        <OAuth />
      </div>
      <h2>Connect With Team SQuriL</h2>
      <div className='meet-the-team'>
        <div className='team-members'>
          <img src={Diana} className='photo' alt='Diana' />
          <h3>Diana Kim</h3>
          <span>
            <a href='https://github.com/ruslanovna'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/ruslanovna/'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
        <div className='team-members'>
          <img src={Frank} className='photo' alt='Frank' />
          <h3>Frank Nguyen</h3>
          <span>
            <a href='https://github.com/frankknguyen'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/frankknguyen/'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
        <div className='team-members'>
          <img src={Mark} className='photo' alt='Mark' />
          <h3>Mark Charles Smith</h3>
          <span>
            <a href='https://github.com/markcharlessmith'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/mark-charles-smith/'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
        <div className='team-members'>
          <img src={Michael} className='photo' alt='Michael' />
          <h3>Michael Trapani</h3>
          <span>
            <a href='https://github.com/michaeltraps'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/michael-a-trapani/'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
      </div>
      {/* <div className='logos'>
        <a href='https://github.com/oslabs-beta/SQuriL'>
          <img src={isDarkTheme ? github_white : github_black} alt='logo' className='github' />
        </a>
        <a href='https://graphql.org/learn/'>
          <img src={graphql_logo} alt='graphql' className='graphql' />
        </a>
      </div> */}
    </div>
  );
}

Landing.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default Landing;
