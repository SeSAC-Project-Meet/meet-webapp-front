import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/MainPage/LoginPage";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <div>
          <Routes>
            <Route path="/" element={"ROOT"} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<RegisterPage />} /> */}
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
