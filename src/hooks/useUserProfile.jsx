import { useState, useEffect } from "react";
import { getUserProfile } from "../api/getUserProfile";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        console.log(
          `[useUserProfile] 유저 정보를 가져왔습니다.\nUserProfile : ${userProfile}`
        );
      } catch (err) {
        setError(err);
      }
    };

    fetchUserProfile();
    console.log(
      `[useUserProfile] 유저 정보를 가져왔습니다.\nStrictMode가 아니면 한 번만 로드되어야 합니다.\nUserProfile : ${userProfile}`
    );
  }, []);

  return { userProfile, error };
};

export default useUserProfile;
