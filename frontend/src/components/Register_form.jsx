import { React, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth_context";
import "../styles/login.css";

const Register = ({ isOpen, closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, user, isAuth, errorsServer } = useAuth();

  const onSubmit = (data) => {
    signup(data)
  };

  if (!isOpen) return null;

  return (
    <div className='login_container_modal'>
      <div className='login_container'>
        <div className='login_container_close'>
          <button onClick={closeModal} className='login_close'>X</button>
        </div>

        {user && 
          <div>
             <h2 className='welcome_color'>Has sido registrado</h2>
           </div>
        }

        <form className='login_container_form' onSubmit={handleSubmit(onSubmit)}> 
          <h2>Regístrate</h2>
          <input className='login_form_input' type='text' name='name' placeholder='Nombre...' 
            {...register("name", { required: true })}
          />
          {errors.name && (<p className="p-input-user">Se requiere el nombre</p>)}

          <input className='login_form_input' type='password' name='password' placeholder='Contraseña...'
            {...register("password", { required: true })}
          />
          {errors.password && (<p className="p-input-user">Se requiere una contraseña</p>)}

          <input className='login_form_input' type='text' name='phone' placeholder='Teléfono...'
            {...register("phone", { required: true })}
          />
          {errors.password && (<p className="p-input-user">Se requiere teléfono</p>)}

          <div className='radio_input'>
            <input className='login_form_input radio' type='radio' name='rol' value={"cliente"}
              {...register("rol", { required: true })}
            />Cliente

            <input className='login_form_input radio' type='radio' name='rol' value={"propietario"}
              {...register("rol", { required: true })}
            />Propietario
            {errors.rol && (<p className="p-input-user">Se requiere el rol</p>)}
          </div>


          <input className='login_form_input --submit' type='submit' value="Registrarse"></input>
        </form>
      </div>
    </div>
  );
};

export default Register;