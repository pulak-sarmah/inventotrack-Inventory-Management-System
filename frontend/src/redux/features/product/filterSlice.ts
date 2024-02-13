import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/types";

interface Product {
  filteredProducts: IProduct[];
}
const initialState: Product = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS: (state, action) => {
      const { products, value } = action.payload;
      const tempProduct = products.filter(
        (product: IProduct) =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.category.toLowerCase().includes(value.toLowerCase())
      );
      state.filteredProducts = tempProduct;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state: { filter: Product }) =>
  state.filter.filteredProducts;

export default filterSlice.reducer;
