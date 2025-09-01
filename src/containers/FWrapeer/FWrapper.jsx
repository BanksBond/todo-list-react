import axios from "axios";
import { useState } from "react";

export default function FWrapper({
  data,
  setData,
  onWrapperChange,
  onSetData,
  onWrapper,
}) {
  //   console.log("data length " + data.length);
  //   console.log("data 0 length " + data.map((i) => i.id).length);
  const len = data.map((i) => i.id).length;
  const [formData, setFormData] = useState({
    id: len,
    title: "",
    note: "",
    starred: false,
    date: "",
  });
  console.log(formData);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can access formData and perform further actions
    onSetData((prevTasks) => [...prevTasks, { ...formData, id: len }]);
    //   e.preventDefault();
    axios
      .post("http://localhost:8000/api/todos", formData)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() =>
        setFormData({ title: "", note: "", completed: false, starred: false })
      );
    setFormData({
      id: len,
      title: "",
      note: "",
      starred: false,
      date: "",
    });
    onWrapper("T");
    // console.log("Form Data " + formData);
    // console.log("Data " + data);
    console.log([...data, formData]);
  };

  return (
    <div
      className="f-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
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
        />

        <label htmlFor="note">
          <h2 className="section-header form-header">Note</h2>
        </label>
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Your list of Tasks here..."
        ></textarea>

        <div className="extras-wrapper">
          {/* <div class="extras">
            <label for="projects">
              <h2 class="section-header form-header">Project</h2>
            </label>
            <select name="projects" id="projects">
              <option value="Default">Default</option>
            </select>
          </div> */}
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
              />
            </label>
          </div>
          <div onClick={handleStarClick}>
            <i
              className={`add-star ${
                formData.starred ? "fa-solid" : "fa-regular"
              } fa-star`}
            />
          </div>
        </div>

        <div className="btn-group">
          <button className="back-btn" onClick={(e) => onWrapperChange(e, "T")}>
            ◀
          </button>

          <button
            onClick={(e) => handleSubmit(e)}
            className="submit-btn add-task-btn"
          >
            Add
          </button>
          <button className="submit-btn edit-task-btn hidden">Edit</button>
        </div>
      </form>
    </div>
  );
}
