import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getUserProfile } from "../../api/getUserProfile";
import { createChatroom } from "../../api/createChatroom";

export const MainPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleGetProfile = async () => {
    const userprofile = await getUserProfile();
    alert(userprofile);
  };

  const handleCreateChatroom = async () => {
    // TODO : name 변경 필요
    const chatroom = await createChatroom({ name: "chatroom" });
    console.log(chatroom);
    alert(chatroom.c_id, chatroom.uc_id);
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
      <br />
      <button onClick={handleCreateChatroom}>Get Chatroom</button>
      <br />
      <Link to="/login">Go to Login</Link>
      <br />
      <Link to="/chat">Go to Chat</Link>
    </div>
  );
};
