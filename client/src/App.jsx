import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';


const App = () => {
  const { authUser, loading } = useContext(AuthContext);

  const isProfileComplete = authUser?.fullname && authUser?.profilePic;

  if (loading) return <div className="text-white p-5">Loading...</div>;

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              isProfileComplete ? <HomePage /> : <Navigate to="/profile" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !authUser ? (
              <LoginPage />
            ) : isProfileComplete ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? (
              isProfileComplete ? <Navigate to="/" /> : <ProfilePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};


export default App;
