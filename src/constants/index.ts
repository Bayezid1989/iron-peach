import { Environment } from "@/types";
import { User, Users } from "lucide-react";

export const SITE_CONFIG = {
  name: "Iron Peach",
  url: {
    production: "https://iron-peach.vercel.app",
    preview: "https://iron-peach-git-preview-bayezid1989.vercel.app",
    development: "http://localhost:3000",
  },
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/gaug-app/iron-peach",
  },
};

export const ENV = (process.env.NEXT_PUBLIC_ENVIRONMENT ||
  "development") as Environment;

export const SITE_URL = SITE_CONFIG.url[ENV];

export const MAP_STYLES = {
  classic: {
    streets: "mapbox://styles/mapbox/streets-v12",
    light: "mapbox://styles/mapbox/light-v11",
    dark: "mapbox://styles/mapbox/dark-v11",
    satellite: "mapbox://styles/mapbox/satellite-v9",
    outdoors: "mapbox://styles/mapbox/outdoors-v12",
  },
  custom: {
    basic: "mapbox://styles/bayezid1989/clqwfmmkd000901rc7qgsd9fy",
    unicorn: "mapbox://styles/bayezid1989/clqvyo3gc00dh01rdf89dc59p",
  },
};

// Tailwind standard
export const DEVICE_WIDTH = {
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
};
