import unauthhorized from "../../assets/images/unauthhorized.png";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="unauthorized">
        <img src={unauthhorized} alt="unauthorized" />
        <h2>Unauthorized</h2>
        <p>You are not authorized to view this page</p>
        <button className="--btn --btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
