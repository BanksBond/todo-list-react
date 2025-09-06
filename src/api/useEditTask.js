import axios from "axios";
import { useEffect, useRef, useState } from "react";

const API_PATH = process.env.REACT_APP_API_PATH;

export function useEditTask(setData, onWrapperChange) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const updateTask = async (formData, id) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const res = await axios.put(`${API_PATH}/todos/${id}/`, formData, {
        signal: controller.signal,
      });

      const updatedTodo = res?.data;

      setData((prev) =>
        prev.map((task) => {
          if (task.id === id) return updatedTodo;
          return task;
        })
      );

      // navigate after success
      onWrapperChange?.("TaskList");

      return updatedTodo;
    } catch (err) {
      console.log("Failed Tto Update todo: ", err);
      return null;
    } finally {
      setIsSubmitting(false);
      abortControllerRef.current = null;
    }
  };

  return { updateTask, isSubmitting };
}
