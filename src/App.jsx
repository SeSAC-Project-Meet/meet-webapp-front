import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { UserProvider } from "./contexts/UserContext";
import { MainPage } from "./pages/main/MainPage";
import { LocalLoginPage } from "./pages/login/LocalLoginPage";
import { ResetPasswordPage } from "./pages/lostandfound/ResetPasswordPage";
import { FindIdPage } from "./pages/lostandfound/FindIdPage";
import { NotFoundPage } from "./pages/statuscode/NotFoundPage";
import { TermsPage } from "./pages/register/TermsPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { ChatroomPage } from "./pages/chat/ChatroomPage";
import { EmailCheckNonUser } from "./pages/register/EmailCheck.jsx";
import { VideoCallPage } from "./pages/videocall/VideoCallPage";
import { GroupCallPage } from "./pages/videocall/GroupCallPage";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/" element={<MainPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/terms" element={<TermsPage />} />
          {/*<Route path="/email-check" element={<EmailCheck />} />*/}
          <Route path="/email-check" element={<EmailCheckNonUser />} />
          {/*<Route path="/email-check" element={<EmailCheckUser />} />*/}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/local" element={<LocalLoginPage />} />

          <Route path="/find/id" element={<FindIdPage />} />
          <Route path="/find/pw" element={<ResetPasswordPage />} />

          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:chatroomId" element={<ChatroomPage />} />

          <Route path="/videocall" element={<VideoCallPage />} />
          <Route path="/groupcall" element={<GroupCallPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
