"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

type ConfettiPiece = {
  left: string;
  top: string;
  color: string;
  delay: string;
};

type BalloonProps = {
  color: string;
  left: string;
  delay: string;
};

type GiftProps = {
  color: string;
  left: string;
};

// Simple SVG for cake (you can replace with an image if you want)
const Cake = () => (
  <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
    <rect x="12" y="36" width="40" height="20" rx="8" fill="#F9C2D8"/>
    <rect x="16" y="28" width="32" height="12" rx="6" fill="#AEE2F9"/>
    <ellipse cx="32" cy="28" rx="16" ry="4" fill="#F9C2D8"/>
    <rect x="28" y="16" width="8" height="12" rx="4" fill="#F9E2A2"/>
    <circle cx="32" cy="16" r="2" fill="#F9E2A2"/>
  </svg>
);

const balloons = [
  { color: "#1976D2", left: "10%", delay: "0s" },
  { color: "#D32F2F", left: "25%", delay: "1s" },
  { color: "#388E3C", left: "70%", delay: "0.5s" },
  { color: "#FBC02D", left: "85%", delay: "1.5s" },
  { color: "#7B1FA2", left: "40%", delay: "0.7s" },
  { color: "#C2185B", left: "60%", delay: "1.2s" },
];

const gifts = [
  { color: "#D32F2F", left: "15%" },
  { color: "#1976D2", left: "30%" },
  { color: "#388E3C", left: "70%" },
  { color: "#FBC02D", left: "85%" },
];

const Balloon = ({ color, left, delay }: BalloonProps) => (
  <div
    style={{
      position: "absolute",
      left,
      top: 0,
      animation: `float 6s ease-in-out infinite`,
      animationDelay: delay,
      zIndex: 1,
    }}
  >
    <div
      style={{
        width: 60,
        height: 80,
        background: color,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        border: "2px solid #fff",
      }}
    />
    <div
      style={{
        width: 2,
        height: 30,
        background: "#aaa",
        margin: "0 auto",
      }}
    />
  </div>
);

const Gift = ({ color, left }: GiftProps) => (
  <div
    style={{
      position: "absolute",
      left,
      bottom: 0,
      zIndex: 2,
    }}
  >
    <div
      style={{
        width: 50,
        height: 35,
        background: color,
        borderRadius: 10,
        border: "2px solid #fff",
        position: "relative",
      }}
    />
    <div
      style={{
        width: 30,
        height: 10,
        background: "#fff",
        borderRadius: 5,
        position: "absolute",
        top: -10,
        left: 10,
      }}
    />
  </div>
);

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Only run on client
    const colors = ["#1976D2", "#D32F2F", "#388E3C", "#FBC02D", "#7B1FA2", "#C2185B", "#512DA8", "#FFA000"];
    const pieces = Array.from({ length: 60 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: colors[i % colors.length],
      delay: `${Math.random() * 2}s`,
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div>
      {confettiPieces.map((piece, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: piece.left,
            top: piece.top,
            width: 6,
            height: 6,
            background: piece.color,
            borderRadius: "50%",
            opacity: 0.7,
            animation: "fall 3s linear infinite",
            animationDelay: piece.delay,
          }}
        />
      ))}
    </div>
  );
};

const BirthdayPage = () => {
  // Music controls
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  // Start music when revealed
  useEffect(() => {
    if (revealed && audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  }, [revealed]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        padding: "16px 0",
      }}
    >
      {/* Black overlay with button */}
      {!revealed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            transition: "opacity 0.7s",
          }}
        >
          <button
            onClick={() => setRevealed(true)}
            className="reveal-btn"
            style={{
              background: "linear-gradient(90deg, #2196f3, #00bcd4)",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              padding: "24px 48px",
              border: "none",
              borderRadius: 16,
              boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Click to open the surprise
          </button>
        </div>
      )}

      {/* Balloons, Confetti, Gifts */}
      {revealed && (
        <>
          {balloons.map((b, i) => (
            <Balloon key={i} {...b} />
          ))}
          <Confetti />
          {gifts.map((g, i) => (
            <Gift key={i} {...g} />
          ))}
        </>
      )}

      {/* Main Card with animation */}
      <div
        style={{
          maxWidth: 400,
          width: "95vw",
          margin: "0 auto",
          marginTop: 60,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 24,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          padding: 24,
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.7s, transform 0.7s",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#2d3a4a", marginBottom: 8 }}>
          HAPPY BIRTHDAY TITAAAA!
        </h1>
        <p style={{ color: "#4a4a4a", marginBottom: 16, fontSize: 16 }}>
          Happy Birthday, Ma&apos;am! Wishing you a day filled with love, laughter, and all the joy you bring to those around you. Thank you for raising such a wonderful daughter—she&apos;s a reflection of your kindness and strength. Have a beautiful celebration!
        </p>
        <div style={{ fontWeight: 700, fontSize: 22, color: "#2d3a4a", marginBottom: 16 }}>
          
        </div>
        {/* Centered Cake */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <Cake />
        </div>
      </div>

      {/* Image below the card */}
      <div
        style={{
          margin: "32px auto 0",
          textAlign: "center",
          zIndex: 10,
          position: "relative",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
        }}
      >
        <Image
          src="/Bdaypic.jpg"
          alt="Birthday"
          width={220}
          height={220}
          style={{
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            maxWidth: "90vw",
            height: "auto",
            margin: "0 auto",
          }}
          priority
        />
      </div>

      {/* Music controls */}
      <audio
        ref={audioRef}
        src="/happy-birthday.mp3"
        loop
        style={{ display: "none" }}
      />
      {revealed && (
        <button
          onClick={handleToggleMusic}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 100,
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? "⏸️" : "▶️"}
        </button>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
            100% { transform: translateY(0); }
          }
          @keyframes fall {
            0% { transform: translateY(-100px); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .reveal-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 0 32px 8px #00bcd4;
            filter: brightness(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default BirthdayPage;
