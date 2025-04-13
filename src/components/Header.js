// src/components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span>LOGO</span>
      </div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#devs">Devs</a>
      </nav>
    </header>
  );
}

export default Header;
