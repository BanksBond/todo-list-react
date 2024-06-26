import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const dataa = [
  {
    id: 0,
    taskTitle: "Revise JavaScript",
    taskInfo: [
      "- Expand tasks to view additional details about them.",
      "- Write notes, add dates and star tasks from the form pane.",
      "- Thank you for checking out my project!",
    ],
    starred: true,
    date: "6/25/2024",
  },
  {
    id: 1,
    taskTitle: "Learn ReactJS",
    taskInfo: [
      "- Filter created tasks by All, Starred, Today or Week.",
      "- Add  projects by clicking (+) and pressing Enter.",
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
      <Main menu={menu} />
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

function Main({ menu }) {
  const defaultWrapper = "T";
  const [wrapper, setWrapper] = useState(defaultWrapper);
  const [id, setId] = useState(0);
  const [data, setdata] = useState(dataa);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

  const styleMain = {
    display: "block",
  };
  const styleMainHide = {
    display: "none",
  };

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

  return (
    <main
      className="content"
      style={isSmallScreen && menu ? styleMainHide : styleMain}
    >
      {wrapper === "T" && (
        <TWrapper
          data={data}
          onWO={handleWrapperToO}
          onWrapperChange={handleWrapper}
          onSetId={setId}
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
          OID={id}
        />
      )}
    </main>
  );
}

const showStyle = {
  display: "flex",
  flexDirection: "column",
};

function TWrapper({ data, onWrapperChange, onWO }) {
  return (
    <div className="t-wrapper" style={showStyle}>
      <div className="title-grp">
        <h2 className="section-header">Tasks</h2>
        <span className="current-title"></span>
      </div>
      <div className="tasks">
        {data.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.taskTitle}
            info={task.taskInfo}
            starred={task.starred}
            onWO={onWO}
          />
        ))}
      </div>
      <button className="add-btn" onClick={() => onWrapperChange("F")}>
        Add Task
      </button>
    </div>
  );
}

function FWrapper({ data, onWrapperChange, onSetData, onWrapper }) {
  console.log("data length " + data.length);
  console.log("data 0 length " + data.map((i) => i.id).length);
  const len = data.map((i) => i.id).length;
  const [formData, setFormData] = useState({
    id: len,
    taskTitle: "",
    taskInfo: [],
    starred: false,
    date: "",
  });
  // console.log(formData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStarClick = () => {
    setFormData((prevState) => ({
      ...prevState,
      starred: !prevState.starred,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can access formData and perform further actions
    onSetData((prevTasks) => [...prevTasks, { ...formData, id: len }]);
    setFormData({
      id: len,
      taskTitle: "",
      taskInfo: [],
      starred: false,
      date: "",
    });
    onWrapper("T");
    // console.log("Form Data " + formData);
    // console.log("Data " + data);
    console.log([...data, formData]);
  };

  return (
    <div className="f-wrapper" style={showStyle}>
      <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="task">
          <h2 className="section-header form-title-header">Add Task</h2>
        </label>
        <input
          type="text"
          id="task"
          name="taskTitle"
          value={formData.taskTitle}
          onChange={handleInputChange}
          placeholder="Task Title"
        />

        <label htmlFor="note">
          <h2 className="section-header form-header">Note</h2>
        </label>
        <textarea
          id="note"
          name="taskInfo"
          value={formData.taskInfo.join("\n")}
          onChange={(e) =>
            setFormData({ ...formData, taskInfo: e.target.value.split("\n") })
          }
          placeholder="Task Info (one line per item)"
        ></textarea>

        <div className="extras-wrapper">
          {/* <div class="extras">
            <label for="projects">
              <h2 class="section-header form-header">Project</h2>
            </label>
            <select name="projects" id="projects">
              <option value="Default">Default</option>
            </select>
          </div> */}
          <div className="extras">
            <h2 className="section-header form-header">Date</h2>
            <label htmlFor="date">
              <input
                type="date"
                max="2199-12-31"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div onClick={handleStarClick}>
            <i
              className={`add-star ${
                formData.starred ? "fa-solid" : "fa-regular"
              } fa-star`}
            />
          </div>
        </div>

        <div className="btn-group">
          <button className="back-btn" onClick={(e) => onWrapperChange(e, "T")}>
            ◀
          </button>

          <button
            onClick={(e) => handleSubmit(e)}
            className="submit-btn add-task-btn"
          >
            Add
          </button>
          <button className="submit-btn edit-task-btn hidden">Edit</button>
        </div>
      </form>
    </div>
  );
}

function OWrapper({ data, onWrapperChange, OID }) {
  // console.log(data[OID].taskTitle);
  // console.log(data.find((item) => item.id === OID));
  const currTask = data.find((item) => item.id === OID);

  return (
    <div className="o-wrapper" style={showStyle}>
      <div className="task-form expand-view">
        <div className="expand-header">
          <div className="project-grp">
            <i className="material-symbols-rounded open-folder">inbox</i>
            <p id="open-project">All</p>
          </div>
        </div>

        <div className="open-title-header">
          <h2 id="open-title">{currTask.taskTitle}</h2>
          <i
            className={`open-star ${
              currTask.starred ? "fa-solid" : "fa-regular"
            } fa-star`}
            style={{ display: "inline-block" }}
          >
            <div className="shine"></div>
          </i>
        </div>

        <div className="note-wrapper">
          <hr className="note-line" />
          <p id="open-note" style={{ textAlign: "left" }}>
            {currTask.taskInfo.join("\n\n")}
          </p>
          <hr className="bot-note-line" />
        </div>

        <div className="extras-wrapper">
          <div className="btn-group">
            <button
              onClick={() => onWrapperChange("T")}
              className="back-btn fa-sharp fa-solid fa-chevron-left"
            ></button>
          </div>
          <div className="extras">
            <p className="open-date">{currTask.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Task({ id, title, starred, onWO }) {
  // console.log(info.join("\n"));
  const [selected, setSelected] = useState(false);

  const styleCheck = {
    transition: "all 0.2s ease-in-out 0s",
    backgroundColor: "transparent",
    boxShadow: "none",
  };
  const styleNone = {
    borderRadius: "10px",
  };

  return (
    <div
      dataa-id={id}
      className="task"
      style={selected ? styleCheck : styleNone}
    >
      <div onClick={() => setSelected(!selected)} className="checkmark">
        <input type="checkbox" className="hide-check" />
        <i
          className={`${
            selected ? "fa-solid  fa-circle-check" : "fa-regular  fa-circle"
          } check`}
        ></i>
      </div>
      <div onClick={() => onWO(id)} className="task-title">
        <p className={` ${selected && "strike-through"} task-title`}>{title}</p>
      </div>
      <div className="actions">
        {!selected && (
          <i className="options edit material-symbols-rounded">edit</i>
        )}
        {selected && (
          <i className="options delete material-symbols-rounded">delete</i>
        )}
        {!selected && (
          <i className={`${starred ? "fa-solid" : "fa-regular"} fa-star`}></i>
        )}
      </div>
    </div>
  );
}
