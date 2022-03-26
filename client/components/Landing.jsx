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
import '../Styles/App.css';

function Landing(props) {
  // grab probs from App
  const { isDarkTheme, changeTheme } = props;

  return (
    <div className="App">
      <div className="logos">
        <a href="https://github.com/oslabs-beta/SQuriL">
          <img
            src={isDarkTheme ? github_white : github_black}
            alt="logo"
            className="github"
          />
        </a>
        <a href="https://graphql.org/learn/">
          <img src={graphql_logo} alt="graphql" className="graphql" />
        </a>
      </div>
      <span>
        {isDarkTheme ? 'dark mode' : 'light mode'}
        <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
          {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </span>
      <div
        className="app-welcome"
        style={
          isDarkTheme
            ? { border: '2px solid white' }
            : { border: '2px solid black' }
        }
      >
        <img
          src={isDarkTheme ? SQuriLts_logos_white : squirltsLogosBlack}
          alt="logo"
          className="logo"
        />
        <OAuth />
      </div>
    </div>
  );
}

Landing.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default Landing;
