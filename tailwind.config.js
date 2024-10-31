/** @type {import('tailwindcss').Config} */
export default {
<<<<<<< HEAD
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#FFF7F3", // 바탕색
        "container-bg-primary": "#FFDBC9", // Container 기본 색
        "input-bg": "#FFFFFF", // Input 내부 색
        "input-border": "#F5A489", // Input 테두리 기본 색
        "input-border-hover": "#FF8C6A", // Input 테두리 호버 색
        "input-border-focused": "#FF7A45", // Input 테두리 포커스 색
        "text-primary": "#3C3C3C", // 기본 글자 색깔
        "text-secondary": "#5A5A5A", // 보조 글자 색깔
        "text-inactivated": "#A3A3A3", // 비활성화된 글자 색깔
        "button-bg-primary": "#FF7A45", // 버튼 기본 색
        "button-bg-focused": "#D65B33", // 버튼 포커스 색
        "button-bg-hover": "#FF8C6A", // 버튼 호버 색
        "button-border-hover": "#E06C4C", // 버튼 테두리 호버 색
        "button-border-focused": "#C74725", // 버튼 테두리 포커스 색
      },
    },
    fontFamily: {
      primary: ["Gmarket Sans", "sans-serif"],
    },
=======
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
>>>>>>> develop/draft
  },
  plugins: [],
};
