import { Link } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import styles from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import { LoginFormData } from "../../types/types";
import Loader from "../../components/loader/Loader";
import { useAuthSubmit } from "../../hooks/useAuthSubmit";
import { loginUser } from "../../services/authService";
import useRedirectLogInUser from "../../hooks/useRedirectLogInUser";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const { isLoading, onSubmit } = useAuthSubmit(loginUser, reset, "/dashboard");

  const onSubmitForm = (formData: LoginFormData) => {
    onSubmit(formData);
  };

  useRedirectLogInUser("/");

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Cards cardClass="red">
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={handleSubmit(onSubmitForm)}>
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

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "this filed is required",
              })}
            />
            {errors.password && (
              <p className="--form-error">{errors.password.message}</p>
            )}
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/forgotPass">Forgot Password</Link>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p className="--font-1">&nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Cards>
    </div>
  );
};

export default Login;
