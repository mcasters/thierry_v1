import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: "Thierry Casters",
    name: "Oeuvres de Thierry Casters",
    start_url: "/",
    background_color: "#eee",
    display: "standalone",
    theme_color: "#24445C",
  };
}
