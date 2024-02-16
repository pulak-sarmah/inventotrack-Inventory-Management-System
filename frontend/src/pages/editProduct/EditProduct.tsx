import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectIsLoading,
  selectProduct,
} from "../../redux/features/product/productSlice";
import { AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  getProduct,
  updateProduct,
} from "../../redux/features/product/productAsyncThunks";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";
import { useForm } from "react-hook-form";
import { CreateProductFormData } from "../../types/types";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import styles from "./editProduct.module.scss";

const EditProduct = () => {
  useRedirectLogOutUser("/login");
  const productEdit = useSelector(selectProduct);
  const { id } = useParams<string>();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }
  }, [isLoggedIn, dispatch, id]);

  const [productImage, setProductImage] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState<null | File>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (productEdit) {
      setProductImage(productEdit.image.filePath);
      setImagePreview(productEdit.image.filePath);
      setDescription(productEdit.description);
    }
  }, [productEdit]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductFormData>();

  useEffect(() => {
    if (productEdit) {
      reset({
        name: productEdit.name,
        category: productEdit.category,
        quantity: productEdit.quantity,
        price: productEdit.price,
      });
    }
  }, [productEdit, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]) as any);
    }
  };

  const saveProduct = async (data: CreateProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("quantity", data.quantity.toString());
    formData.append("price", data.price.toString());
    formData.append("description", description);
    if (productImage instanceof File) {
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

    if (id) {
      await dispatch(updateProduct({ id, formData }));

      navigate("/dashboard");
    }

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

export default EditProduct;
