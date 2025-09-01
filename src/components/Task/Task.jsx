import { useState } from "react";

export default function Task({ id, title, starred, onWO, onDelete }) {
  // console.log(info.join("\n"));
  const [selected, setSelected] = useState(false);

  const styleCheck = {
    transition: "all 0.2s ease-in-out 0s",
    backgroundColor: "transparent",
    boxShadow: "none",
  };
  const styleNone = {
    borderRadius: "10px",
  };

  return (
    <div
      dataa-id={id}
      className="task"
      style={selected ? styleCheck : styleNone}
    >
      <div onClick={() => setSelected(!selected)} className="checkmark">
        <input type="checkbox" className="hide-check" />
        <i
          className={`${
            selected ? "fa-solid  fa-circle-check" : "fa-regular  fa-circle"
          } check`}
        ></i>
      </div>
      <div onClick={() => onWO(id)} className="task-title">
        <p className={` ${selected && "strike-through"} task-title`}>{title}</p>
      </div>
      <div className="actions">
        {!selected && (
          <i className="options edit material-symbols-rounded">edit</i>
        )}
        {selected && (
          <i
            onClick={() => onDelete(id)}
            className="options delete material-symbols-rounded"
          >
            delete
          </i>
        )}
        {!selected && (
          <i className={`${starred ? "fa-solid" : "fa-regular"} fa-star`}></i>
        )}
      </div>
    </div>
  );
}
