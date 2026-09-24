import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zetta Metrics",
    short_name: "Zetta Metrics",
    description: "AI-native Ed-Tech platforms and workflow automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#050b14",
    theme_color: "#2fe1d6",
    icons: [
      { src: "/logo-mark.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
