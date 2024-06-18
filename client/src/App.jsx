import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword.jsx';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
    const [user, setUser] = useState(null);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [favouriteFacility, setFavouriteFacility] = useState(user ? user.favouriteFacility : null);
    const [isLoading, setIsLoading] = useState(false);

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

    return (<Router>
            <div className="App">
                <Header
                    user={user}
                    onLogout={handleLogout}
                    setIsLoading={setIsLoading}
                />
                <main>
                    <div className="content">
                        {isLoading && <div className="loader-container">
                            <CircularProgress sx={{color: "#888888"}}/>
                        </div>}
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
                                element={!user ? <Register
                                    setUser={setUser}
                                    setIsLoading={setIsLoading}
                                /> : <Navigate to="/"/>}
                            />
                            <Route
                                path="/login"
                                element={!user ? <Login
                                    setUser={setUser}
                                    setIsLoading={setIsLoading}
                                /> : <Navigate to="/"/>}
                            />
                            <Route
                                path="/change-password"
                                element={user ? <ChangePassword
                                    user={user}
                                    setIsLoading={setIsLoading}
                                /> : <Navigate to="/"/>}
                            />
                        </Routes>
                    </div>
                </main>
                <Footer/>
            </div>
        </Router>);
}


export default App;