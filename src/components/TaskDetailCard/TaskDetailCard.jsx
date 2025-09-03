export default function TaskDetailCard({ data, onWrapperChange, OID }) {
  // console.log(data[OID].taskTitle);
  // console.log(data.find((item) => item.id === OID));
  const currTask = data.find((item) => item.id === OID);

  return (
    <div
      className="task-detail-card"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="task-form expand-view">
        <div className="expand-header">
          <div className="project-grp">
            <i className="material-symbols-rounded open-folder">inbox</i>
            <p id="open-project">All</p>
          </div>
        </div>

        <div className="open-title-header">
          <h2 id="open-title">{currTask.title}</h2>
          <i
            className={`open-star ${
              currTask.starred ? "fa-solid" : "fa-regular"
            } fa-star`}
            style={{ display: "inline-block" }}
          >
            <div className="shine"></div>
          </i>
        </div>

        <div className="note-wrapper">
          <hr className="note-line" />
          <p id="open-note" style={{ textAlign: "left" }}>
            {typeof currTask.note === typeof []
              ? currTask.note.join("\n\n")
              : currTask.note}
          </p>
          <hr className="bot-note-line" />
        </div>

        <div className="extras-wrapper">
          <div className="btn-group">
            <button
              onClick={() => onWrapperChange("TaskList")}
              className="back-btn fa-sharp fa-solid fa-chevron-left"
            ></button>
          </div>
          <div className="extras">
            <p className="open-date">{currTask.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
