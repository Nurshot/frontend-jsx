import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>Hattori Manga</h1>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={toggleMenu}>Anasayfa</Link></li>
          <li><Link to="/manga" onClick={toggleMenu}>Tüm Mangalar</Link></li>
          <li><Link to="/discord" onClick={toggleMenu}>Discord</Link></li>
        </ul>
        <input type="text" placeholder="Arama..." className="search-input" />
        {isAuthenticated ? (
          <button onClick={handleLogout} className="auth-button">
            <FaSignOutAlt /> Çıkış Yap
          </button>
        ) : (
          <Link to="/login" className="auth-button">
            <FaSignInAlt /> Giriş Yap
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;