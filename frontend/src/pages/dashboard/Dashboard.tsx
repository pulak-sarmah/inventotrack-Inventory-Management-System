import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";

const Dashboard = () => {
  useRedirectLogOutUser("/login");
  return (
    <div style={{ paddingLeft: "5rem" }}>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
