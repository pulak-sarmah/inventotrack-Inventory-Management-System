import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import Loader from "./components/loader/Loader";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPass = lazy(() => import("./pages/auth/ForgotPass"));
const Reset = lazy(() => import("./pages/auth/Reset"));
const SideBar = lazy(() => import("./components/sideBar/SideBar"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Layout = lazy(() => import("./layout/Layout"));
const PageNotFound = lazy(() => import("./pages/others/PageNotFound"));
const ServerMaintanence = lazy(
  () => import("./pages/others/ServerMaintanence")
);
const AddProduct = lazy(() => import("./pages/addProduct/AddProduct"));
const ProductDetail = lazy(
  () => import("./pages/productDetails/ProductDetail")
);
const EditProduct = lazy(() => import("./pages/editProduct/EditProduct"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const EditProfile = lazy(() => import("./pages/profile/EditProfile"));
const Contact = lazy(() => import("./pages/contact/Contact"));

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
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
