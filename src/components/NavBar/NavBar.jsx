import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <header>
        <img className='imgLogo' src="../public/img/logo.webp" alt="" />
      <h1>Ceramica Gloria</h1>

      <nav>
        <ul>
          <li>Inicio</li>
          <li>Nosotros</li>
          <li>Productos</li>
          <li>Fabricacion</li>
          <li>Contacto</li>
        </ul>
      </nav>
    <CartWidget/>
    </header>
  );
};

export default NavBar;
