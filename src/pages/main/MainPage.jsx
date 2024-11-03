import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getUserProfile } from "../../api/getUserProfile";

export const MainPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleGetProfile = async () => {
    const userprofile = await getUserProfile();
    alert(userprofile);
  };

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
    }
  });

  return (
    <div>
      <h1>Main Page</h1>
      <p>username: {user}</p>
      <button onClick={handleGetProfile}>Get Profile</button>
    </div>
  );
};
