import Cards from "../../components/cards/Cards";
import styles from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa";
import { forgotPasswordFormData } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../../components/loader/Loader";

const ForgotPass = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<forgotPasswordFormData>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      forgotPassword(data);
      reset();
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Cards cardClass="red">
        <div className={styles.form}>
          <div className="--flex-center">
            <FaRegEnvelope size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "this filed is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="--form-error">{errors.email.message}</p>
            )}
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Link
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">-Home</Link>
              </p>
              <p>
                <Link to="/login">-Login</Link>
              </p>
            </div>
            <p className="--note">
              * Didn't get any mail? Check your spam folder
            </p>
          </form>
        </div>
      </Cards>
    </div>
  );
};

export default ForgotPass;
