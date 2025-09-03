import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";

export default function AddTaskCard({ data = [], onSetData, onWrapperChange }) {
  // compute next id more robustly (not just length)
  const nextId =
    data && data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: nextId,
    title: "",
    note: "",
    starred: false,
    date: "",
    completed: false,
  });
  const abortControllerRef = useRef(null);

  // cleanup on unmount: abort request if any
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStarClick = () => {
    setFormData((prevState) => ({
      ...prevState,
      starred: !prevState.starred,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // guard double-submit
    setIsSubmitting(true);
    console.log("setIsSubmitting(true)");

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // simulate delay for testing UI (uncomment to test)
      // await new Promise((r) => setTimeout(r, 2000));

      const res = await axios.post(
        "http://localhost:8000/api/todos",
        formData,
        {
          timeout: 10000, // 10s
          signal: controller.signal, // wire the AbortController (axios >= 1.2 supports it)
        }
      );

      const createdTodo =
        res?.data && Object.keys(res.data).length
          ? res.data
          : { ...formData, id: Date.now() };

      onSetData?.((prev) => [...prev, createdTodo]);

      // reset form (use functional update pattern)
      setFormData({
        id: nextId + 1,
        title: "",
        note: "",
        starred: false,
        date: "",
        completed: false,
      });

      // navigate after success
      onWrapperChange?.("TaskList");
    } catch (err) {
      console.error("Failed to create todo:", err);
      // show user-friendly fallback (you might want to set an error state)
      alert(
        err?.response?.data?.message || err.message || "Failed to add task"
      );
    } finally {
      setIsSubmitting(false);
      console.log("setIsSubmitting(false)");
      abortControllerRef.current = null;
    }
  };

  return (
    <div
      className="add-task-card"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form className="task-form" onSubmit={handleSubmit}>
        <label htmlFor="task">
          <h2 className="section-header form-title-header">Add Task</h2>
        </label>

        <input
          type="text"
          id="task"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Your Task Title here..."
          required
          disabled={isSubmitting}
        />

        <label htmlFor="note">
          <h2 className="section-header form-header">Note</h2>
        </label>
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, note: e.target.value }))
          }
          placeholder="Your list of Tasks here..."
          disabled={isSubmitting}
        ></textarea>

        <div className="extras-wrapper">
          <div className="extras">
            <h2 className="section-header form-header">Date</h2>
            <label htmlFor="date">
              <input
                type="date"
                max="2199-12-31"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy"
                disabled={isSubmitting}
              />
            </label>
          </div>

          <div
            onClick={isSubmitting ? undefined : handleStarClick}
            role="button"
            tabIndex={0}
          >
            <i
              className={`add-star ${
                formData.starred ? "fa-solid" : "fa-regular"
              } fa-star`}
              aria-hidden
            />
          </div>
        </div>

        <div className="btn-group">
          {/* Make sure this is NOT a submit button: */}
          <button
            type="button"
            className="back-btn"
            onClick={() => onWrapperChange("TaskList")}
            disabled={isSubmitting}
          >
            ◀
          </button>

          <button
            type="submit"
            className="submit-btn add-task-btn"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Add"}
          </button>

          {/* explicit type to avoid accidental submit */}
          <button
            type="button"
            className="submit-btn edit-task-btn hidden"
            disabled
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
