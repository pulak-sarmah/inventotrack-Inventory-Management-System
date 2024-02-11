import axios, { AxiosResponse, Method } from "axios";
import {
  LoginFormData,
  RegisterFormData,
  forgotPasswordFormData,
  resetPasswordFormData,
} from "../types/types";
import { toast } from "react-toastify";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const handleRequest = async (
  method: Method,
  url: string,
  data:
    | RegisterFormData
    | LoginFormData
    | forgotPasswordFormData
    | resetPasswordFormData
    | null = null,
  params: object = {},
  successMessage: string = "Request successful"
): Promise<AxiosResponse["data"] | void> => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      params,
    });

    if (response.status >= 200 && response.status < 300) {
      toast.success(successMessage);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const registerUser = async (userData: RegisterFormData) =>
  handleRequest(
    "post",
    "/api/v1/users/register",
    userData,
    {},
    "User registered successfully"
  );

export const loginUser = async (userData: LoginFormData) =>
  handleRequest(
    "post",
    "/api/v1/users/login",
    userData,
    {},
    "User logged in successfully"
  );

export const logOutUser = async () => {
  handleRequest(
    "get",
    "/api/v1/users/logout",
    null,
    {},
    "User loggedOut successfully "
  );
};

export const forgotPassword = async (userData: forgotPasswordFormData) => {
  handleRequest(
    "post",
    "/api/v1/users/forgot-password",
    userData,
    {},
    "Password reset link sent successfully"
  );
};

export const resetPassword = async (
  userData: resetPasswordFormData,
  resetToken: string | undefined
) => {
  handleRequest(
    "put",
    `/api/v1/users/reset-password/${resetToken}`,
    userData,
    {},
    "Password reset successfully please login to continue"
  );
};
