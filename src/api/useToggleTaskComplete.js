import { useState, useRef } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;

export function useToggleTaskComplete(setData, { onSuccess } = {}) {
  const [togglingIds, setTogglingIds] = useState([]); // track which todos are toggling
  const abortControllers = useRef({});

  const toggleComplete = async (id) => {
    if (togglingIds.includes(id)) return;
    setTogglingIds((prev) => [...prev, id]);

    const controller = new AbortController();
    abortControllers.current[id] = controller;

    try {
      await axios.post(
        `${API_PATH}/todos/${id}/complete/`,
        {},
        { signal: controller.signal }
      );

      // Just trigger a refetch if provided
      onSuccess?.();
      // local optimistic update here
      setData((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        })
      );
    } catch (err) {
      console.error("Failed to toggle completion:", err);
      alert(
        err?.response?.data?.message || err.message || "Failed to update task"
      );
    } finally {
      setTogglingIds((prev) => prev.filter((tid) => tid !== id));
      delete abortControllers.current[id];
    }
  };

  const cancelToggle = (id) => {
    abortControllers.current[id]?.abort();
    delete abortControllers.current[id];
    setTogglingIds((prev) => prev.filter((tid) => tid !== id));
  };

  return { toggleComplete, cancelToggle, togglingIds };
}
