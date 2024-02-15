//1) Importar el hook useState y create context que me permite crear un contexto que alamcenara toda la logica de mi carro de compras
import { useState, createContext } from "react";

//2 Creamos y exportamos el nuevo contexto
//valor inicial un objeto que tiene las siguientes propiedades:
export const CarritoContext = createContext({
  carrito: [],
  total: 0,
  cantidadTotal: 0,
});

//3 Generamos nuestro componente custom provider llamado "CarritoProvider"
export const CarritoProvider = ({ children }) => {
  //usamos useState para generar estados para almacenar el carrito, el total y la cantidad total
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  //colocamos console log momentaneamente para ver la actividad
  //console.log(carrito, total, cantidadTotal);
  //console.log(carrito);
  //console.log(cantidadTotal);
  //console.log(total);

  //4 Agregamos algunos metodos al proveedor de contexto para manipular el carrito de compras: agregar, eliminar, vaciar
  const agregarAlCarrito = (item, cantidad) => {
    const productoExistente = carrito.find(prod => prod.item.id === item.id);

    if (!productoExistente) {
      setCarrito((prev) => [...prev, { item, cantidad }]);
      setCantidadTotal(prev => prev + cantidad);
      setTotal(prev => prev + (item.precio * cantidad));
      //La sintaxis prev => [...prev,{item, cantidad}] se utiliza para crear un nuevo array a partir del esatdo anterior del carrito (prev) y agregar un nuevo objeto que es el nuevo producto
    } else {
      const carritoActualizado = carrito.map(prod => {
        if (prod.item.id === item.id) {
          return { ...prod, cantidad: prod.cantidad + cantidad };
        } else {
          return prod;
        }
      });
      setCarrito(carritoActualizado);
      setCantidadTotal((prev) => prev + cantidad);
      setTotal((prev) => prev + item.precio * cantidad);
    }
  };

  //Eliminar producto del carrito

  const eliminarProducto = (id) => {
    //Guardo una referencia del producto a borrar
    const productoEliminado = carrito.find((prod) => prod.item.id === id);

    //ahora lo elimino del carrito
    const carritoActualizado = carrito.filter((prod) => prod.item.id !== id);

    setCarrito(carritoActualizado);
    setCantidadTotal((prev) => prev - productoEliminado.cantidad);
    setTotal(
      (prev) =>
        prev - productoEliminado.item.precio * productoEliminado.cantidad
    );
  };

  //Funcion vaciar el carrito de compras

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotal(0);
    setCantidadTotal(0);
  };

  //5 Usamos el value para enviar el valor del carrito, total, cantidad total y las funciones

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        total,
        cantidadTotal,
        agregarAlCarrito,
        eliminarProducto,
        vaciarCarrito,
        
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
  //Le tenemos que agregar el children para todos los componentes que lo puedan necesitar
};
