import { Link } from "react-router-dom";
import { IProduct, ProductListProps } from "../../../types/types";
import { PacLoader } from "../../loader/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import "./productList.scss";
import { useEffect, useState } from "react";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { AppDispatch } from "../../../redux/store";
import ReactPaginate from "react-paginate";

const ProductList = ({ products, isLoading }: ProductListProps) => {
  const [value, setValue] = useState("");
  const filteredProduct = useSelector(selectFilteredProducts);

  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const shortenText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      const shortenedText = text.substring(0, maxLength).concat("...");

      return shortenedText;
    }
    return text;
  };

  //Pagination
  const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProduct.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProduct.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProduct]);

  const handlePageClick = (data: { selected: number }) => {
    const newOffset = (data.selected * itemsPerPage) % filteredProduct.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, value }));
    setItemOffset(0);
  }, [dispatch, products, value]);

  return (
    <div className="product-list">
      <hr />

      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search value={value} onSearch={handleSearch} />
          </span>
        </div>

        {isLoading && <PacLoader />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>
              No Products found, You can add products by clicking
              <Link
                to={"/add-product"}
                style={{
                  marginLeft: "0.5rem",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                here
              </Link>
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, category, name, quantity, price } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>{`₹${" "}${price}`}</td>
                      <td>{quantity}</td>
                      <td>{`₹${" "} ${Number(price) * Number(quantity)}`}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <AiOutlineEye size={20} color={"purpule"} />
                          </Link>
                        </span>

                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>

                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaTrash size={20} color={"red"} />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
