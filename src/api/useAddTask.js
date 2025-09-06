import { useRef, useState, useEffect } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;

export function useAddTask(onSetData, onWrapperChange) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abortControllerRef = useRef(null);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const addTask = async (formData, nextId) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await axios.post(`${API_PATH}/todos`, formData, {
        signal: controller.signal,
      });

      const createdTodo =
        res?.data && Object.keys(res.data).length
          ? res.data
          : { ...formData, id: Date.now() };

      onSetData?.((prev) => [...prev, createdTodo]);

      // navigate after success
      onWrapperChange?.("TaskList");

      return createdTodo; // let caller reset form if needed
    } catch (err) {
      console.error("Failed to create todo:", err);
      alert(
        err?.response?.data?.message || err.message || "Failed to add task"
      );
      return null;
    } finally {
      setIsSubmitting(false);
      abortControllerRef.current = null;
    }
  };

  return { addTask, isSubmitting };
}
