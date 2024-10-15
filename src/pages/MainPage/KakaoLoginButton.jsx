export default function KakaoLoginButton() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingLeft: 14,
        paddingRight: 14,
        background: "#FEE500",
        borderRadius: 12,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        display: "inline-flex",
      }}
    >
      <div style={{ width: 18, height: 18, position: "relative" }}>
        <div
          style={{
            width: 18,
            height: 16.8,
            left: 0,
            top: 0.6,
            position: "absolute",
            background: "black",
          }}
        ></div>
      </div>
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          display: "flex",
        }}
      >
        <div
          style={{
            color: "rgba(0, 0, 0, 0.85)",
            fontSize: 15,
            fontFamily: "Apple SD Gothic Neo",
            fontWeight: "600",
            lineHeight: 22.5,
            wordWrap: "break-word",
          }}
        >
          카카오톡으로 로그인
        </div>
      </div>
    </div>
  );
}
