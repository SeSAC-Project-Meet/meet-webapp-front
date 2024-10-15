export default function PhoneLoginButton() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          height: 45,
          paddingLeft: 14,
          paddingRight: 14,
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px black solid",
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <div style={{ width: 24, height: 24, position: "relative" }}>
          <div
            style={{
              width: 5,
              height: 1,
              left: 9.5,
              top: 17.93,
              position: "absolute",
              background: "black",
            }}
          ></div>
          <div
            style={{
              width: 13.94,
              height: 19.87,
              left: 5.03,
              top: 2.06,
              position: "absolute",
              background: "black",
            }}
          ></div>
        </div>
        <div
          style={{
            width: 150,
            textAlign: "center",
            color: "black",
            fontSize: 15,
            fontFamily: "Apple SD Gothic Neo",
            fontWeight: "600",
            lineHeight: 22.5,
            wordWrap: "break-word",
          }}
        >
          전화번호로 로그인
        </div>
      </div>
    </div>
  );
}
