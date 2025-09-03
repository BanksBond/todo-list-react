import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Task from "../Task/Task";
import emptyBox from "../../images/empty-box.png";

export default function TaskListCard({
  data = [],
  onWrapperChange,
  onClickTask,
  sidebar,
  onSetData, // parent setter callback (recommended)
  apiUrl = "http://localhost:8000/api/todos",
}) {
  const [deletingIds, setDeletingIds] = useState([]); // array of ids currently deleting
  const abortControllers = useRef({});

  // cleanup: abort any in-flight delete requests on unmount
  useEffect(() => {
    return () => {
      Object.values(abortControllers.current).forEach((c) => {
        try {
          c.abort();
        } catch (e) {
          /* ignore */
        }
      });
    };
  }, []);

  const handleDelete = async (id, { confirmDelete = true } = {}) => {
    if (
      confirmDelete &&
      !window.confirm("Delete this task? This cannot be undone.")
    ) {
      return;
    }

    if (deletingIds.includes(id)) {
      // already deleting
      return;
    }
    setDeletingIds((prev) => [...prev, id]);

    // snapshot current data so we can rollback if needed
    const previousSnapshot = Array.isArray(data) ? data.slice() : [];

    // Optimistic update: remove from parent state immediately if possible
    if (typeof onSetData === "function") {
      try {
        onSetData((prev) => prev.filter((t) => t.id !== id));
      } catch (e) {
        console.warn("onSetData threw when trying optimistic remove:", e);
      }
    } else {
      console.warn(
        "onSetData not provided — optimistic UI can't update parent. Parent must handle deletion itself."
      );
    }

    // make request cancellable
    const controller = new AbortController();
    abortControllers.current[id] = controller;

    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}/`, {
        signal: controller.signal,
      });

      // success: nothing more to do (task already removed)
    } catch (err) {
      // rollback optimistic update if parent setter exists
      if (typeof onSetData === "function") {
        try {
          onSetData(() => previousSnapshot);
        } catch (e) {
          console.error("Failed to rollback after delete error:", e);
        }
      }

      console.error("Failed to delete task:", err);
    } finally {
      // cleanup deleting state and controller
      setDeletingIds((prev) => prev.filter((i) => i !== id));
      delete abortControllers.current[id];
    }
  };

  const isDeleting = (id) => deletingIds.includes(id);

  return (
    <div className="task-list-card">
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
                handleClickOnTask={onClickTask}
                // pass a wrapped onDelete that triggers our handler
                onDelete={() => handleDelete(task.id)}
                // optional prop for Task to render a spinner / disabled state if it supports it
                isDeleting={isDeleting(task.id)}
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
                  handleClickOnTask={onClickTask}
                  onDelete={() => handleDelete(task.id)}
                  isDeleting={isDeleting(task.id)}
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

      <button className="add-btn" onClick={() => onWrapperChange("AddTask")}>
        Add Task
      </button>
    </div>
  );
}
