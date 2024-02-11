import serverMaintenence from "../../assets/serverMain.jpg";

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
        <img
          src={serverMaintenence}
          alt="page not found"
          style={{ height: "90vh", width: "90vh" }}
        />
      </div>
      <div>
        <p>OH ho! Server Under maintanence</p>
      </div>
    </div>
  );
};

export default ServerMaintanence;
