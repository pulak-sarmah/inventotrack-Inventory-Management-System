import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPass from "./pages/auth/ForgotPass";
import Reset from "./pages/auth/Reset";
import SideBar from "./components/sideBar/SideBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./layout/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <ToastContainer style={{ fontSize: "1.5rem" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/reset-password/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <SideBar>
              <Layout>
                <Dashboard />
              </Layout>
            </SideBar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
