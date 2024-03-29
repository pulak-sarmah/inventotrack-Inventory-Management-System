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

export interface AuthState {
  isLoggedIn: boolean;
  name: string;
  user: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    photo: string;
  };
}
export interface ProductUser {
  _id: string;
  name: string;
  email: string;
}
export interface IProduct {
  _id: string;
  user: ProductUser;
  name: string;
  sku: string;
  category: string;
  quantity: string;
  price: string;
  description: string;
  image: Record<string | File>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductState {
  product: IProduct;
  products: IProduct[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  totalStoreValue: number;
  outOfStock: number;
  category: string[];
  shouldFetch: boolean;
}

export interface CreateProductFormData {
  name: string;
  category: string;
  quantity: string;
  price: string;
}

export interface ProductData {
  name: string;
  sku?: string;
  category: string;
  quantity: string;
  price: string;
  description: string;
  productImage: File | null;
}

export interface ProductListProps {
  products: IProduct[];
  isLoading: boolean;
}
