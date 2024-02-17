import {
  LoginFormData,
  RegisterFormData,
  forgotPasswordFormData,
  resetPasswordFormData,
} from "../types/types";
import { handleRequest } from "./requestHandler";

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

export const getUserProfileData = async () => {
  const response = await handleRequest(
    "get",
    "/api/v1/users/user-data",
    null,
    {}
  );
  return response;
};

export const updateProfileData = async (userData: FormData) => {
  const response = await handleRequest(
    "patch",
    "/api/v1/users/update-user",
    userData,
    {},
    "Profile updated successfully"
  );
  return response;
};

export const changePassword = async (userData: any) => {
  const Response = await handleRequest(
    "patch",
    "/api/v1/users/change-password",
    userData,
    {},
    "Password changed successfully"
  );
  return Response;
};
