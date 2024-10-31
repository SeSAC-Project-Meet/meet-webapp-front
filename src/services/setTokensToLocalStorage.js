export const setTokensToLocalStorage = (accessToken, refreshToken) => {
  // TODO : electron-store로 변경할 필요 있음
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
