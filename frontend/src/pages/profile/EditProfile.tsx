import { useEffect, useState } from "react";
import "./profile.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";
import Cards from "../../components/cards/Cards";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { updateProfileData } from "../../services/authService";
import { toast } from "react-toastify";
import ChangePassword from "../../components/changePassword/ChangePassword";

export interface ProfileData {
  name: string;
  email: string;
  bio: string;
  phone: string;
}

const EditProfile = () => {
  useRedirectLogOutUser("/login");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
    },
  });

  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    if (user?.email === "") {
      navigate("/profile");
    }
  }, [navigate, user.email]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof ProfileData]);
      });

      if (photo) {
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validImageTypes.includes(photo.type)) {
          toast.error("Invalid image type. Only jpg, jpeg, png are allowed");
          return;
        }
        formData.append("photo", photo);
      }

      await updateProfileData(formData);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      console.log("done");
    }
  });

  return (
    <div className="profile --my2" style={{ marginLeft: "5rem" }}>
      {isLoading && <Loader />}

      <Cards cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={onSubmit}>
          <span className="profile-data">
            <div>
              <label>Name: {user.name}</label>
              <input
                type="text"
                {...register("name", {
                  required: false,
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
            </div>
            <div>
              <label>Email:</label>
              <input type="text" name="email" value={user.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                {...register("phone", {
                  required: false,
                  minLength: {
                    value: 10,
                    message: "invalid phone number, must be 10 digit long",
                  },
                  pattern: {
                    value: /^[1-9][0-9]{9}$/,
                    message: "invalid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="--form-error">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label>Bio:</label>
              <textarea
                cols={30}
                rows={10}
                {...register("bio", {
                  required: false,
                  minLength: {
                    value: 2,
                    message: "too Short",
                  },
                })}
              />
            </div>
            <div>
              <label>Photo:</label>
              <input
                type="file"
                name="photo"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Cards>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
