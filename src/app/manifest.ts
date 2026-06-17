import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZettaMetrics",
    short_name: "ZettaMetrics",
    description: "Turning Data Into Intelligence. Intelligence Into Products.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#3b82f6",
    icons: [
      { src: "/favicon.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
