import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { LoginSelectMethodPage } from "./LoginSelectMethodPage";
import { useEffect } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user?.user_id) {
      console.log(
        "로그인 페이지 : 사용자 정보가 존재해 메인페이지로 이동합니다."
      );
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <LoginSelectMethodPage />
    </div>
  );
}
