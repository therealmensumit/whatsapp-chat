import { useState } from "react";

export default function JoinScreen({ invited, error, initialName, busy, onSubmit }) {
  const [name, setName] = useState(initialName);

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="h-full flex items-center justify-center bg-appbg p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-panel rounded-xl shadow-lg p-6 space-y-4">
        <div className="text-center">
          <div className="text-5xl mb-2">💬</div>
          <h1 className="text-xl font-bold text-accent">
            {invited ? "You've been invited to chat" : "Start a private chat"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {invited
              ? "Enter your name to join the conversation."
              : "Enter your name, then share the link with one person."}
          </p>
        </div>

        <input
          autoFocus
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg px-4 py-3 outline-none bg-field text-ink placeholder:text-muted"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!name.trim() || busy}
          className="w-full rounded-lg py-3 font-medium text-white bg-accent disabled:opacity-40"
        >
          {busy ? "Connecting…" : invited ? "Join chat" : "Create chat"}
        </button>
      </form>
    </div>
  );
}
