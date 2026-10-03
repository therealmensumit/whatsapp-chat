import { useState } from "react";
import ChatListItem from "./ChatListItem";

export default function Sidebar({ chats, activeId, typing, onOpen, hiddenOnMobile }) {
  const [query, setQuery] = useState("");
  const filtered = chats.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside
      className={`flex-col h-full w-full md:w-[380px] md:flex shrink-0 bg-panel border-r border-line ${
        hiddenOnMobile ? "hidden" : "flex"
      }`}
    >
      <h1 className="px-4 py-3 text-xl font-bold text-accent">Chats</h1>
      <div className="px-3 pb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chats"
          className="w-full rounded-lg px-4 py-2 text-sm outline-none bg-field text-ink placeholder:text-muted"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            active={chat.id === activeId}
            typing={typing[chat.id]}
            onClick={() => onOpen(chat.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-muted">No chats found</p>
        )}
      </div>
    </aside>
  );
}
