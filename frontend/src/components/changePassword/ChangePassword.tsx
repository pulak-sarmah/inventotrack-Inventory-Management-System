import { useForm } from "react-hook-form";
import "./changePassword.scss";
import Cards from "../cards/Cards";
import { changePassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await changePassword(data);

    if (response) {
      navigate("/dashboard");
    }
    reset();
  });
  return (
    <div className="change-password">
      <Cards cardClass={"password-card"}>
        <h3>Change Password</h3>
        <form className="--form-control" onSubmit={onSubmit}>
          <input
            type="password"
            placeholder="Old Password"
            {...register("oldPassword", {
              required: "this filed is required",
              minLength: {
                value: 6,
                message: "password must be at least 6 character long",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                message:
                  "password must contain at least one letter and one number and one special character",
              },
            })}
          />
          {errors.oldPassword && (
            <p className="--form-error">{errors.oldPassword.message}</p>
          )}

          <input
            type="password"
            placeholder="New Password"
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
            placeholder="Confirm New Password"
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
          <button type="submit" className="--btn --btn-primary">
            Change Password
          </button>
        </form>
      </Cards>
    </div>
  );
};

export default ChangePassword;
