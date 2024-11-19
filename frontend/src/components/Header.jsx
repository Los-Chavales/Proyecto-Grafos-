import { React, useState } from 'react';
import "../styles/header.css";
import logo from "../assets/logo.png";
import Login from './Login_form'; 
import Register from './Register_form';
import { useAuth } from "../context/Auth_context";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_login, setIsModalOpen_login] = useState(false);
  const { signin, user, userDecoded, isAuth, errorsServer, logout } = useAuth();

  return (
    <>
      <header className="header">
        <div className="div-logo">
        <img src={logo} alt="Logo" className="logo-header" />
        </div>
        <div>
          
        {!userDecoded && <button onClick={() => setIsModalOpen(true)} className="button">Regístrate</button>}

                    
        {!userDecoded && <button  onClick={() => setIsModalOpen_login(true)} className="button">Iniciar</button>}


        {userDecoded && <button  onClick={() => logout()} className="button">Salir</button>}

        </div>
      </header>
      <Register isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      <Login isOpen_login={isModalOpen_login} closeModal_login={() => setIsModalOpen_login(false)} /> 
    </>
  );
};

export default Header;