import React from 'react';
import "../styles/header.css";
import logo from "../assets/logo.png"


const Header = () => {
  return (
    <header className="header">
      <div className="div-logo">
      <img src={logo} alt="Logo" className="logo-header" />
      </div>
      <button className="button">Regístrate</button>
    </header>
  );
};

export default Header;