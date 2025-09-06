import emptyBox from "../../images/empty-box.png";
import Spinner from "../Spinner/Spinner";
import Task from "../Task/Task";

export default function TaskListCard({
  data = [],
  onWrapperChange,
  onClickTask,
  sidebar,
  toggleComplete,
  isToggling,
  deleteTask,
  isDeleting,
  toEditTaskWrapper,
  loading,
}) {
  return (
    <div className="task-list-card">
      <div className="title-grp">
        <h2 className="section-header">Tasks</h2>
        <span className="current-title"></span>
      </div>

      {loading ? (
        <div className="tasks isLoading">
          <Spinner size={"50px"} />
        </div>
      ) : data.length !== 0 ? (
        <div className="tasks">
          {sidebar === "all" ? (
            data.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleClickOnTask={onClickTask}
                onDelete={() => deleteTask(task.id)}
                isDeleting={isDeleting(task.id)}
                toggleComplete={toggleComplete}
                isToggling={isToggling(task.id)}
                toEditTaskWrapper={toEditTaskWrapper}
              />
            ))
          ) : sidebar === "star" ? (
            data
              .filter((task) => task.starred)
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  handleClickOnTask={onClickTask}
                  onDelete={() => deleteTask(task.id)}
                  isDeleting={isDeleting(task.id)}
                  toggleComplete={toggleComplete}
                  isToggling={isToggling(task.id)}
                  toEditTaskWrapper={toEditTaskWrapper}
                />
              ))
          ) : (
            <div className="emptyBox">
              <img className="" src={emptyBox} alt="emptyBox" />
              <p>Sorting Coming Soon...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="emptyBox">
          <img className="" src={emptyBox} alt="emptyBox" />
          <p style={{ display: "inline-flex", alignItems: "center" }}>
            No Tasks here... Go on add some 👇
          </p>
        </div>
      )}

      {!loading && (
        <button className="add-btn" onClick={() => onWrapperChange("AddTask")}>
          Add Task
        </button>
      )}
    </div>
  );
}
