import { forwardRef, useImperativeHandle, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState("");

  useImperativeHandle(ref, () => ({
    search,
    setSearch,
  }));

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      //notifica al padre
      //El valor search (estado interno del hijo) 
      //se pasa como argumento a handleNavbarSearch.
      onSearch(search);
    }
  };

  return (
    <div ref={ref} className="navbar-container">
      <div>
        <h1>Tickevent</h1>
      </div>
      <div>
        <input
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={search}
          placeholder="busca tu evento.."
        />
        <Link to="/profile/my-info" className="navbar-mi-perfil">
          Mi perfil
        </Link>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
