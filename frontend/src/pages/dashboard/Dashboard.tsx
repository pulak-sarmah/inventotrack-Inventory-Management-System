import { useDispatch, useSelector } from "react-redux";
import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductList from "../../components/product/ProductList/ProductList";
import { AppDispatch, RootState } from "../../redux/store";

const Dashboard = () => {
  useRedirectLogOutUser("/login");
  const dispatch: AppDispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, isError, dispatch]);

  return (
    <div className="--mt" style={{ paddingLeft: "5rem" }}>
      <h2>
        <ProductList products={products} isLoading={isLoading} />
      </h2>
    </div>
  );
};

export default Dashboard;
