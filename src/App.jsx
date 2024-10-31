<<<<<<< HEAD
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
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
=======
import "./App.css";

import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <>
      <MainPage />
    </>
>>>>>>> develop/draft
  );
}

export default App;
