import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { useAddTask } from "../../api/useAddTask";
import { useEditTask } from "../../api/useEditTask";

export default function AddTaskCard({
  data = [],
  onSetData,
  onWrapperChange,
  isEditMode = false,
  id,
}) {
  const nextId =
    data && data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;

  const [formData, setFormData] = useState(
    isEditMode
      ? data.filter((t) => t.id === id)[0]
      : {
          id: nextId,
          title: "",
          note: "",
          starred: false,
          date: "",
          completed: false,
        }
  );

  const { addTask, isSubmitting: addLoading } = useAddTask(
    onSetData,
    onWrapperChange
  );
  const { updateTask, isSubmitting: editLoading } = useEditTask(
    onSetData,
    onWrapperChange
  );

  const isSubmitting = addLoading || editLoading;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStarClick = () => {
    setFormData((prev) => ({ ...prev, starred: !prev.starred }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditMode) {
      await updateTask(formData, id);
    } else {
      const created = await addTask(formData, nextId);
      if (created) {
        setFormData({
          id: nextId + 1,
          title: "",
          note: "",
          starred: false,
          date: "",
          completed: false,
        });
      }
    }
  };

  return (
    <div
      className="add-task-card"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <form className="task-form" onSubmit={handleSubmit}>
        <label htmlFor="task">
          <h2 className="section-header form-title-header">
            {isEditMode ? "Update Task" : "Add Task"}
          </h2>
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
          onChange={handleInputChange}
          placeholder="Your list of Tasks here..."
          disabled={isSubmitting}
        />

        <div className="extras-wrapper">
          <div className="extras">
            <h2 className="section-header form-header">Date</h2>
            <input
              type="date"
              max="2199-12-31"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
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
            {isSubmitting ? (
              <Spinner size="small" />
            ) : isEditMode ? (
              "Update"
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
