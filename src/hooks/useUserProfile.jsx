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
          // 프로필이 없거나, 로그인페이지가 아니거나, 회원가입 페이지가 아니면
          // 로그인 페이지로 ㄱㄱ
          console.log("사용자 정보가 없어서 로그인 페이지로 이동");
          navigate("/login");
          return;
        } else {
          setUserProfile(profile);
        }
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
