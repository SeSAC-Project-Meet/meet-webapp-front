import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getUserProfile } from "../../api/getUserProfile";
import { createChatroom } from "../../api/createChatroom";

export const MainPage = () => {
  const { user } = useUser();
  const [userprofile, setUserProfile] = useState({});
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
    console.log(user);
    setUserProfile({ user_id: user.user_id, username: user.username });
    console.log(userprofile);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Welcome Back
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {userprofile.username}
          </h2>
          <p className="text-gray-600 mb-6">User ID: {userprofile.user_id}</p>

          <div className="space-y-4">
            <button
              onClick={handleGetProfile}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              View Profile
            </button>

            <button
              onClick={handleCreateChatroom}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Create Chatroom
            </button>

            <Link
              to="/chat"
              className="block text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Go to Chat
            </Link>

            <Link
              to="/login"
              className="block text-center bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
