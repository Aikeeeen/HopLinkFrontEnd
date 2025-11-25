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

        if (cancelled) return;

        setRide(r);
        setMessages(msgs);
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
      if (unsub) unsub();
    };
  }, [rideId]);

  useEffect(() => {
    if (!rideId || !userId || !messages.length || hasMarkedReadRef.current) {
      return;
    }

    const rideIdNum = Number(rideId);
    if (Number.isNaN(rideIdNum)) return;

    hasMarkedReadRef.current = true;

    markRideMessagesRead(rideIdNum, userId).catch(() => {
      hasMarkedReadRef.current = false;
    });
  }, [rideId, userId, messages.length]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  if (!user) {
    return (
      <div className="hl-page">
        <p className="hl-body">
          Please sign in with a demo account to access ride chats.
        </p>
      </div>
    );
  }

  if (loading && !ride) {
    return (
      <div className="hl-page">
        <p className="hl-body">Loading ride chat…</p>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="hl-page">
        <p className="hl-body">Ride not found.</p>
      </div>
    );
  }

  // 🔐 Only owner or accepted passengers may access chat
  if (!userIsRideMember(ride, userId)) {
    return (
      <div className="hl-page p-4">
        <div className="hl-card p-4">
          <p className="hl-body">
            You don&apos;t have access to this ride&apos;s chat. Only the driver
            and passengers who have joined this ride can view or send messages.
          </p>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !userId || !rideId) return;

    const rideIdNum = Number(rideId);
    if (Number.isNaN(rideIdNum)) return;

    await postRideMessage(rideIdNum, userId, trimmed);
    setInput("");

    markRideMessagesRead(rideIdNum, userId).catch(() => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage();
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
    <div className="flex-1 flex flex-col w-full">
      {/* Mobile */}
      <div className="md:hidden flex-1 w-full">
        <MobileChat {...sharedProps} />
      </div>

      {/* Desktop */}
      <div className="hidden md:block flex-1 w-full">
        <DesktopChat {...sharedProps} />
      </div>
    </div>
  );
}
