import Avatar from "./Avatar";

export default function ChatHeader({ peer, peerTyping, status }) {
  let sub = "waiting for someone to join…";
  if (status === "reconnecting") sub = "reconnecting…";
  else if (peer) sub = peerTyping ? "typing…" : peer.online ? "online" : "offline";

  return (
    <header className="flex items-center gap-3 px-3 py-2 border-b border-line bg-panel">
      <Avatar name={peer?.name} size={40} />
      <div>
        <div className="font-medium leading-tight">{peer?.name || "New chat"}</div>
        <div className="text-xs text-muted">{sub}</div>
      </div>
    </header>
  );
}
