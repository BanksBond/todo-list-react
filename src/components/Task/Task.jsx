import React from "react";

export default function Task({
  task,
  handleClickOnTask,
  onDelete,
  isDeleting,
  toggleComplete,
  isToggling,
  toEditTaskWrapper,
}) {
  const { id, title, starred, completed } = task;

  return (
    <div
      data-id={id}
      className={`task ${completed ? "task-completed" : ""}`}
      style={{
        transition: "all 0.2s ease-in-out",
        opacity: isToggling ? 0.5 : 1, // dim while updating
        pointerEvents: isToggling ? "none" : "auto",
      }}
    >
      {/* ✅ Toggle Complete */}
      <div
        onClick={() => !isToggling && toggleComplete(id)}
        className="checkmark"
      >
        <input
          type="checkbox"
          className="hide-check"
          checked={completed}
          readOnly
        />
        {isToggling ? (
          <i className="fa-solid fa-spinner fa-spin check" /> // spinner while updating
        ) : (
          <i
            className={`${
              completed ? "fa-solid fa-circle-check" : "fa-regular fa-circle"
            } check`}
          />
        )}
      </div>

      {/* ✅ Title */}
      <div onClick={() => handleClickOnTask(id)} className="task-title">
        <p className={`${completed ? "strike-through" : ""} task-title`}>
          {title}
        </p>
      </div>

      {/* ✅ Actions */}
      <div className="actions">
        {isDeleting === id ? (
          <i className="options delete fa-solid fa-spinner fa-spin"></i>
        ) : (
          <>
            {!completed && (
              <i
                onClick={() => toEditTaskWrapper(id)}
                className="options edit material-symbols-rounded"
              >
                edit
              </i>
            )}
            {completed && (
              <i
                onClick={() => onDelete(id)}
                className="options delete material-symbols-rounded"
              >
                delete
              </i>
            )}
            {!completed && (
              <i
                className={`${starred ? "fa-solid" : "fa-regular"} fa-star`}
              ></i>
            )}
          </>
        )}
      </div>
    </div>
  );
}
