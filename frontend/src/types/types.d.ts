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
