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

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/" element={<MainPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/terms" element={<TermsPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/local" element={<LocalLoginPage />} />

          <Route path="/find/id" element={<FindIdPage />} />
          <Route path="/find/pw" element={<ResetPasswordPage />} />

          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
