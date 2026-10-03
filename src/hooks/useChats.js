import { useState, useRef, useCallback } from "react";
import { initialChats, REPLIES } from "../data/contacts";
import { now } from "../utils/time";

export default function useChats() {
  const [chats, setChats] = useState(initialChats);
  const [activeId, setActiveId] = useState(null);
  const [typing, setTyping] = useState({});
  const activeRef = useRef(null);
  activeRef.current = activeId;

  const openChat = useCallback((id) => {
    setActiveId(id);
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  }, []);

  const closeChat = useCallback(() => setActiveId(null), []);

  const sendMessage = useCallback((id, text) => {
    const msg = { id: Date.now(), text, from: "me", time: now() };
    setChats((cs) =>
      cs.map((c) => (c.id === id ? { ...c, messages: [...c.messages, msg] } : c))
    );

    // Simulated reply (replace with a real backend / WebSocket later)
    setTimeout(() => setTyping((t) => ({ ...t, [id]: true })), 700);
    setTimeout(() => {
      setTyping((t) => ({ ...t, [id]: false }));
      const reply = {
        id: Date.now() + 1,
        text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
        from: "them",
        time: now(),
      };
      setChats((cs) =>
        cs.map((c) =>
          c.id === id
            ? {
                ...c,
                unread: activeRef.current === id ? 0 : c.unread + 1,
                messages: [...c.messages, reply],
              }
            : c
        )
      );
    }, 2200);
  }, []);

  return { chats, activeId, typing, openChat, closeChat, sendMessage };
}
