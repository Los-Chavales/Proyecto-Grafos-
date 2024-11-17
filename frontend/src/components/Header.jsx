import { React, useState } from 'react';
import "../styles/header.css";
import logo from "../assets/logo.png";
import Login from './Login_form';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <header className="header">
        <div className="div-logo">
        <img src={logo} alt="Logo" className="logo-header" />
        </div>
        <button onClick={() => setIsModalOpen(true)} className="button">Regístrate</button>
      </header>
      <Login isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;