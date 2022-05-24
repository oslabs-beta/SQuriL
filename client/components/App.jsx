import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Landing from './Landing';
import Dashboard from './Dashboard';
import '../Styles/App.css';

// set palette for light mode
const light = {
  palette: {
    primary: {
      main: '#aedb95',
      mode: 'light',
      contrastText: '#000',
    },
    secondary: {
      main: '#fff',
      contrastText: '#000',
    },
    background: {
      default: '#f1f1f1',
    },
  },
};

// set palette for dark mode
const dark = {
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(72, 20, 155)',
    },
    secondary: {
      main: '#212121',
      contrastText: '#fff',
    },
  },
};

function App() {
  // declare state for dark theme
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  // declare state for login
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // function to change theme
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // function to check login status to either render landing or dashboard
  const loginStatus = () => {
    const url = `/user/cookie`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const status = data;
        setIsLoggedIn(status);
      })
      .catch((err) => console.log('err', err));
  };

  // runs loginStatus function on page load
  useEffect(() => {
    loginStatus();
  }, []);

  return (
    // Passing down settings for both light and dark mode
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <div className='App' data-testid='app'>
        {isLoggedIn === false ? (
          <Landing isDarkTheme={isDarkTheme} changeTheme={changeTheme} light={light} dark={dark} />
        ) : (
          <Dashboard isDarkTheme={isDarkTheme} changeTheme={changeTheme} light={light} dark={dark} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
