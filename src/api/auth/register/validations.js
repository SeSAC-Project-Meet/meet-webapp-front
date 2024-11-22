export const validatePhoneNumberFormat = (phoneNumber) => {
  // 한국 전화번호 정규식: 010, 011, 016, 017, 018, 019, 02, 031, 032, 033 등
  const phoneRegex =
    /^(010|011|016|017|018|019|02|031|032|033|034|041|042|043|044|051|052|053|054|055|061|062|063|064|070)-\d{3,4}-\d{4}$/;

  if (!phoneRegex.test(phoneNumber)) {
    console.log("[checkUniqueValue] 전화번호 형식 오류");
    return false;
  }

  return true;
};

export const validateEmailFormat = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};
