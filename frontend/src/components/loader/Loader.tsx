import loaderImg from "../../assets/loader.svg";
import ReactDOM from "react-dom";
import "./loader.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="loading gif..." />
      </div>
    </div>,
    document.getElementById("loader") as HTMLElement
  );
};

export const PacLoader = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="loading gif..." />
    </div>
  );
};

export default Loader;
