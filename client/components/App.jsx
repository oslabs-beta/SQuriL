import React from 'react';
import Landing from './Landing'
import Dashboard from './Dashboard.jsx'
import '../Styles/App.css'

function App() {
    return (
        <div className='App'>
            <Landing />
            {/* <Dashboard /> */}
            {/* {document.cookie !== undefined &&
                <Dashboard />
            }
            {document.cookie === undefined &&
                < Landing />
            } */}
        </div>
    );
}

export default App;