import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={"ROOT"} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
