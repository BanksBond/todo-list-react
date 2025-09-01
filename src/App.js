import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import useFavicon from "./useFavicon";

import TWrapper from "./containers/TWrapper/TWrapper";
import FWrapper from "./containers/FWrapeer/FWrapper";
import OWrapper from "./containers/OWrapper/OWrapper";
import axios from "axios";

const dataa = [
  {
    id: 0,
    title: "Click on me!",
    note: [
      "- Expand tasks to view additional details about them.",
      "- Write notes, add dates and star tasks from the form pane.",
      "- Thank you for checking out my project!",
    ],
    starred: true,
    date: "6/25/2024",
  },
  {
    id: 1,
    title: "Me too!",
    note: [
      "- Filter created tasks by All, Starred, Today or Week.",
      "- You can change the theme by clicking toggle in sidebar.",
      "- Thank you for checking out my project!",
    ],
    starred: true,
    date: "6/25/2024",
  },
];

const styleResponsiveShow = {
  display: "flex",
  animation: "0.2s ease-in-out 0s 1 normal none running formRight",
};
const styleResponsiveHide = {
  animation: "0.2s ease-in-out 0s 1 reverse none running formRight",
  display: "none",
};

export default function App() {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }

  return (
    <div className="container">
      <Header menu={menu} handleMenu={handleMenu} />
      <Cards menu={menu} />
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

function Cards({ menu }) {
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
      <Main menu={menu} sidebar={sidebar} />
    </div>
  );
}

function Sidebar({ sidebar, setSidebar, toggleTheme, theme, menu }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <sidebar
      className="sidebar"
      style={
        isSmallScreen && menu
          ? styleResponsiveShow
          : isSmallScreen && !menu
          ? styleResponsiveHide
          : {}
      }
    >
      <div className="filters">
        <div className="filters-title-grp">
          <h2 className="section-header">Filters</h2>
          <p
            onClick={() => toggleTheme()}
            className="material-symbols-rounded theme"
          >
            {theme === "light" && "toggle_off"}
            {theme === "dark" && "toggle_on"}
          </p>
        </div>
        <p
          onClick={() => setSidebar("all")}
          className={`filter all ${sidebar === "all" && "show"}`}
        >
          <i className="material-symbols-rounded">inbox</i>
          All
        </p>
        <p
          onClick={() => setSidebar("star")}
          className={`filter star ${sidebar === "star" && "show"}`}
        >
          <i className="fa-solid fa-star"></i>
          Starred
        </p>
        <p
          onClick={() => setSidebar("today")}
          className={`filter today ${sidebar === "today" && "show"}`}
        >
          <i className="material-symbols-rounded">today</i>
          Today
        </p>
        <p
          onClick={() => setSidebar("week")}
          className={`filter week ${sidebar === "week" && "show"}`}
        >
          <i className="material-symbols-rounded">date_range</i>
          Week
        </p>
      </div>
      <div className="github">
        <a href="https://github.com/BanksBond">
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </sidebar>
  );
}

function Main({ menu, sidebar }) {
  const defaultWrapper = "T";
  const [wrapper, setWrapper] = useState(defaultWrapper);
  const [id, setId] = useState(0);
  const [data, setdata] = useState([]);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

  const styleMain = {
    display: "block",
  };
  const styleMainHide = {
    display: "none",
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos")
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleWrapperto(e, wrapper) {
    e.preventDefault();
    setWrapper(wrapper);
  }
  function handleWrapper(wrapper) {
    setWrapper(wrapper);
  }

  function handleWrapperToO(id) {
    setWrapper("O");
    setId(Number(id));
  }

  function handleDelete(id) {
    setdata(data.filter((task) => task.id !== id));
    // console.log(data.filter((task) => task.id !== id));
  }

  return (
    <main
      className="content"
      style={isSmallScreen && menu ? styleMainHide : styleMain}
    >
      {wrapper === "T" && (
        <TWrapper
          sidebar={sidebar}
          data={data}
          onWO={handleWrapperToO}
          onWrapperChange={handleWrapper}
          onSetId={setId}
          handleDelete={handleDelete}
        />
      )}
      {wrapper === "F" && (
        <FWrapper
          data={data}
          onWrapperChange={handleWrapperto}
          onWrapper={handleWrapper}
          onSetData={setdata}
        />
      )}
      {wrapper === "O" && (
        <OWrapper
          wrapper={wrapper}
          onWrapperChange={handleWrapper}
          data={data}
          setData={setdata}
          OID={id}
        />
      )}
    </main>
  );
}
