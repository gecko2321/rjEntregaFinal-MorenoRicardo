import { useContext } from 'react'
import {CarritoContext} from "../../context/CarritoCOntext";
import { Link } from 'react-router-dom';
import './CartWidget.css'

const CartWidget = () => {
const {cantidadTotal}=useContext(CarritoContext)

  return (
    <div>
        <Link to="/cart">
        <img className='imgCart' src="../public/img/carrito.png" alt="ImgCarrito" />
        {
          cantidadTotal > 0 && <strong>{cantidadTotal}</strong>
        }
        </Link>
    </div>
  )
}

export default CartWidget