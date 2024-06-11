import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword.jsx';


function App() {
    const [user, setUser] = useState(null);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [favouriteFacility, setFavouriteFacility] = useState(user ? user.favouriteFacility : null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFavouriteFacility(user.favouriteFacility);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const handleLogout = () => {
        setSelectedFacility(null);
        setFavouriteFacility(null);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <div className="App">
                <Header
                    user={user}
                    onLogout={handleLogout}
                />
                <main>
                    <div className="content">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home
                                    user={user}
                                    setUser={setUser}
                                    selectedFacility={selectedFacility}
                                    setSelectedFacility={setSelectedFacility}
                                    favouriteFacility={favouriteFacility}
                                    setFavouriteFacility={setFavouriteFacility}
                                />}
                            />
                            <Route
                                path="/register"
                                element={<Register setUser={setUser} />}
                            />
                            <Route
                                path="/login"
                                element={<Login setUser={setUser} />}
                            />
                            <Route
                                path="/change-password"
                                element={user ? <ChangePassword user={user} /> : <Navigate to="/login" />}
                            />
                        </Routes>
                    </div>
                </main>
                <Footer />
            </div>
        </Router>
    );
}


export default App;