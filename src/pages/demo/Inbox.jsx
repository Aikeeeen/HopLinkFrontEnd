import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { listInboxThreadsForUser, subscribeToDB } from "../../lib/db";

export default function Inbox() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setThreads([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await listInboxThreadsForUser(user.id);
        if (!cancelled) setThreads(data || []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const unsub = subscribeToDB(load);

    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, [user]);

  if (!user) {
    return (
      <div className="hl-page">
        <div className="mb-4">
          <h1 className="hl-heading">Inbox</h1>
        </div>
        <p className="hl-body mb-6">
          Sign in with a demo account to see messages related to your rides.
        </p>
        <div className="hl-empty">
          No messages yet - create or join a ride first.
        </div>
      </div>
    );
  }

  return (
    <div className="hl-page">
      {/* Clean header without big icon */}
      <div className="mb-4">
        <h1 className="hl-heading">Inbox</h1>
      </div>

      <p className="hl-body mb-6">
        Group chats are attached to each ride you&apos;re part of. As soon as
        you join a ride, its chat will appear here — even if no one has sent a
        message yet.
      </p>

      {loading ? (
        <div className="hl-empty">Loading conversations…</div>
      ) : threads.length === 0 ? (
        <div className="hl-empty">
          You have no ride chats yet. Join or create a ride to start chatting.
        </div>
      ) : (
        <div className="grid gap-3">
          {threads.map((t) => {
            const hasLast = !!t.lastMessage;
            const lastSender = hasLast
              ? t.lastMessage.senderName || "Someone"
              : null;
            const lastBody = hasLast ? t.lastMessage.body : null;

            return (
              <button
                key={t.rideId}
                type="button"
                onClick={() => navigate(`/demo/rides/${t.rideId}/chat`)}
                className={`w-full text-left hl-card p-4 flex items-start gap-3 ${
                  t.unread > 0 ? "border-indigo-500/50" : ""
                }`}
              >
                <div className="mt-1">
                  <MessageSquare className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold hl-heading truncate">
                      {t.origin} → {t.destination}
                    </p>
                    {t.unread > 0 && (
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-2 py-0.5 text-[11px] font-medium text-white">
                        {t.unread > 99 ? "99+" : t.unread} new
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] hl-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {t.origin} → {t.destination}
                    </span>
                    {t.date && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {t.date}
                        {t.departTime ? ` · ${t.departTime}` : ""}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Ride chat
                    </span>
                  </div>

                  <p className="mt-2 text-xs hl-body line-clamp-2">
                    {hasLast ? (
                      <>
                        <span className="font-medium">{lastSender}:</span>{" "}
                        {lastBody}
                      </>
                    ) : (
                      <span className="hl-muted">
                        No messages yet. Tap to start chatting.
                      </span>
                    )}
                  </p>
                </div>

                <ArrowRight className="mt-1 h-4 w-4 text-slate-400 shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
