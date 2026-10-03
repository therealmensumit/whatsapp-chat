import { useState } from "react";
import JoinScreen from "./components/JoinScreen";
import ChatWindow from "./components/ChatWindow";
import useChat from "./hooks/useChat";
import { makeRoomId } from "./utils/time";

const savedName = () => {
  try { return localStorage.getItem("chat-name") || ""; } catch { return ""; }
};

export default function App() {
  const chat = useChat();
  const urlRoom = new URLSearchParams(window.location.search).get("room");
  const [room, setRoom] = useState(urlRoom);

  const start = (name) => {
    try { localStorage.setItem("chat-name", name); } catch {}
    let id = room;
    if (!id) {
      id = makeRoomId();
      window.history.replaceState(null, "", `?room=${id}`);
      setRoom(id);
    }
    chat.join(id, name);
  };

  const inChat = chat.status === "connected" || chat.status === "reconnecting";
  const link = room ? `${window.location.origin}/?room=${room}` : "";

  if (!inChat) {
    return (
      <JoinScreen
        invited={!!room}
        error={chat.error}
        busy={chat.status === "connecting"}
        initialName={savedName()}
        onSubmit={start}
      />
    );
  }

  return <ChatWindow chat={chat} clientId={chat.clientId} link={link} />;
}
