import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;

export function useGetTodos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_PATH}/todos`);
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { data, setData, loading, error, refetch: fetchTodos };
}
