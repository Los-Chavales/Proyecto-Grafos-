import { React, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import "../styles/register_entity.css";
import { useAuth } from "../context/Auth_context";
import { usePlace } from "../context/Place_context";
import { useHouse } from "../context/House_context";
import { useGET } from '../context/Get_context';
import Cookies from "js-cookie";

const Register_entity = (newLocation) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, userDecoded } = useAuth();
  const { register_place } = usePlace();
  const { register_house } = useHouse();
  const { getData } = useGET();

  const onSubmit = (data) => { 

    let formData;

    if(userDecoded && userDecoded.data.rol == "propietario"){

      formData = {
        name: Cookies.get().token,
        price: data.price,
        construction_materials: data.construction_materials,
        size: data.size,
        rooms: data.rooms,
        property_type: data.property_type,
        house_coords: [newLocation.newLocation.lat, newLocation.newLocation.lng]
      }

      register_house(formData, Cookies.get().token)
      getData(); 

    } else if (userDecoded && userDecoded.data.rol == "cliente"){
  
      formData = {
        name: Cookies.get().token,
        name_place:data.name_place,
        place_coords: [newLocation.newLocation.lat, newLocation.newLocation.lng]
      }
  
      register_place(formData, Cookies.get().token) 
      getData(); 
    }

    getData(); 
  };

  if (userDecoded && userDecoded.data.rol == "propietario") {
    return (
      <div className="mb-4">
        {/*  Para el form de las casas */}
        <div>
          <h2>Agregar nueva casa</h2>
        </div>

        <form className="form_register_entity" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">

            <div className='form_house'>
              <label className='form_label'>Precio
              </label>
              <div className='container_form_input'>
                <input className='form_input' type="number" name='price' 
                  {...register("price", { required: true })}
                />
              </div>

              <label className='form_label'>Materiales
              </label>
              <div className='container_form_input'>
                <input className='form_input' type="text" name='construction_materials'
                  {...register("construction_materials", { required: true })} 
                />
              </div>

              <label className='form_label'>Tamaño
              </label>
              <div className='container_form_input'>
                <input className='form_input' type="text" name='size' 
                  {...register("size", { required: true })} 
                />
              </div>

              <label className='form_label'>Cuartos
              </label>
              <div className='container_form_input' >
                <input className='form_input' type="number" name='rooms' 
                  {...register("rooms", { required: true })} 
              />
              </div>


              <label className='form_label'>Tipo de propiedad
              </label>
              <div className='container_form_input'>
                <input className='form_input' type="text" name='property_type'
                  {...register("property_type", { required: true })}  
                />
              </div>

            </div>

          </div>
          <div className="container_submit_button">
            <button className="submit_button" >Agregar</button>
          </div>
        </form>
      </div>
    );
  } else if (userDecoded && userDecoded.data.rol == "cliente") {
    return (
      <div className="mb-4">
        {/*  Para el form de los lugares */}
        <div>
          <h2>Agregar nueva ubicación</h2>
        </div>

        <form className="form_register_entity" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">

            <div className='container_form_input'>
              <label className='form_label'>Nombre
                <input className='form_input' type='text' name='name_place'
                  {...register("name_place", { required: true })}
                />
              </label>
            </div>

          </div>
          <div className="container_submit_button">
            <button className="submit_button" type='submit' >Agregar</button>
          </div>
        </form>
      </div>
    );
  }

};

export default Register_entity;
