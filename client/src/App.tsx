import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Appointment from './Appointment';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/appointments" element={<Appointment />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;