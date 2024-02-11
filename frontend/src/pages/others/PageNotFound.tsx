import { useNavigate } from "react-router-dom";

import pageNotFound from "../../assets/pageNotFound.json";
import Lottie from "lottie-react";

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
        <Lottie animationData={pageNotFound} loop={true} />
      </div>
      <button className="--btn --btn-primary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default PageNotFound;
