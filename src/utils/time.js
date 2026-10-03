export const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const makeRoomId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map((b) => "abcdefghijkmnpqrstuvwxyz23456789"[b % 32])
    .join("");

const COLORS = ["#e91e63", "#3f51b5", "#ff9800", "#009688", "#795548", "#9c27b0", "#2196f3"];
export const colorFor = (name = "") =>
  COLORS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
