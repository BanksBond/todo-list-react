import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TaskDetailCard from "../../components/TaskDetailCard/TaskDetailCard";
import AddTaskCard from "../../components/AddTaskCard/AddTaskCard";
import TaskListCard from "../../components/TaskListCard/TaskListCard";

export default function MainCard({ menu, sidebar }) {
  /** "TaskList", "AddTask", "TaskDetail" */
  const [wrapper, setWrapper] = useState("TaskList");
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

  function handleWrapperChange(wrapper) {
    setWrapper(wrapper);
  }

  function handleGotoDetail(id) {
    setWrapper("TaskDetail");
    setId(Number(id));
  }

  return (
    <main
      className="content"
      style={isSmallScreen && menu ? styleMainHide : styleMain}
    >
      {wrapper === "TaskList" && (
        <TaskListCard
          sidebar={sidebar}
          data={data}
          onClickTask={handleGotoDetail}
          onWrapperChange={handleWrapperChange}
          onSetId={setId}
        />
      )}
      {wrapper === "AddTask" && (
        <AddTaskCard
          data={data}
          onWrapperChange={handleWrapperChange}
          onSetData={setdata}
        />
      )}
      {wrapper === "TaskDetail" && (
        <TaskDetailCard
          wrapper={wrapper}
          onWrapperChange={handleWrapperChange}
          data={data}
          setData={setdata}
          OID={id}
        />
      )}
    </main>
  );
}
