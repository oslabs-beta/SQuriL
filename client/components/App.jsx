// React boilerplate
import React from 'react';
import Dashboard from './Dashboard.jsx'
import Header from './Header.jsx'
import Logo from './Logo'
import styles from '../Styles/App.css'

function App() {
    return (
        <div className='App'>
            <Header />,
            <Dashboard />
        </div>
    );
}

export default App;