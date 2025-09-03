import { useEffect, useState } from "react";
import useFavicon from "../../useFavicon";
import MainCard from "../MainCard/MainCard";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function CardsContainer({ menu }) {
  const [sidebar, setSidebar] = useState("all");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useFavicon(theme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="cards">
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        toggleTheme={toggleTheme}
        theme={theme}
        menu={menu}
      />{" "}
      <MainCard menu={menu} sidebar={sidebar} />
    </div>
  );
}
