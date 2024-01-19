import React from "react";
import "./ItemDetail.css"

const ItemDetail = ({ id, nombre, precio, img,detalle }) => {
  return (
    <div className="contenedorItem">
      <h2>Nombre: {nombre}</h2>
      <h3>Precio: {precio}</h3>
      <p>ID:{id}</p>
      <p>Detalle: {detalle} </p>
      <img src={img} alt={nombre} />
    </div>
  );
};

export default ItemDetail;
