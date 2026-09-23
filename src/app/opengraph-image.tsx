import { ImageResponse } from "next/og";

export const alt = "Zetta Metrics — AI-native automation platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #050b14 0%, #0a1420 55%, #0d1b2a 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(47,225,214,0.35), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(122,143,255,0.28), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 40,
            fontWeight: 800,
            color: "#f3f6fa",
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(150deg, #17c7bd, #0a9089)",
              color: "#04141a",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            Z
          </div>
          <div style={{ display: "flex" }}>
            Zetta<span style={{ color: "#2fe1d6" }}>Metrics</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#f3f6fa",
            maxWidth: 900,
            letterSpacing: "-0.02em",
          }}
        >
          Turn manual work into intelligent workflows.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#a3b1c2",
          }}
        >
          AI-native automation platform
        </div>
      </div>
    ),
    { ...size }
  );
}
