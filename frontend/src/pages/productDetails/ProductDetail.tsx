import { useDispatch, useSelector } from "react-redux";
import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";
import "./productDetail.scss";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getProduct } from "../../redux/features/product/productAsyncThunks";
import Cards from "../../components/cards/Cards";
import DOMPurify from "dompurify";
import { PacLoader } from "../../components/loader/Loader";

const ProductDetail = () => {
  useRedirectLogOutUser("/login");
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }
  }, [isLoggedIn, dispatch, id]);

  const stockStatus = (quantity: number) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  return (
    <div className="product-detail" style={{ paddingLeft: "5rem" }}>
      <h3 className="--mt">Product Detail</h3>
      <Cards cardClass="card">
        {isLoading && <PacLoader />}
        {product && (
          <div className="detail">
            <Cards cardClass="group">
              {product?.image && !isLoading ? (
                <div className="image-box">
                  <img
                    src={product.image.filePath as string}
                    alt={product.image.fileName as string}
                  />
                </div>
              ) : (
                <p>No image set for this product</p>
              )}
            </Cards>
            <h4>Product Availability: {stockStatus(+product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"₹"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b>
              {+product.price * +product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt?.toLocaleString("en-In")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt?.toLocaleString("en-")}
            </code>
          </div>
        )}
      </Cards>
    </div>
  );
};

export default ProductDetail;
