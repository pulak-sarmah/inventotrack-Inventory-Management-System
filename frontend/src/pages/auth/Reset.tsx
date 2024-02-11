import Cards from "../../components/cards/Cards";
import styles from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPasswordFormData } from "../../types/types";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";
import { useState } from "react";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFormData>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { resetToken } = useParams<{ resetToken: string }>();

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    try {
      await resetPassword(formData, resetToken);
      navigate("/login");
      console.log(resetToken);
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
            <MdLockReset size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={onSubmit}>
            <input
              type="password"
              placeholder="new Password"
              {...register("newPassword", {
                required: "this filed is required",
                minLength: {
                  value: 6,
                  message: "password must be at least 6 character long",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "password must contain at least one letter and one number",
                },
              })}
            />
            {errors.newPassword && (
              <p className="--form-error">{errors.newPassword.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (!value) {
                    return "This field is required";
                  } else if (value !== watch("newPassword")) {
                    return "Passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="--form-error">{errors.confirmPassword.message}</p>
            )}
            <button type="submit" className="--btn --btn-primary --btn-block">
              Change Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">-Home</Link>
              </p>
              <p>
                <Link to="/login">-Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Cards>
    </div>
  );
};

export default Reset;
