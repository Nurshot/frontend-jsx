import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>Hattori Manga</h1>
        <ul className="navbar-menu">
          <li><Link to="/">Anasayfa</Link></li>
          <li><Link to="/manga">Tüm Mangolar</Link></li>
          <li><Link to="/discord">Discord</Link></li>
        </ul>
        <input type="text" placeholder="Arama..." className="search-input" />
      </div>
    </nav>
  );
};

export default Navbar;