import { useMediaQuery } from "react-responsive";

const styleResponsiveShow = {
  display: "flex",
  animation: "0.2s ease-in-out 0s 1 normal none running formRight",
};
const styleResponsiveHide = {
  animation: "0.2s ease-in-out 0s 1 reverse none running formRight",
  display: "none",
};

export default function Sidebar({
  sidebar,
  setSidebar,
  toggleTheme,
  theme,
  menu,
}) {
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
