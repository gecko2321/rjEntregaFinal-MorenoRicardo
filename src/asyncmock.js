const productos = [
  { id: "1",idCat:"1", nombre: "Taza", precio: 500, img: "../img/1.webp",detalle:"Taza + Plato",stock: 50},
  { id: "2",idCat:"2", nombre: "Maceta", precio: 1000, img: "../img/2.webp",detalle: "Maceta de ceramica ultra resistente",stock: 50},
  { id: "3",idCat:"3", nombre: "Bowl", precio: 1500, img: "../img/3.webp",detalle: "Bowl multiusos para meriendas y desayunos",stock: 80},
  { id: "4",idCat:"3", nombre: "Tazas", precio: 2000, img: "../img/4.webp",detalle: "Combo de Tazas para regalar",stock: 65},
];

export const getProductos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 100);
  });
};


//Funcion similar pero retorna un solo item

export const getUnProducto = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const producto = productos.find(prod=> prod.id === id)
      resolve(producto)
    }, 100);
  })
}

//La funcion de abajo retorna toda una categoria:

export const getProductosPorCategoria = (idCategoria) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const productosCategoria = productos.filter(prod=> prod.idCat === idCategoria)
      resolve(productosCategoria)
    }, 100);
  })
}