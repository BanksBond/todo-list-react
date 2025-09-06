import "./spinner.css";

function Spinner({ size, color }) {
  return (
    <i
      style={{ fontSize: size, color: "var(--dk-text)" }}
      className="fa-solid fa-spinner fa-spin spinner"
    ></i>
  );
}

export default Spinner;
