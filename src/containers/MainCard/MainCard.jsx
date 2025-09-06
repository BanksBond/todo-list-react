import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDeleteTask } from "../../api/useDeleteTask";
import { useGetTodos } from "../../api/useGetTodos";
import { useToggleTaskComplete } from "../../api/useToggleTaskComplete";
import AddTaskCard from "../../components/AddTaskCard/AddTaskCard";
import TaskDetailCard from "../../components/TaskDetailCard/TaskDetailCard";
import TaskListCard from "../../components/TaskListCard/TaskListCard";

export default function MainCard({ menu, sidebar }) {
  /** "TaskList", "AddTask", "TaskDetail", "EditTask" */
  const [wrapper, setWrapper] = useState("TaskList");

  const { data, setData, loading, refetch } = useGetTodos();
  const { toggleComplete, togglingIds } = useToggleTaskComplete(setData);
  const { deleteTask, deletingIds } = useDeleteTask(setData, {
    onSuccess: refetch,
  });
  const isToggling = (id) => togglingIds.includes(id);
  const isDeleting = (id) => deletingIds.includes(id);
  console.log({ data });
  const [id, setId] = useState(0);
  // const [data, setData] = useState([]);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

  const styleMain = {
    display: "block",
  };
  const styleMainHide = {
    display: "none",
  };

  function handleWrapperChange(wrapper) {
    setWrapper(wrapper);
  }

  function handleGotoDetail(id) {
    setWrapper("TaskDetail");
    setId(Number(id));
  }

  function toEditTaskWrapper(id) {
    setWrapper("EditTask");
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
          setData={setData}
          onClickTask={handleGotoDetail}
          onWrapperChange={handleWrapperChange}
          toggleComplete={toggleComplete}
          isToggling={isToggling}
          deleteTask={deleteTask}
          isDeleting={isDeleting}
          toEditTaskWrapper={toEditTaskWrapper}
          loading={loading}
        />
      )}
      {wrapper === "AddTask" && (
        <AddTaskCard
          data={data}
          onWrapperChange={handleWrapperChange}
          onSetData={setData}
        />
      )}
      {wrapper === "EditTask" && (
        <AddTaskCard
          data={data}
          onWrapperChange={handleWrapperChange}
          onSetData={setData}
          isEditMode={true}
          id={id}
        />
      )}
      {wrapper === "TaskDetail" && (
        <TaskDetailCard
          wrapper={wrapper}
          onWrapperChange={handleWrapperChange}
          data={data}
          setData={setData}
          OID={id}
        />
      )}
    </main>
  );
}
