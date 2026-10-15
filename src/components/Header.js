import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="Little Lemon home">
        Little Lemon
      </NavLink>
      <nav aria-label="Main navigation">
        <ul className="nav-list">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/booking">Reservations</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
