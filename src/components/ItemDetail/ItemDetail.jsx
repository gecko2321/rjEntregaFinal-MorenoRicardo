import { useState } from "react";
import "./ItemDetail.css"
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";

//Importamos el carritocontext
import { CarritoContext } from "../../context/CarritoContext";
//importamos el hook useContext
import { useContext } from "react";

const ItemDetail = ({ id, nombre, precio, img,detalle,stock }) => {
//creo estado local con la cantidad de productos agregados

const [agregarCantidad,setAgregarCantidad]= useState(0)

//Modificaciones clase 11 - context

const {agregarAlCarrito} = useContext(CarritoContext)
////// hasta acá modificaicones


//creo funcion manejadora (handler) de la cantidad
const manejadorCantidad = (cantidad) => {
  setAgregarCantidad(cantidad)
  //console.log("productos agregados:" + cantidad)

// creo un objeto con el item y la cantidad
const item = {id, nombre, precio}
agregarAlCarrito(item,cantidad)
}
 
  return (
    <div className="contenedorItem">
      <h2>Nombre: {nombre}</h2>
      <h3>Precio: {precio}</h3>
      <p>ID:{id}</p>
      <p>Stock:{stock}</p>
      <p>Detalle: {detalle} </p>
      <img src={img} alt={nombre} />

{/* aca empleamos la logica de montaje y desmontaje del contador */}

{
agregarCantidad > 0 ? (<Link to="/cart"> Terminar Compra </Link>) : (<ItemCount inicial = {1} stock = {stock} funcionAgregar = {manejadorCantidad}/>)
}

    </div>
  );
};

export default ItemDetail;
