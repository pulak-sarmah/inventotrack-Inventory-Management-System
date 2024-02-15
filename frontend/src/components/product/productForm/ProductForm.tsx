import { FieldErrors, UseFormRegister } from "react-hook-form";

import "./productForm.scss";
import { CreateProductFormData } from "../../../types/types";
import Cards from "../../cards/Cards";
import { Tiptap } from "./textEditor/TipTap";

interface ProductFormProps {
  register: UseFormRegister<CreateProductFormData>;
  errors: FieldErrors<CreateProductFormData>;
  productImage?: File | null;
  imagePreview: string | null;
  description: string;
  setDescription: (description: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProductForm = ({
  register,
  errors,
  imagePreview,
  // description,
  setDescription,
  handleImageChange,
  onSubmit,
}: ProductFormProps) => {
  return (
    <div className="add-product">
      <Cards cardClass={"card"}>
        <form onSubmit={onSubmit}>
          <Cards cardClass={"group"}>
            <label>Product Image:</label>
            <code className="--note">Supported Formats: jpg, jpeg, png</code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview !== null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Product" />
              </div>
            ) : (
              <p>No Image set for this product</p>
            )}
          </Cards>
          <label>Product Name:</label>
          <input
            type="text"
            autoComplete="name"
            placeholder="product Name"
            {...register("name", {
              required: "this filed is required",
              minLength: {
                value: 2,
                message: "name must be at least 2 character long",
              },
              pattern: {
                value: /^[a-zA-Z0-9\s-]+$/,
                message: "name must contain only alphabets and numbers",
              },
            })}
          />
          {errors.name && <p className="--form-error">{errors.name.message}</p>}

          <label>Product Category:</label>
          <input
            type="text"
            autoComplete="Product Category"
            placeholder="Product Category"
            {...register("category", {
              required: "this filed is required",
              pattern: {
                value: /^[a-zA-Z0-9\s-]+$/,
                message: "Category must contain only alphabets and numbers",
              },
            })}
          />
          {errors.category && (
            <p className="--form-error">{errors.category.message}</p>
          )}

          <label>Product Price:</label>
          <input
            type="text"
            autoComplete="price"
            {...register("price", {
              required: "this filed is required",
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: "price must contain only valid numbers",
              },
            })}
          />
          {errors.price && (
            <p className="--form-error">{errors.price.message}</p>
          )}

          <label>Product Quantity:</label>
          <input
            type="text"
            autoComplete="quantity"
            {...register("quantity", {
              required: "this filed is required",
              pattern: {
                value: /^[0-9][0-9]*$/,
                message: "quantity must contain only valid numbers",
              },
            })}
          />
          {errors.quantity && (
            <p className="--form-error">{errors.quantity.message}</p>
          )}

          <label>Product Description:</label>

          <div className="ProseMirror">
            <Tiptap setDescription={setDescription} />
          </div>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Cards>
    </div>
  );
};

export default ProductForm;
