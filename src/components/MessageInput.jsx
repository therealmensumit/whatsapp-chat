import { useRef, useState } from "react";

export default function MessageInput({ onSend, onTyping, disabled }) {
  const [text, setText] = useState("");
  const timer = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onTyping(false), 1500);
  };

  const submit = () => {
    const value = text.trim();
    if (!value || disabled) return;
    onSend(value);
    setText("");
    clearTimeout(timer.current);
    onTyping(false);
  };

  return (
    <div className="flex items-end gap-2 px-3 py-2 bg-panel">
      <textarea
        rows={1}
        value={text}
        placeholder={disabled ? "Connecting…" : "Type a message"}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        className="flex-1 resize-none rounded-lg px-4 py-2.5 text-[15px] outline-none max-h-32 bg-field text-ink placeholder:text-muted"
      />
      <button
        onClick={submit}
        disabled={!text.trim() || disabled}
        aria-label="Send"
        className="w-11 h-11 rounded-full text-white bg-accent flex items-center justify-center shrink-0 disabled:opacity-40"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}
