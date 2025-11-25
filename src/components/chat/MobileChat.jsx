import { ArrowLeft, MessageCircle, MapPin } from "lucide-react";

function formatMessageTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MobileChat({
  ride,
  messages,
  input,
  setInput,
  onSubmit,
  onKeyDown,
  bottomRef,
  userId,
  onBack,
}) {
  if (!ride) return null;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-900 overflow-hidden">

      {/* HEADER — fixed */}
      <div className="shrink-0 px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5 text-slate-900 dark:text-slate-100" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
            <h1 className="text-sm font-semibold">
              {ride.origin} → {ride.destination}
            </h1>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {ride.date} {ride.departTime ? `· ${ride.departTime}` : ""}
          </p>
        </div>
      </div>

      {/* MESSAGES — only this scrolls */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {messages.map((m) => {
          const mine = m.senderId === userId;
          const sentAt =
            m.createdAt || m.timestamp || m.sentAt || m.created_at;
          const timeLabel = formatMessageTime(sentAt);

          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-2xl text-sm shadow-sm max-w-[80%] ${
                  mine
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white dark:bg-slate-800 dark:text-slate-100 rounded-bl-sm"
                }`}
              >
                {!mine && (
                  <p className="text-[10px] font-bold opacity-80 mb-0.5">
                    {m.senderName || m.senderEmail}
                  </p>
                )}
                <p className="whitespace-pre-wrap">{m.body}</p>
                {timeLabel && (
                  <p
                    className={`text-[10px] mt-1 opacity-70 ${
                      mine ? "text-right" : "text-left"
                    }`}
                  >
                    {timeLabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR — fixed */}
      <form
        onSubmit={onSubmit}
        className="shrink-0 border-t border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-900 flex items-center gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Type a message…"
          className="flex-1 resize-none p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm min-h-10"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-xl hover:bg-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
