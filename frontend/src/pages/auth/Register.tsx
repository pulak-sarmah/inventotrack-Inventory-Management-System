import { Link } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import styles from "./auth.module.scss";
import { IoPersonAddOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "../../types/types";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className={`container ${styles.auth}`}>
      <Cards cardClass="red">
        <div className={styles.form}>
          <div className="--flex-center">
            <IoPersonAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "this filed is required",
                minLength: {
                  value: 2,
                  message: "name but be at least 2 character long",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "name must contain only alphabets",
                },
              })}
            />
            {errors.name && (
              <p className="--form-error">{errors.name.message}</p>
            )}
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
            {errors.password && (
              <p className="--form-error">{errors.password.message}</p>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (!value) {
                    return "This field is required";
                  } else if (value !== watch("password")) {
                    return "Passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="--form-error">{errors.confirmPassword.message}</p>
            )}
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Cards>
    </div>
  );
};

export default Register;
