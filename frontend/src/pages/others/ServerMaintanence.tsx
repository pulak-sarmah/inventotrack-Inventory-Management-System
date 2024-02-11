import serverError from "../../assets/ServerError.json";
import Lottie from "lottie-react";

const ServerMaintanence = () => {
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
        <Lottie animationData={serverError} loop={true} />
      </div>
      <div>
        <p>OH ho! Server Under maintanence</p>
      </div>
    </div>
  );
};

export default ServerMaintanence;
