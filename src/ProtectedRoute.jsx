import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, showAlert } = useContext(AuthContext);

  return (
    <>
      {showAlert && (
        <div className="alert-box">
          <p>Görüntülemek için giriş yapınız.</p>
          <button onClick={() => window.location.reload()}>Tamam</button>
        </div>
      )}
      {isAuthenticated ? children : <Navigate to="/login" />}
    </>
  );
};

export default ProtectedRoute;