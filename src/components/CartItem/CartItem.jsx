import React from 'react'

const CartItem = ({item,cantidad}) => {
  return (
    <div>
<h3>
    {item.nombre}
    <p>Cantidad: {cantidad}</p>
    <p>Precio: {item.precio}</p>
</h3>
    </div>
  )
}

export default CartItem