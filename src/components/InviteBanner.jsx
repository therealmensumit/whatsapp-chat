import { useState } from "react";

export default function InviteBanner({ link }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", link);
    }
  };

  return (
    <div className="mx-auto my-2 max-w-md w-full rounded-lg bg-panel shadow-sm p-3 text-sm">
      <p className="text-muted mb-2">Waiting for someone to join. Send them this link:</p>
      <div className="flex items-center gap-2">
        <input readOnly value={link} onFocus={(e) => e.target.select()}
               className="flex-1 min-w-0 rounded px-2 py-1.5 bg-field text-ink text-xs outline-none" />
        <button onClick={copy} className="px-3 py-1.5 rounded text-white bg-accent text-xs font-medium">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
