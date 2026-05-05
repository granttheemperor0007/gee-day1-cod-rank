"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Gamepad2, Info, Search, User } from "lucide-react";

export default function Home() {
  const [game, setGame] = useState("");
  const [gameOpen, setGameOpen] = useState(false);
  const [gameSearch, setGameSearch] = useState("");
  const [playerId, setPlayerId] = useState("");
  const gameWrapRef = useRef<HTMLDivElement>(null);

  const games = [
    { name: "Call of Duty: Mobile", players: "1.1M", icon: "/games/cod-mobile.png" },
    { name: "Call of Duty: Warzone", players: "940k", icon: "/games/cod-warzone.png" },
    { name: "Fortnite", players: "2.4M", icon: "/games/fortnite.png" },
    { name: "Apex Legends", players: "612k", icon: "/games/apex.png" },
    { name: "Valorant", players: "873k", icon: "/games/valorant.png" },
    { name: "Counter-Strike 2", players: "1.3M", icon: "/games/cs2.png" },
    { name: "PUBG", players: "486k", icon: "/games/pubg.png" },
    { name: "Free Fire", players: "1.8M", icon: "/games/free-fire.png" },
  ];

  const selectedGameIcon = games.find((g) => g.name === game)?.icon ?? null;

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(gameSearch.toLowerCase()),
  );

  useEffect(() => {
    if (!gameOpen) {
      setGameSearch("");
      return;
    }
    const onClick = (e: MouseEvent) => {
      if (!gameWrapRef.current?.contains(e.target as Node)) setGameOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [gameOpen]);
  const [kills, setKills] = useState("");
  const [deaths, setDeaths] = useState("");
  const playerIdRef = useRef<HTMLInputElement>(null);
  const killsRef = useRef<HTMLInputElement>(null);
  const deathsRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const ready = game !== "" && playerId !== "";

  useEffect(() => {
    playerIdRef.current?.focus();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const START = 6;
    const END = 32;
    const RATE = 1;
    v.playbackRate = RATE;
    const seekStart = () => {
      v.currentTime = START;
      v.playbackRate = RATE;
      v.play().catch(() => {});
    };
    const onTimeUpdate = () => {
      if (v.currentTime >= END || v.currentTime < START - 0.1) {
        v.currentTime = START;
      }
      v.playbackRate = RATE;
    };
    v.addEventListener("loadedmetadata", seekStart);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", seekStart);
    v.addEventListener("pause", () => {
      if (!v.ended) v.play().catch(() => {});
    });
    if (v.readyState >= 1) seekStart();
    return () => {
      v.removeEventListener("loadedmetadata", seekStart);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", seekStart);
    };
  }, []);

  const killsNum = parseInt(kills || "0", 10);
  const deathsNum = parseInt(deaths || "0", 10);
  const ratio = killsNum / Math.max(deathsNum, 1);

  const handleNumberChange = (
    setter: (v: string) => void,
  ): React.ChangeEventHandler<HTMLInputElement> => (e) => {
    setter(e.target.value.replace(/\D/g, ""));
  };

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
      <video
        ref={videoRef}
        src="/bg.mp4"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/55" />
      <div className="flex flex-col items-center">
        <h1
          className="text-center font-display font-extrabold uppercase tracking-normal leading-[1.03] text-white"
          style={{
            fontSize: "90px",
          }}
        >
          <span className="block">K/D</span>
          <span className="block">Tracker</span>
        </h1>
        <p
          className="mt-10 max-w-md text-center text-neutral-400"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "18px",
            lineHeight: "28px",
            letterSpacing: "-0.02em",
          }}
        >
          The <span className="text-white">K/D Calculator.</span> A product carbon footprint calculation tool by Jahgrant Aiyedun. <span className="text-white">Super K/D</span>
        </p>
      </div>

      <div
        className="relative mt-20 rounded-[32px] p-px"
        style={{
          width: "fit-content",
          minWidth: 336,
          background:
            "radial-gradient(circle at 26% 13%, #36363A 0%, #36363A 26%, #18181B 50%, #222225 100%)",
          boxShadow:
            "0 4px 4px rgba(0,0,0,0.25), 0 8px 8px rgba(0,0,0,0.25)",
        }}
      >
        <div
          className="w-full rounded-[31px] pt-6 pb-2"
          style={{
            background:
              "linear-gradient(180deg, #222225 0%, #18181B 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p
              className="text-center"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                lineHeight: "28px",
                letterSpacing: "-0.02em",
                backgroundImage:
                  "linear-gradient(90deg, #5f5f5f 0%, #b8b8b8 25%, #ffffff 50%, #b8b8b8 75%, #5f5f5f 100%)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                animation: "gold-shimmer 2.5s ease-in-out infinite",
              }}
            >
              Holla, Champion
            </p>
            <p
              className="text-center font-display text-white"
              style={{
                fontWeight: 600,
                fontSize: "40px",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              Let&apos;s go
            </p>
          </div>

          <div
            className="mx-2 mt-4 rounded-[20px]"
            style={{
              height: 128,
              border: "1px solid transparent",
              backgroundImage:
                "linear-gradient(#1F2023, #1F2023), radial-gradient(ellipse 200% 100% at 50% 50%, #232327 35%, #48484F 68%, #29292E 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 4px 44px rgba(0,0,0,0.25)",
            }}
          >
            <div
              ref={gameWrapRef}
              role="button"
              tabIndex={0}
              onClick={() => setGameOpen((o) => !o)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setGameOpen((o) => !o);
                }
              }}
              className="relative flex h-1/2 cursor-pointer items-center justify-between rounded-t-[19px] px-4 transition-colors hover:bg-white/5"
            >
              <span
                className="flex items-center gap-2 text-white"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {game ? (
                  selectedGameIcon ? (
                    <img
                      src={selectedGameIcon}
                      alt=""
                      className="shrink-0 object-contain"
                      style={{ width: 32, height: 32, marginBottom: -8 }}
                    />
                  ) : null
                ) : (
                  <div
                    className="flex shrink-0 items-center justify-center rounded-md bg-neutral-700/50"
                    style={{ width: 32, height: 32 }}
                  >
                    <Gamepad2 size={20} color="#fff" className="opacity-50" />
                  </div>
                )}
                <span style={{ transform: game ? "translateY(-1px)" : undefined }}>
                  {game || "Choose game"}
                </span>
              </span>
              <ChevronDown
                size={20}
                className={`text-neutral-400 transition-transform ${gameOpen ? "rotate-180" : ""}`}
              />
              {gameOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 right-0 top-full z-50 mt-3 rounded-[20px] p-px"
                  style={{
                    background:
                      "radial-gradient(circle at 26% 13%, #36363A 0%, #36363A 26%, #18181B 50%, #222225 100%)",
                    boxShadow:
                      "0 4px 4px rgba(0,0,0,0.25), 0 8px 8px rgba(0,0,0,0.25)",
                  }}
                >
                  <div
                    className="rounded-[19px] overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, #222225 0%, #18181B 100%)",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{ borderBottom: "1px solid #313131" }}
                    >
                      <Search size={14} className="text-neutral-500" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search game"
                        value={gameSearch}
                        onChange={(e) => setGameSearch(e.target.value)}
                        className="w-full bg-transparent text-white placeholder:text-neutral-500 outline-none"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          letterSpacing: "-0.02em",
                        }}
                      />
                    </div>
                    <div className="py-1 max-h-64 overflow-y-auto">
                      {filteredGames.length === 0 ? (
                        <div
                          className="px-4 py-2 text-neutral-500"
                          style={{ fontSize: "14px", letterSpacing: "-0.02em" }}
                        >
                          No games found
                        </div>
                      ) : (
                        filteredGames.map((g) => (
                          <button
                            key={g.name}
                            type="button"
                            onClick={() => {
                              setGame(g.name);
                              setGameOpen(false);
                            }}
                            className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left outline-none transition-colors hover:bg-white/5 ${game === g.name ? "text-white" : "text-neutral-300"}`}
                            style={{ fontSize: "14px", letterSpacing: "-0.02em" }}
                          >
                            <span className="flex items-center gap-2">
                              {g.icon ? (
                                <img
                                  src={g.icon}
                                  alt=""
                                  className="shrink-0 object-contain"
                                  style={{ width: 32, height: 32, marginBottom: -8 }}
                                />
                              ) : (
                                <span
                                  aria-hidden
                                  className="shrink-0"
                                  style={{ width: 32, height: 32 }}
                                />
                              )}
                              <span style={{ transform: "translateY(-1px)" }}>{g.name}</span>
                            </span>
                            <span className="text-neutral-500 tabular-nums">
                              {g.players} players
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="flex h-1/2 items-center justify-between px-4"
              style={{ borderTop: "1px solid #313131" }}
            >
              <div className="flex items-center gap-2" style={{ fontSize: "16px" }}>
                <div
                  className="flex shrink-0 items-center justify-center rounded-md bg-neutral-700/50"
                  style={{ width: 32, height: 32 }}
                >
                  <User size={20} color="#fff" className="opacity-50" />
                </div>
                <div className="relative">
                  <input
                    ref={playerIdRef}
                    type="text"
                    autoFocus
                    placeholder="Player ID"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="bg-transparent text-white outline-none caret-transparent placeholder:text-white placeholder:opacity-50"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "16px",
                      letterSpacing: "-0.02em",
                      fieldSizing: "content",
                      minWidth: 80,
                      transform: "translateY(-1px)",
                    } as React.CSSProperties}
                  />
                  {playerId === "" && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute"
                      style={{
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 2,
                        height: 22,
                        background: "#fff",
                        animation: "caret-blink 1s linear infinite",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="relative mx-2 mt-4 flex w-[calc(100%-16px)] items-center justify-center overflow-hidden rounded-full py-2 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:duration-100"
            style={{
              backgroundColor: "#C2EE48",
              color: "#1F1F0D",
              fontFamily: "var(--font-big-shoulders)",
              fontWeight: 800,
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "-0.015em",
              boxShadow:
                "0 0 32px rgba(194,238,72,0.35), 0 8px 24px rgba(194,238,72,0.25), 0 2px 8px rgba(194,238,72,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 48px rgba(194,238,72,0.55), 0 12px 32px rgba(194,238,72,0.4), 0 4px 12px rgba(194,238,72,0.25), inset 0 1px 0 rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 32px rgba(194,238,72,0.35), 0 8px 24px rgba(194,238,72,0.25), 0 2px 8px rgba(194,238,72,0.15), inset 0 1px 0 rgba(255,255,255,0.4)";
            }}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0">
              {[
                { left: "8%", size: 3, dur: 4.2, delay: 0, drift: -2 },
                { left: "18%", size: 2, dur: 5.4, delay: 1.6, drift: 3 },
                { left: "28%", size: 4, dur: 3.8, delay: 0.8, drift: -1 },
                { left: "40%", size: 2, dur: 5, delay: 2.4, drift: 4 },
                { left: "52%", size: 3, dur: 4.6, delay: 0.4, drift: -3 },
                { left: "62%", size: 2, dur: 6, delay: 1.2, drift: 2 },
                { left: "75%", size: 3, dur: 4, delay: 2, drift: -2 },
                { left: "88%", size: 2, dur: 5.2, delay: 0.6, drift: 3 },
              ].map((b, i) => (
                <span
                  key={i}
                  className="absolute bottom-0 rounded-full bg-black/80"
                  style={{
                    left: b.left,
                    width: b.size,
                    height: b.size,
                    animation: `bubble-rise ${b.dur}s ease-out ${b.delay}s infinite`,
                    ["--drift" as never]: `${b.drift}px`,
                  }}
                />
              ))}
            </span>
            <span className="relative">Submit to see your rank</span>
          </button>
        </div>
      </div>

      <p
        className="mt-6 flex items-center gap-2 text-center text-neutral-400"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          lineHeight: "28px",
          letterSpacing: "-0.02em",
        }}
      >
        <Info size={14} />
        Results shown to you are just mock data
      </p>
    </main>
  );
}
