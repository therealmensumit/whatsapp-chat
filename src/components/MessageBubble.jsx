import { formatTime } from "../utils/time";

function Ticks() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="#53bdeb"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6l3 3 6-7M6 8l1 1 6-7" />
    </svg>
  );
}

export default function MessageBubble({ message, mine }) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] md:max-w-[60%] rounded-lg px-3 py-1.5 shadow-sm text-[15px] ${
          mine ? "bg-outgoing" : "bg-incoming"
        }`}
      >
        <span className="whitespace-pre-wrap break-words">{message.text}</span>
        <span className="inline-flex items-center gap-1 float-right ml-3 mt-2 text-[11px] text-muted">
          {formatTime(message.ts)}
          {mine && <Ticks />}
        </span>
      </div>
    </div>
  );
}
