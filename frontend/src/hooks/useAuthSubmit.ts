import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN, SET_NAME } from "../redux/features/auth/authSlice";
import { RegisterFormData, LoginFormData } from "../types/types";

interface RegisterUserFunction {
  (userData: RegisterFormData): Promise<any>;
}

interface LoginUserFunction {
  (userData: LoginFormData): Promise<any>;
}

type AuthFunction = RegisterUserFunction | LoginUserFunction;

export const useAuthSubmit = (
  authFunction: AuthFunction,
  reset: () => void,
  navigateTo: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData: any) => {
    setIsLoading(true);

    try {
      const response = await authFunction(formData);

      if (response && response.data) {
        dispatch(SET_LOGIN(true));
        dispatch(SET_NAME(response.data.name));
        reset();
        navigate(navigateTo);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
};
