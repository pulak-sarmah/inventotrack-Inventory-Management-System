import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, selectName } from "../../redux/features/authSlice";
import { logOutUser } from "../../services/authService";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      logOutUser();
      localStorage.removeItem("name");
      dispatch(SET_LOGIN(false));
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" header header_content">
      {isLoading && <Loader />}
      <div
        className=" --flex-between"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h3>
          <span className="--fw-thin ">Welcome,</span>
          <span className="--color-danger ">&nbsp;{name}</span>
        </h3>

        <button
          onClick={handleLogout}
          style={{ marginBottom: "1rem" }}
          className="--btn --btn-danger"
        >
          LogOut
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
