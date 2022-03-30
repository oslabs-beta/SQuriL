import React from 'react';
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-btn';
import OAuth from './OAuth';
import squirltsLogosBlack2 from '../Public/squirltsLogosBlack2.png';
import SQuriLts_logos_white2 from '../Public/SQuriLts_logos_white2.png';
import github_white from '../Public/github_white.png';
import github_black from '../Public/github_black.png';
import squrilGif1 from '../Public/squrilGif1.gif';
import squrilGif2 from '../Public/squrilGif2.gif';
import squrilGif3 from '../Public/squrilGif3.gif';
import squrilGif4 from '../Public/squrilGif4.gif';
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
      <img src={isDarkTheme ? SQuriLts_logos_white2 : squirltsLogosBlack2} alt='logo' className='' />
      <GitHubButton
        href='https://github.com/oslabs-beta/SQuriL'
        target='_blank'
        data-icon='octicon-star'
        data-size='large'
        data-show-count='true'
        aria-label='Star oslabs-beta/SQuriL on GitHub'
      >
        Star
      </GitHubButton>
      <div className='squril-info'>
        <h2>
          Meet SQuriL.ts, an open source GraphQL schema generation and storage tool that creates customized, production-ready GraphQL schemas from a PostgreSQL
          URI for both JavaScript and TypeScript compatible environments.
        </h2>
      </div>
      <div className='app-welcome' style={isDarkTheme ? { background: '#212121', borderRadius: '25px' } : { background: '#fff', borderRadius: '25px' }}>
        <h2>Login with your GitHub Account</h2>
        <OAuth />
      </div>
      <div className='getting-started'>
        <div className='item'>
          <h1>Getting Started</h1>
          <h2>Sign In Using GitHub OAuth</h2>
          <h3>
            No need to create a new username and password - users simply login with their already established GitHub accounts through SQuriL&apos;s GitHub OAuth
            option on the main landing page.
          </h3>
          <img src={squrilGif1} alt='landing-page' className='instruction-photo' />
        </div>
        <div className='item'>
          <h2>Link Your Database and Generate Your GraphQL Schema</h2>
          <h3>
            Simply copy and paste your PostgreSQL URI into the address bar at the top of the application dashboard page and hit -Go- Within seconds, both your
            JavaScript and TypeScript compatible GraphQL schema code will be populated within the application&apos;s code windows.
          </h3>
          <img src={squrilGif2} alt='landing-page' className='instruction-photo' />
        </div>
        <div className='item'>
          <h2>Save Your Schema</h2>
          <h3>Once generated, both JavaScript and TypeScript schemas can be saved by users for future database querying needs.</h3>
          <img src={squrilGif3} alt='landing-page' className='instruction-photo' />
        </div>
        <div className='item'>
          <h2>Copy or Export Your Code</h2>
          <h3>
            With a simple click, users can both copy their code to clipboard for immediate use or export their schema code to .js and .ts files for local
            storage.
          </h3>
          <img src={squrilGif4} alt='landing-page' className='instruction-photo' />
        </div>
      </div>
      <h2>Connect With Team SQuriL</h2>
      <div className='meet-the-team'>
        <div className='team-members'>
          <img src={Diana} className='photo' alt='Diana' />
          <h3>Diana Kim</h3>
          <span>
            <a href='https://github.com/ruslanovna' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/ruslanovna/' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
        <div className='team-members'>
          <img src={Frank} className='photo' alt='Frank' />
          <h3>Frank Nguyen</h3>
          <span>
            <a href='https://github.com/frankknguyen' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/frankknguyen/' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
        <div className='team-members'>
          <img src={Mark} className='photo' alt='Mark' />
          <h3>Mark Charles Smith</h3>
          <span>
            <a href='https://github.com/markcharlessmith' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/mark-charles-smith/' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
        <div className='team-members'>
          <img src={Michael} className='photo' alt='Michael' />
          <h3>Michael Trapani</h3>
          <span>
            <a href='https://github.com/michaeltraps' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? github_white : github_black} alt='logo' className='logos' />
            </a>
            <a href='https://www.linkedin.com/in/michael-a-trapani/' target='_blank' rel='noreferrer'>
              <img src={isDarkTheme ? liWhite : liBlack} alt='linkedin-logo' className='logos' />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default Landing;
