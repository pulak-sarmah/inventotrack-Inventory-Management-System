import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import { CreateProductFormData } from "../../types/types";
import { AppDispatch } from "../../redux/store";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./addProduct.module.scss";

const initialState: CreateProductFormData = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductFormData>({
    defaultValues: initialState,
  });
  const dispatch: AppDispatch = useDispatch();

  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const generateKSKU = (category: string) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (data: CreateProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sku", generateKSKU(data.category));
    formData.append("category", data.category);
    formData.append("quantity", data.quantity.toString());
    formData.append("price", data.price.toString());
    formData.append("description", description);
    if (productImage) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(productImage.type)) {
        toast.error("Invalid image type. Only jpg, jpeg, png are allowed");
        return;
      }
      formData.append("image", productImage);
    }
    const strippedDescription = description.replace(/<[^>]*>?/gm, "").trim();

    if (!strippedDescription) {
      toast.error("Description cannot be empty");
      return;
    }

    await dispatch(createProduct(formData));

    reset();
    setProductImage(null);
    setImagePreview(null);
    setDescription("");
  };

  return (
    <div className={styles.addProduct}>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        register={register}
        errors={errors}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleImageChange={handleImageChange}
        onSubmit={handleSubmit(saveProduct)}
      />
    </div>
  );
};

export default AddProduct;
