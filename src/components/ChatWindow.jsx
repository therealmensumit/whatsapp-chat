import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import InviteBanner from "./InviteBanner";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ chat, clientId, link }) {
  const { messages, peer, peerTyping, status, send, setTyping } = chat;
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, peerTyping, peer]);

  return (
    <section className="flex flex-col h-full w-full max-w-3xl mx-auto bg-panel">
      <ChatHeader peer={peer} peerTyping={peerTyping} status={status} />
      <div className="flex-1 overflow-y-auto px-3 md:px-8 py-4 flex flex-col gap-1 bg-chatbg">
        {!peer && <InviteBanner link={link} />}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} mine={m.clientId === clientId} />
        ))}
        {peerTyping && <TypingIndicator />}
        <div ref={endRef} />
      </div>
      <MessageInput onSend={send} onTyping={setTyping} disabled={status !== "connected"} />
    </section>
  );
}
