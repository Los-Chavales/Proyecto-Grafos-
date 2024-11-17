import { React, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth_context";
import "../styles/login.css";

const Login = ({ isOpen_login, closeModal_login }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, user, isAuth, errorsServer } = useAuth();

  const onSubmit = (data) => signin(data);

  if (!isOpen_login) return null;

  return (
    <div className='login_container_modal'>
      <div className='login_container'>
        <div className='login_container_close'>
          <button onClick={closeModal_login} className='login_close'>X</button>
        </div>

        <form className='login_container_form' onSubmit={handleSubmit(onSubmit)}>
          <h2>Iniciar</h2>
          <input className='login_form_input' type='text' name='name' placeholder='nombre' 
            {...register("name", { required: true })}
          />
          {errors.name && (<p className="p-input-user">Se requiere el nombre</p>)}

          <input className='login_form_input' type='password' name='password' placeholder='contraseña'
            {...register("password", { required: true })}
          />
          {errors.password && (<p className="p-input-user">Se requiere una contraseña</p>)}

          <input className='login_form_input --submit' type='submit'></input>

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