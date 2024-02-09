import Cards from "../../components/cards/Cards";
import styles from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa";
import { forgotPasswordFormData } from "../../types/types";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className={`container ${styles.auth}`}>
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
          </form>
        </div>
      </Cards>
    </div>
  );
};

export default ForgotPass;
