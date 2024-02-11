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
  successMessage?: string
): Promise<AxiosResponse["data"] | void> => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      params,
    });

    if (successMessage) {
      if (response.status >= 200 && response.status < 300) {
        toast.success(successMessage);
      }
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

export const registerUser = async (userData: RegisterFormData) => {
  const response = await handleRequest(
    "post",
    "/api/v1/users/register",
    userData,
    {},
    "User registered successfully"
  );

  return response;
};

export const loginUser = async (userData: LoginFormData) => {
  const response = await handleRequest(
    "post",
    "/api/v1/users/login",
    userData,
    {},
    "User logged in successfully"
  );
  return response;
};

export const logOutUser = async () => {
  const response = await handleRequest(
    "get",
    "/api/v1/users/logout",
    null,
    {},
    "User loggedOut successfully "
  );
  return response;
};

export const forgotPassword = async (userData: forgotPasswordFormData) => {
  const response = await handleRequest(
    "post",
    "/api/v1/users/forgot-password",
    userData,
    {},
    "Password reset link sent successfully"
  );
  return response;
};

export const resetPassword = async (
  userData: resetPasswordFormData,
  resetToken: string | undefined
) => {
  const response = await handleRequest(
    "put",
    `/api/v1/users/reset-password/${resetToken}`,
    userData,
    {},
    "Password reset successfully please login to continue"
  );

  return response;
};

export const GetLoginStatus = async () => {
  const response = await handleRequest(
    "get",
    "/api/v1/users/loggedIn-status",
    null,
    {}
  );

  return response;
};
