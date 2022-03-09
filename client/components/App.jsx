// React boilerplate
import React from 'react';
import Dashboard from './Dashboard.jsx'
import Header from './Header.jsx'
import Landing from './Landing.jsx'
import styles from '../Styles/App.css'

function App() {
    return (
        <div className='App'>
            <Header />,
            <Dashboard />
            <Landing />
        </div>
    );
}

export default App;