import { React, useState, useEffect } from 'react';
import "../styles/login.css";

const Modal_confirm = ({ isOpen, closeModal, id, entity }) => {
  const [selectedHouse, setSelectedHouse] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  console.log("Van llegando:")

  console.log(id)
  console.log(entity)

  const selectIdDelete = (id, entity) => {
    if (entity == "house") {
      setSelectedHouse(id)
    } else if (entity == "place") {
      setSelectedPlace(id)
    }
  }

  if (!isOpen) return null;

  return (
    <div className='login_container_modal'>
      <div className='login_container'>
        <div className='login_container_close'>
          <button onClick={closeModal} className='login_close'>X</button>
        </div>
        <p>¿Estás seguro de que quieres eliminar?</p>
        <button className="button">Si</button>
        <button className="button">No</button>
      </div>
    </div>
  );
};

export default Modal_confirm;