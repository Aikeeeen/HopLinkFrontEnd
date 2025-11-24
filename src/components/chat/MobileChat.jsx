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
    // Fill the height and width provided by RideChat / RootLayout
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-2 px-2 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-2 py-1 text-xs hl-body hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              <h1 className="text-xs font-semibold hl-heading">
                {ride.origin} → {ride.destination}
              </h1>
            </div>
            <p className="text-[10px] hl-muted inline-flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />
              {ride.date}
              {ride.departTime ? ` · ${ride.departTime}` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Chat area (no card edges) */}
      <div className="flex-1 flex flex-col px-2 pb-2 pt-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs hl-muted text-center px-4">
                No messages yet. Be the first to say hi and coordinate the ride
                details here.
              </p>
            </div>
          ) : (
            messages.map((m) => {
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
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
                      mine
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-slate-100 text-slate-900 rounded-bl-sm dark:bg-slate-800 dark:text-slate-50"
                    }`}
                  >
                    {!mine && (
                      <p className="text-[10px] font-semibold mb-0.5 opacity-80">
                        {m.senderName || m.senderEmail}
                      </p>
                    )}
                    <p className="whitespace-pre-wrap">{m.body}</p>
                    {timeLabel && (
                      <p
                        className={`text-[9px] mt-1 opacity-70 ${
                          mine ? "text-right" : "text-left"
                        }`}
                      >
                        {timeLabel}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="mt-2 flex items-end gap-2 border-t border-slate-200 pt-2 dark:border-slate-700"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type a message…"
            className="flex-1 hl-input resize-none min-h-10"
          />
          <button type="submit" className="hl-btn-primary px-3 py-2 text-xs">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
