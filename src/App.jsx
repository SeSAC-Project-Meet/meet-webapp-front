import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { UserProvider } from "./contexts/UserContext";
import { MainPage } from "./pages/main/MainPage";
import { LoginContainer } from "./pages/login/LoginContainer";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login/" element={<LoginPage />} />
          <Route path="/login/local" element={<LoginContainer />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
