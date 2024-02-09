import axios, { isAxiosError } from "axios";
import { RegisterFormData } from "../types/types";
import { toast } from "react-toastify";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const registerUser = async (userData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status >= 200 && response.status < 300) {
      toast.success("User registered successfully");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};
