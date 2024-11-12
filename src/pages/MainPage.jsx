import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import { createChatroom } from "../api/conversations/chat/createChatroom.js";
import { createMeetroom } from "../api/conversations/meetroom/createMeetroom.js";
import { LogoutButton } from "../components/login/LogoutButton.jsx";

export const MainPage = () => {
  const { user } = useUser();
  // const navigate = useNavigate();
  // const { userProfile } = useUserProfile();
  const handleGetProfile = async () => {
    alert(`ID: ${user.user_id}\nNAME : ${user.username}`);
  };

  const handleCreateChatroom = async () => {
    // TODO : name 변경 필요
    const name = prompt("채팅방 이름을 입력하세요: ");
    if (!name) {
      alert("채팅방 이름을 입력하셔야 합니다.");
      return;
    }
    try {
      const chatroom = await createChatroom({ name });
      console.log(chatroom);
      alert(
        `Chatroom ID: ${chatroom.chatroom_id}\nUser Chatroom ID: ${chatroom.user_chatroom_id}`
      );
    } catch (error) {
      console.error(error);
      alert("채팅방 생성에 실패했습니다.");
    }
  };

  const handleCreateMeetroom = async () => {
    // TODO : name 변경 필요
    const meetroom = await createMeetroom({});
    console.log(meetroom);
    alert(
      `Meetroom ID: ${meetroom.meetroom_id}\nUser Meetroom ID: ${meetroom.user_meetroom_id}`
    );
  };

  // useEffect(() => {
  //   if (!user?.user_id) {
  //     console.log(
  //       "메인페이지: 사용자 정보가 없어서 로그인 페이지로 이동합니다."
  //     );
  //     navigate("/login");
  //   }
  // }, [user, navigate]);
  // TEST

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Welcome Back
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {user.username}
          </h2>
          <p className="text-gray-600 mb-6">User ID: {user.user_id}</p>

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

            <button
              onClick={handleCreateMeetroom}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Create Meetroom
            </button>

            <Link
              to="/meet"
              className="block text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Go to Meet
            </Link>

            <Link
              to="/login"
              className="block text-center bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Back to Login
            </Link>

            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};
