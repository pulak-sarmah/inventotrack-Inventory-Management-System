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
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./pages/productDetails/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";

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

        <Route
          path={"/add-product"}
          element=<SideBar>
            <Layout>
              <AddProduct />
            </Layout>
          </SideBar>
        />

        <Route
          path={"/product-detail/:id"}
          element=<SideBar>
            <Layout>
              <ProductDetail />
            </Layout>
          </SideBar>
        />

        <Route
          path={"/edit-product/:id"}
          element=<SideBar>
            <Layout>
              <EditProduct />
            </Layout>
          </SideBar>
        />

        <Route
          path={"/profile"}
          element=<SideBar>
            <Layout>
              <Profile />
            </Layout>
          </SideBar>
        />

        <Route
          path={"/edit-profile"}
          element=<SideBar>
            <Layout>
              <EditProfile />
            </Layout>
          </SideBar>
        />

        <Route
          path={"/contact-us"}
          element=<SideBar>
            <Layout>
              <Contact />
            </Layout>
          </SideBar>
        />
      </Routes>
    </Router>
  );
}

export default App;
