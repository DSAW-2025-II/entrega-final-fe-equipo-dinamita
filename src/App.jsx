import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Reservations from './pages/Reservations.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import RegisterCar from "./pages/RegisterCar.jsx";
import Driver from "./pages/Driver.jsx";
import NewTrip from "./pages/NewTrip.jsx";
import FinalizeTrip from "./pages/FinalizeTrip.jsx";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/be-driver" element={<Driver />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    <Route path="/register-car" element={<RegisterCar />} />
                    <Route path="/create-trip" element={<NewTrip />} />
                    <Route path="/finalize-trip" element={<FinalizeTrip />} />
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
