import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPass from "./pages/auth/ForgotPass";
import Reset from "./pages/auth/Reset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgotPass" element={<ForgotPass />}></Route>
        <Route path="/resetpassword/:resetToken" element={<Reset />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
