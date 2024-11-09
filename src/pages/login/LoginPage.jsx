import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { LoginSelectMethodPage } from "./LoginSelectMethodPage";
import { useEffect } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user.user_id) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <LoginSelectMethodPage />
    </div>
  );
}
