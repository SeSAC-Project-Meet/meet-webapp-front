import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { LoginSelectMethodPage } from "./LoginSelectMethodPage";
import { useEffect } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
<<<<<<< HEAD
    if (user.user_id) {
=======
    if (user?.user_id) {
      console.log(
        "로그인 페이지 : 사용자 정보가 존재해 메인페이지로 이동합니다."
      );
>>>>>>> 48dc07c4378d8e3e8e647eec9705ea115b22f8cc
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <LoginSelectMethodPage />
    </div>
  );
}
