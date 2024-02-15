import "./productSummary.scss";

import { BsCart4, BsCartX } from "react-icons/bs";
import { MdOutlineCurrencyRupee } from "react-icons/md";

import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../../types/types";
import {
  CALC_OUT_OF_STOCK,
  CALC_STORE_VALUE,
  TOTAL_CATEGORIES,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";
import { AppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import { formatNumbers } from "../../../utils/formatNumber";

// Icons
const earningIcon = <MdOutlineCurrencyRupee size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const ProductSummary = ({ products }: { products: IProduct[] }) => {
  const dispatch: AppDispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUT_OF_STOCK(products));
    dispatch(TOTAL_CATEGORIES(products));
  }, [products, dispatch]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length.toString()}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={formatNumbers(totalStoreValue)}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock.toString()}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.toString()}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
