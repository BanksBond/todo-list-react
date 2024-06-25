import React, { useState } from "react";


const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    taskTitle: "",
    taskInfo: [],
    starred: false,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...formData, id: Date.now().toString() },
    ]);
    setFormData({
      id: "",
      taskTitle: "",
      taskInfo: [],
      starred: false,
      date: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskTitle"
          value={formData.taskTitle}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <textarea
          name="taskInfo"
          value={formData.taskInfo.join("\n")}
          onChange={(e) =>
            setFormData({ ...formData, taskInfo: e.target.value.split("\n") })
          }
          placeholder="Task Info (one line per item)"
        />
        <input
          type="checkbox"
          name="starred"
          checked={formData.starred}
          onChange={handleChange}
        />
        <label>Starred</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.taskTitle}</h3>
            <p>{task.taskInfo.join("\n")}</p>
            <p>Starred: {task.starred ? "Yes" : "No"}</p>
            <p>Date: {task.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
