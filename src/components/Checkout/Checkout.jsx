import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const Checkout = () => {
  const { carrito, vaciarCarrito, total } = useContext(CarritoContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [ordenId, setOrdenId] = useState("");

  const manejadorSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completar todos los datos");
      return;
    }
    if (email !== emailConfirmacion) {
      setError("Los email no coinciden");
      return;
    }

    const orden = {
      items: carrito.map((producto) => ({
        id: producto.item.id,
        nombre: producto.item.nombre,
        cantidad: producto.cantidad,
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
    };

    //descontar stock, se ejecutan varias promesas en paralelo

    Promise.all(
      orden.items.map(async (productoOrden) => {
        //por cada producto una referencia y a partir de ahi el doc
        const productoRef = doc(db, "inventario", productoOrden.id);
        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;
        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad,
        });
      })
    )
      .then(() => {
        addDoc(collection(db, "ordenes"), orden)
          .then((docRef) => {
            setOrdenId(docRef.id);
            vaciarCarrito();
            setNombre("");
            setApellido("");
            setTelefono("");
            setEmail("");
            setEmailConfirmacion("");
            Swal.fire({
              title: "Su Orden se generó correctamente, gracias por su Compra!",
              text: `El codigo de orden es: ${docRef.id}`,
              icon: "success",
            })
            .then(() => {
              //Redirijo el navegador al home
              window.location.href = "/"
          })
        })
          .catch((error) => console.log("Error", error));
      })
      .catch((error) => {
        console.log("Stock no actualizado", error);
        setError("Error al actualizar stock");
      });
  };

  return (
    <div>
      <h2>Checkout - Finalizar Compra</h2>
      <form onSubmit={manejadorSubmit}>
        {carrito.map((producto) => (
          <div key={producto.item.id}>
            <p>
              {producto.item.nombre} x {producto.cantidad}
            </p>
            <p>{producto.item.precio} </p>
            <hr />
          </div>
        ))}

        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            value={nombre}
            id="nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            value={apellido}
            id="apellido"
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="telefono">Telefono</label>
          <input
            type="text"
            value={telefono}
            id="telefono"
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="emailConfirmacion">Confirmacion Email</label>
          <input
            type="email"
            value={emailConfirmacion}
            id="emailConfirmacion"
            onChange={(e) => setEmailConfirmacion(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button>Finalizar Orden</button>

       
      </form>
    </div>
  );
};

export default Checkout;
