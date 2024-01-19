import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <img className="imgLogo" src="../public/img/logo.webp" alt="" />

      <Link to="/">
        <h1>Ceramica Gloria</h1>
      </Link>

      <nav>
        <ul>
          <li>
            <NavLink to = "/">Inicio</NavLink>
          </li>
          <li>
            <NavLink>Nosotros</NavLink>
          </li>
          <li>
            <NavLink to = "/categoria/1">Productos</NavLink>
          </li>
          <li>
            <NavLink to = "/categoria/2">Fabricacion</NavLink>
          </li>
          <li>
            <NavLink to = "/categoria/3">Contacto</NavLink>
          </li>
        </ul>
      </nav>
      <CartWidget />
    </header>
  );
};

export default NavBar;
