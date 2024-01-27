import type { RouteConfig } from "@/types";

export const ROUTES: RouteConfig[] = [
  { places: ["madrid", "burgos"], kind: "land" },
  { places: ["madrid", "zaragoza"], kind: "land" },
  { places: ["burgos", "sanSebastian"], kind: "land" },
  { places: ["zaragoza", "barcelona"], kind: "land" },
  { places: ["barcelona", "toulouse"], kind: "land" },
  { places: ["toulouse", "montpellier"], kind: "land" },
  { places: ["lyon", "montpellier"], kind: "land" },
  { places: ["lyon", "geneva"], kind: "land" },
  { places: ["sanSebastian", "pau"], kind: "land" },
  { places: ["pau", "bordeaux"], kind: "land" },
  { places: ["bordeaux", "nantes"], kind: "land" },
  { places: ["nantes", "paris"], kind: "land" },
  { places: ["lyon", "paris"], kind: "land" },
  { places: ["madrid", "porto"], kind: "land" },
  { places: ["porto", "lisbon"], kind: "land" },
  { places: ["lisbon", "sevilla"], kind: "land" },
  { places: ["sevilla", "gibraltar"], kind: "land" },
  { places: ["sevilla", "granada"], kind: "land" },
  { places: ["granada", "madrid"], kind: "land" },
];
