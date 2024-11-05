import { useState, useEffect } from "react";
import { getUserProfile } from "../api/getUserProfile";
import { useNavigate } from "react-router-dom";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (!profile) {
          navigate("/login");
          return;
        }
        setUserProfile(profile);
      } catch (err) {
        setError(err);
      }
    };
    fetchUserProfile();
  }, []);

  return { userProfile, error };
};

export default useUserProfile;
