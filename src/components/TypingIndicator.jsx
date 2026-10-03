export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-incoming rounded-lg px-4 py-3 shadow-sm flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot w-2 h-2 rounded-full bg-muted" />
        ))}
      </div>
    </div>
  );
}
