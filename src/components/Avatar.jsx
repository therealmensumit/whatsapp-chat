import { colorFor } from "../utils/time";

export default function Avatar({ name, size = 48 }) {
  const initial = (name || "?").trim()[0]?.toUpperCase() || "?";
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{ background: name ? colorFor(name) : "#8696a0", width: size, height: size }}
    >
      {initial}
    </div>
  );
}
