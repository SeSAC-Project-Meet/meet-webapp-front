import { useState, useEffect } from "react";
import { getUserProfile } from "../api/getUserProfile";
import { useLocation, useNavigate } from "react-router-dom";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (
          !profile &&
          location.pathname !== "/login" &&
          location.pathname !== "/login/local" &&
          location.pathname !== "/register"
        ) {
          navigate("/login");
          return;
        }
        setUserProfile(profile);
      } catch (err) {
        setError(err);
      }
    };
    fetchUserProfile();
    console.log("useUserProfile Fetched user info");
  }, [navigate]);

  return { userProfile, error };
};

export default useUserProfile;
