import Avatar from "./Avatar";

export default function ChatListItem({ chat, active, typing, onClick }) {
  const last = chat.messages[chat.messages.length - 1];
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 cursor-pointer border-b border-line ${
        active ? "bg-hover" : ""
      }`}
    >
      <Avatar chat={chat} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className="font-medium truncate">{chat.name}</span>
          <span className={`text-xs ml-2 shrink-0 ${chat.unread ? "text-accent" : "text-muted"}`}>
            {last.time}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm truncate text-muted">
            {typing ? (
              <i className="text-accent">typing…</i>
            ) : (
              (last.from === "me" ? "You: " : "") + last.text
            )}
          </span>
          {chat.unread > 0 && (
            <span className="ml-2 text-xs text-white bg-accent rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
