import { useState, useRef, useCallback, useEffect } from "react";
import { io } from "socket.io-client";

// Stable id per browser so a page reload re-joins the same seat in the chat
function getClientId() {
  try {
    let id = localStorage.getItem("chat-client-id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("chat-client-id", id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export default function useChat() {
  const [clientId] = useState(getClientId);
  const [state, setState] = useState({
    status: "idle", // idle | connecting | connected | reconnecting | error
    messages: [],
    peer: null,
    peerTyping: false,
    error: "",
  });
  const socketRef = useRef(null);

  const join = useCallback(
    (room, name) => {
      socketRef.current?.disconnect();
      setState({ status: "connecting", messages: [], peer: null, peerTyping: false, error: "" });

      const socket = io();
      socketRef.current = socket;

      socket.on("connect", () => {
        socket.emit("join", { room, name, clientId }, (res) => {
          if (!res?.ok) {
            setState((s) => ({ ...s, status: "error", error: res?.error || "Could not join the chat." }));
            socket.disconnect();
            return;
          }
          setState({ status: "connected", messages: res.history, peer: res.peer, peerTyping: false, error: "" });
        });
      });

      socket.on("disconnect", () =>
        setState((s) => (s.status === "error" ? s : { ...s, status: "reconnecting" }))
      );
      socket.on("connect_error", () =>
        setState((s) => (s.status === "error" ? s : { ...s, status: "reconnecting" }))
      );

      socket.on("message", (msg) =>
        setState((s) =>
          s.messages.some((m) => m.id === msg.id)
            ? s
            : {
                ...s,
                messages: [...s.messages, msg],
                peerTyping: msg.clientId !== clientId ? false : s.peerTyping,
              }
        )
      );
      socket.on("peer", (peer) =>
        setState((s) => ({ ...s, peer, peerTyping: peer.online ? s.peerTyping : false }))
      );
      socket.on("typing", (v) => setState((s) => ({ ...s, peerTyping: !!v })));
    },
    [clientId]
  );

  const send = useCallback((text) => socketRef.current?.emit("message", text), []);
  const setTyping = useCallback((v) => socketRef.current?.emit("typing", v), []);

  const leave = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setState({ status: "idle", messages: [], peer: null, peerTyping: false, error: "" });
  }, []);

  useEffect(() => () => socketRef.current?.disconnect(), []);

  return { ...state, clientId, join, send, setTyping, leave };
}
