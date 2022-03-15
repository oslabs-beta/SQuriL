import React, { useState } from 'react';
import Landing from './Landing'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Dashboard from './Dashboard.jsx'
import '../Styles/App.css'
import { darken } from '@mui/material';

// set palette for light mode
const light = {
    palette: {
        mode: 'light',
    },
};

// set palette for dark mode
const dark = {
    palette: {
        mode: 'dark',
    },
};

function App() {

    // declare state for dark theme
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
            <CssBaseline />
            <div className='App'>
                {/* <Landing
                    isDarkTheme={isDarkTheme}
                    changeTheme={changeTheme}
                    light={light}
                    dark={dark}
                /> */}
                <Dashboard
                isDarkTheme={isDarkTheme}
                changeTheme={changeTheme}
                light={light}
                dark={dark}
            />
                {/* {document.cookie !== undefined &&
                <Dashboard />
            }
            {document.cookie === undefined &&
                < Landing />
            } */}
            </div>
        </ThemeProvider>

    );
}

export default App;