export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface forgotPasswordFormData {
  email: string;
}

export interface resetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

import { IconType } from "react-icons";

export interface ChildItem {
  title: string;
  path: string;
  id: number;
}

export interface Item {
  title: string;
  icon: React.ReactElement<IconType>;
  path?: string;
  childrens?: ChildItem[];
  id: number;
}
