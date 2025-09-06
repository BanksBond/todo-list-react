import { useRef, useState } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;

export function useDeleteTask(
  setData,
  { onSuccess, confirmDelete = true } = {}
) {
  const [deletingIds, setDeletingIds] = useState([]);
  const abortControllers = useRef({});

  const deleteTask = async (id) => {
    if (
      confirmDelete &&
      !window.confirm("Delete this task? This cannot be undone.")
    ) {
      return;
    }

    if (deletingIds.includes(id)) return;

    setDeletingIds((prev) => [...prev, id]);

    const controller = new AbortController();
    abortControllers.current[id] = controller;

    try {
      await axios.delete(`${API_PATH}/todos/${id}/`, {
        signal: controller.signal,
      });

      onSuccess?.(); // 👈 trigger refetch if provided
      if (typeof setData === "function")
        setData((data) => data.filter((val) => val.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setDeletingIds((prev) => prev.filter((i) => i !== id));
      delete abortControllers.current[id];
    }
  };

  const cancelDelete = (id) => {
    abortControllers.current[id]?.abort();
    delete abortControllers.current[id];
    setDeletingIds((prev) => prev.filter((i) => i !== id));
  };

  return { deleteTask, cancelDelete, deletingIds };
}
