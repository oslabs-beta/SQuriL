import React, { useState, useEffect } from 'react';
import Landing from './Landing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Dashboard from './Dashboard.jsx';
import '../Styles/App.css';

// set palette for light mode
const light = {
  palette: {
    primary: {
      light: '#9162e4',
      main: 'rgb(72, 20, 155)',
      dark: '#280680',
      mode: 'light',
      contrastText: '#ffffff',
    },
  },
};

// set palette for dark mode
const dark = {
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(214,0,255)',
    },
  },
};

function App() {
  // declare state for dark theme
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  // declare state for login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // function to change theme
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  //function to check login status to either render landing or dashboard
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
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <div className='App' data-testid='app'>
        {isLoggedIn === false ? (
          <Landing isDarkTheme={isDarkTheme} changeTheme={changeTheme} light={light} dark={dark} />
        ) : (
          <Dashboard
            isDarkTheme={isDarkTheme}
            changeTheme={changeTheme}
            light={light}
            dark={dark}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
