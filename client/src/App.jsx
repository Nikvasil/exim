import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword.jsx';


function App() {
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Router>
            <div className="App">
                <Header user={user} onLogout={handleLogout} />
                <main>
                    <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/change-password" element={user ? <ChangePassword user={user} /> : <Navigate to="/login" />} />
                    </Routes>
                    </div>
                </main>
                <Footer />
            </div>
        </Router>
    );
}


export default App;


