import { useEffect, useState } from "react";
import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";
import "./profile.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

import { getUserProfileData } from "../../services/authService";
import { SET_USER } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import { PacLoader } from "../../components/loader/Loader";

const Profile = () => {
  useRedirectLogOutUser("/login");

  const [profile, setProfile] = useState({
    email: "",
    name: "",
    photo: "",
    phone: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await getUserProfileData();

        if (response.statusCode === 200) {
          setProfile(response.data);
          dispatch(SET_USER(response.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <div className="profile --my2" style={{ marginLeft: "5rem" }}>
      {isLoading && <PacLoader />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Cards cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
              <div>
                <button className="--btn --btn-primary">
                  <Link to="/edit-profile">Edit Profile</Link>
                </button>
              </div>
            </span>
          </Cards>
        )}
      </>
    </div>
  );
};

export default Profile;
