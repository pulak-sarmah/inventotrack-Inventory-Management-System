import { useDispatch, useSelector } from "react-redux";
import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { selectShouldFetch } from "../../redux/features/product/productSlice";
import ProductList from "../../components/product/ProductList/ProductList";
import { AppDispatch, RootState } from "../../redux/store";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import { getProducts } from "../../redux/features/product/productAsyncThunks";

const Dashboard = () => {
  useRedirectLogOutUser("/login");
  const dispatch: AppDispatch = useDispatch();

  const shouldFetch = useSelector(selectShouldFetch);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (isLoggedIn && shouldFetch) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, isError, dispatch, shouldFetch]);

  return (
    <div className="--mt" style={{ paddingLeft: "5rem" }}>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
