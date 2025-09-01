import React from "react";
import Task from "../../components/Task/Task";
import emptyBox from "../../images/empty-box.png";

export default function TWrapper({
  data,
  onWrapperChange,
  onWO,
  handleDelete,
  sidebar,
}) {
  return (
    <div className="t-wrapper">
      <div className="title-grp">
        <h2 className="section-header">Tasks</h2>
        <span className="current-title"></span>
      </div>
      {data.length !== 0 ? (
        <div className="tasks">
          {sidebar === "all" ? (
            data.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                info={task.note}
                starred={task.starred}
                onWO={onWO}
                onDelete={handleDelete}
              />
            ))
          ) : sidebar === "star" ? (
            data
              .filter((task) => task.starred)
              .map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  info={task.note}
                  starred={task.starred}
                  onWO={onWO}
                  onDelete={handleDelete}
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
      <button className="add-btn" onClick={() => onWrapperChange("F")}>
        Add Task
      </button>
    </div>
  );
}
