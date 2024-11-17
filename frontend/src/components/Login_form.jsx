import { React, useState, useEffect } from 'react';
import "../styles/login.css";
import { useForm } from "react-hook-form";

const Login = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
/*     <h1 onClick={closeModal} color="#000">Prueba</h1> */
    <div className='login_container_modal'>
      <div className='login_container'>
        <div className='login_container_close'>
          <button onClick={closeModal} className='login_close'>X</button>
        </div>
        <form className='login_container_form'>
          <input className='login_form_input' type='text' placeholder='nombre'></input>
          <input className='login_form_input' type='text' placeholder='contraseña'></input>
          <input className='login_form_input --submit' type='submit'></input>
        </form>
      </div>
    </div>
  );
};

export default Login;