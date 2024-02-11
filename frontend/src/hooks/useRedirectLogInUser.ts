import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { GetLoginStatus } from "../services/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const useRedirectLogOutUser = (path: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: isLoggedIn } = await GetLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (isLoggedIn) {
        toast.error("User already logged in.");
        navigate(path);
        return;
      }
    })();
  }, [dispatch, navigate, path]);
};

export default useRedirectLogOutUser;
