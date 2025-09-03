import { useState } from "react";
import CardsContainer from "./containers/CardsContainer/CardsContainer";

export default function App() {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }

  return (
    <div className="container">
      <Header menu={menu} handleMenu={handleMenu} />
      <CardsContainer menu={menu} />
    </div>
  );
}

function Header({ menu, handleMenu }) {
  return (
    <header>
      <h1 className={`${menu && "blurred "} logo`}>
        to<span className="logo-do">do.</span>
      </h1>
      <div></div>
      <div onClick={() => handleMenu()} className="side-menu">
        <input className="menu-icon" type="checkbox" />
        <div className="menu-grp">
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </div>
      </div>
    </header>
  );
}
