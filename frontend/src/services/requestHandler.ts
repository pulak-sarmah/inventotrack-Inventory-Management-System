import axios, { Method, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  RegisterFormData,
  LoginFormData,
  forgotPasswordFormData,
  resetPasswordFormData,
  ProductData,
} from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const handleRequest = async (
  method: Method,
  url: string,
  data:
    | RegisterFormData
    | LoginFormData
    | forgotPasswordFormData
    | resetPasswordFormData
    | ProductData
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
