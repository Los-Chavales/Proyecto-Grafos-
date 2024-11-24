import { React, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth_context";
import "../styles/login.css";

const Login = ({ isOpen_login, closeModal_login }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, user, userDecoded, isAuth, errorsServer } = useAuth();

  const onSubmit = (data) => signin(data);

  if (!isOpen_login) return null;

  if(userDecoded){
    return (  
    <div className='login_container_modal'>
      <div className='login_container'>
        <div className='login_container_close'>
          <button onClick={closeModal_login} className='login_close'>X</button>
        </div>

        <div className='container_tittle'>
          <h2 className='tittle_welcome'><span className='tittle_welcome welcome_color'>Bienvenido</span> {userDecoded.data.name}</h2>
        </div>

      </div>
    </div>)
  } 

  return (
    <div className='login_container_modal'>
      <div className='login_container'>
        <div className='login_container_close'>
          <button onClick={closeModal_login} className='login_close'>X</button>
        </div>

        <form className='login_container_form' onSubmit={handleSubmit(onSubmit)}>
          <h2>Iniciar Sesión</h2>
          <input className='login_form_input' type='text' name='name' placeholder='Ingrese Usuario...' 
            {...register("name", { required: true })}
          />
          {errors.name && (<p className="p-input-user">Se requiere el nombre/usuario</p>)}

          <input className='login_form_input' type='password' name='password' placeholder='Ingrese Contraseña...'
            {...register("password", { required: true })}
          />
          {errors.password && (<p className="p-input-user">Se requiere una contraseña</p>)}

          <input className='login_form_input --submit' type='submit' value="Entrar"></input>
          {//Mostrar errores
            errorsServer.map((error, i) => (
              <div className="p-error-user" key={i}>
                <p>{error}</p>
              </div>
            ))
          }
          
        </form>
      </div>
    </div>
  );
};

export default Login;