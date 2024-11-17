import { React, useState, useEffect } from 'react';
import "../styles/login.css";
import { useForm } from "react-hook-form";

const Register = ({ isOpen, closeModal }) => {
  const { register, handleSubmit, formState: { errors }, } = useForm();

  //const onSubmit = (data) => signup(data);

  if (!isOpen) return null;

  return (
    <div className='login_container_modal'>
      <div className='login_container'>
        <div className='login_container_close'>
          <button onClick={closeModal} className='login_close'>X</button>
        </div>
      {/*   <form className='login_container_form' onSubmit={handleSubmit(onSubmit)}> */}
        <form className='login_container_form' onSubmit={handleSubmit((values) => {
          console.log(values);
        })}>
          <h2>Regístrate</h2>
          <input className='login_form_input' type='text' name='name' placeholder='nombre' 
            {...register("name", { required: true })}
          />

          <input className='login_form_input' type='text' name='password' placeholder='contraseña'
            {...register("password", { required: true })}
          />

          <input className='login_form_input' type='text' name='phone' placeholder='teléfono'
            {...register("phone", { required: true })}
          />
          <input className='login_form_input --submit' type='submit'></input>
        </form>
      </div>
    </div>
  );
};

export default Register;