import { React, useState } from 'react';
import "../styles/header.css";
import logo from "../assets/logo.png";
import Login from './Login_form'; 
import Register from './Register_form';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_login, setIsModalOpen_login] = useState(false);
  return (
    <>
      <header className="header">
        <div className="div-logo">
        <img src={logo} alt="Logo" className="logo-header" />
        </div>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="button">Regístrate</button>
          <button  onClick={() => setIsModalOpen_login(true)} className="button">Iniciar</button>
        </div>
      </header>
      <Register isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      <Login isOpen_login={isModalOpen_login} closeModal_login={() => setIsModalOpen_login(false)} /> 
    </>
  );
};

export default Header;