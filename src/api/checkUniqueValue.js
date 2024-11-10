import meet from "./checkAuthorized.js";
import { CHECK_UNIQUE } from "./config";

const validatePhoneNumberFormat = (phoneNumber) => {
  // 한국 전화번호 정규식: 010, 011, 016, 017, 018, 019, 02, 031, 032, 033 등
  const phoneRegex =
    /^(010|011|016|017|018|019|02|031|032|033|034|041|042|043|044|051|052|053|054|055|061|062|063|064|070)-\d{3,4}-\d{4}$/;

  if (!phoneRegex.test(phoneNumber)) {
    console.log("[checkUniqueValue] 전화번호 형식 오류");
    return "전화번호는 010-123(4)-5678 형식으로 입력해주세요.";
  }

  return "";
};

const validateEmailFormat = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "유효한 이메일 주소를 입력해주세요.";
  }

  return "";
};

export const checkUniqueValue = async (type, value) => {
  if (type === "phone_number") {
    const phoneError = validatePhoneNumberFormat(value);
    if (phoneError) {
      return phoneError;
    }
  }
  if (type === "email") {
    const emailError = validateEmailFormat(value);
    if (emailError) {
      return emailError;
    }
  }

  try {
    const response = await meet.post(CHECK_UNIQUE, {
      type,
      value,
    });

    console.log("Check Unique Response:", response);

    if (response.status === 200) {
      console.log("Unique value!");
      return true;
    }
  } catch (error) {
    if (error.response.status === 409) {
      return false;
    }
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};
