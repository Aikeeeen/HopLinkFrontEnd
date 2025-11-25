import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRideWithParticipants,
  listRideMessages,
  postRideMessage,
  markRideMessagesRead,
  subscribeToDB,
} from "../../lib/db";
import { useAuth } from "../../context/AuthContext";

import MobileChat from "../../components/chat/MobileChat";
import DesktopChat from "../../components/chat/DesktopChat";
import { userIsRideMember } from "../../lib/rideAccess";

export default function RideChat() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [ride, setRide] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);
  const hasMarkedReadRef = useRef(false);

  useEffect(() => {
    hasMarkedReadRef.current = false;
  }, [rideId, userId]);

  useEffect(() => {
    if (!rideId) return;

    const rideIdNum = Number(rideId);
    if (Number.isNaN(rideIdNum)) return;

    let cancelled = false;

    async function loadRideAndMessages() {
      setLoading(true);
      try {
        const [r, msgs] = await Promise.all([
          getRideWithParticipants(rideIdNum),
          listRideMessages(rideIdNum),
        ]);

        if (!cancelled) {
          setRide(r);
          setMessages(msgs);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRideAndMessages();

    const unsub = subscribeToDB(async () => {
      if (cancelled) return;
      const msgs = await listRideMessages(rideIdNum);
      if (!cancelled) {
        setMessages(msgs);
      }
    });

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [rideId]);

  useEffect(() => {
    if (!rideId || !userId || !messages.length || hasMarkedReadRef.current) {
      return;
    }

    const rideIdNum = Number(rideId);
    if (!Number.isNaN(rideIdNum)) {
      hasMarkedReadRef.current = true;
      markRideMessagesRead(rideIdNum, userId).catch(() => {
        hasMarkedReadRef.current = false;
      });
    }
  }, [rideId, userId, messages.length]);

  // ⭐ FIXED INITIAL SCROLL — Scroll AFTER messages render
  useEffect(() => {
    if (!messages.length) return;

    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, 0); // allows DOM to fully paint before scrolling

    return () => clearTimeout(timer);
  }, [messages]);

  if (!user) return <p>Please sign in.</p>;
  if (loading && !ride) return <p>Loading...</p>;
  if (!ride) return <p>Ride not found.</p>;

  if (!userIsRideMember(ride, userId)) {
    return <p>Not allowed to view chat.</p>;
  }

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (!rideId) return;

    const rideIdNum = Number(rideId);
    if (Number.isNaN(rideIdNum)) return;

    await postRideMessage(rideIdNum, userId, trimmed);
    setInput("");

    markRideMessagesRead(rideIdNum, userId).catch(() => {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sharedProps = {
    ride,
    messages,
    input,
    setInput,
    onSubmit: handleSubmit,
    onKeyDown: handleKeyDown,
    bottomRef,
    userId,
    onBack: () => navigate(-1),
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-hidden">

      {/* Mobile */}
      <div
        className="md:hidden flex flex-col w-full overflow-hidden"
        style={{
          height: "calc(100vh - 112px)", // navbar + taskbar space
        }}
      >
        <MobileChat {...sharedProps} />
      </div>

      {/* Desktop */}
      <div className="hidden md:block flex-1 w-full h-full overflow-hidden">
        <DesktopChat {...sharedProps} />
      </div>
    </div>
  );
}
