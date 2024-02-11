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
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import Loader from "./components/loader/Loader";
import PageNotFound from "./pages/others/PageNotFound";
import ServerMaintanence from "./pages/others/ServerMaintanence";

axios.defaults.withCredentials = true;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function checkLoggedIn() {
      setIsLoading(true);
      try {
        const { data: status } = await GetLoginStatus();
        if (status) {
          dispatch(SET_LOGIN(true));
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (isError) {
    return <ServerMaintanence />;
  }
  return (
    <Router>
      <ToastContainer style={{ fontSize: "1.5rem" }} />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/reset-password/:resetToken" element={<Reset />} />

        <Route
          path={"/dashboard"}
          element=<SideBar>
            <Layout>
              <Dashboard />
            </Layout>
          </SideBar>
        />
      </Routes>
    </Router>
  );
}

export default App;
