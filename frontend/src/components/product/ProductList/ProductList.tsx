import { Link } from "react-router-dom";
import { ProductListProps } from "../../../types/types";
import { PacLoader } from "../../loader/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import "./productList.scss";

const ProductList = ({ products, isLoading }: ProductListProps) => {
  const shortenText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      const shortenedText = text.substring(0, maxLength).concat("...");

      return shortenedText;
    }
    return text;
  };

  return (
    <div className="product-list">
      <hr />

      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <h3>Search Inventory</h3>
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
                {products.map((product, index) => {
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
      </div>
    </div>
  );
};

export default ProductList;
