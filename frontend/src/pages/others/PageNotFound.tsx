import { useNavigate } from "react-router-dom";
import pageNotFound from "../../assets/notFound.jpg";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "2rem",
      }}
    >
      <div>
        <img
          src={pageNotFound}
          alt="page not found"
          style={{ height: "90vh", width: "90vh" }}
        />
      </div>
      <button className="--btn --btn-primary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default PageNotFound;
