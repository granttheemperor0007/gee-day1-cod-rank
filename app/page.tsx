"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  Crown,
  Gamepad2,
  Gem,
  Info,
  Loader,
  Search,
  Shield,
  Star,
  Trophy,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MOCK_LEADERBOARD } from "@/lib/mock-leaderboard";

const TIER_BADGES: Record<
  string,
  { Icon: LucideIcon; gradient: string; iconColor: string; topShine: string }
> = {
  CHAMPION: {
    Icon: Crown,
    gradient:
      "linear-gradient(155deg, #FFE48A 0%, #F4B400 45%, #B07900 100%)",
    iconColor: "#5C3A00",
    topShine: "rgba(255, 245, 200, 0.6)",
  },
  DIAMOND: {
    Icon: Gem,
    gradient:
      "linear-gradient(155deg, #B5E2FF 0%, #2196F3 45%, #0B5394 100%)",
    iconColor: "#0B2A4A",
    topShine: "rgba(220, 240, 255, 0.6)",
  },
  PLATINUM: {
    Icon: Trophy,
    gradient:
      "linear-gradient(155deg, #DCEBF5 0%, #88B0C9 45%, #3D6680 100%)",
    iconColor: "#1F3548",
    topShine: "rgba(245, 250, 255, 0.6)",
  },
  "GOLD I": {
    Icon: Star,
    gradient:
      "linear-gradient(155deg, #FFE48A 0%, #DAA520 45%, #886B17 100%)",
    iconColor: "#5C3A00",
    topShine: "rgba(255, 245, 200, 0.55)",
  },
  "GOLD II": {
    Icon: Star,
    gradient:
      "linear-gradient(155deg, #FFD25C 0%, #C68A1A 45%, #6E4F0E 100%)",
    iconColor: "#4A2C00",
    topShine: "rgba(255, 240, 180, 0.5)",
  },
  SILVER: {
    Icon: Shield,
    gradient:
      "linear-gradient(155deg, #F5F5F5 0%, #B0B0B0 45%, #6B6B6B 100%)",
    iconColor: "#2A2A2A",
    topShine: "rgba(255, 255, 255, 0.6)",
  },
  "BRONZE I": {
    Icon: Shield,
    gradient:
      "linear-gradient(155deg, #E8B080 0%, #B5701D 45%, #743F00 100%)",
    iconColor: "#3D1F00",
    topShine: "rgba(255, 215, 175, 0.55)",
  },
  "BRONZE II": {
    Icon: Shield,
    gradient:
      "linear-gradient(155deg, #D69870 0%, #92561A 45%, #4F2A00 100%)",
    iconColor: "#2C1500",
    topShine: "rgba(245, 200, 160, 0.5)",
  },
};

const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

function TierBadge({ tier, size = 56 }: { tier: string; size?: number }) {
  const cfg = TIER_BADGES[tier] ?? TIER_BADGES.SILVER;
  const Icon = cfg.Icon;
  const sparkles = [
    { top: "18%", left: "28%", size: 3, delay: "0s" },
    { top: "32%", left: "72%", size: 2, delay: "0.6s" },
    { top: "62%", left: "20%", size: 2, delay: "1.1s" },
    { top: "70%", left: "78%", size: 3, delay: "1.7s" },
  ];
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: Math.round(size * 1.1),
        clipPath: HEX_CLIP,
        background: cfg.gradient,
        filter:
          "drop-shadow(0 4px 12px rgba(0,0,0,0.45)) drop-shadow(0 0 1px rgba(0,0,0,0.6))",
      }}
    >
      {/* Top highlight + bottom shade for bevel */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: 0,
          clipPath: HEX_CLIP,
          background: `linear-gradient(180deg, ${cfg.topShine} 0%, transparent 38%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0.32) 100%)`,
        }}
      />

      {/* Inner emboss ring — bright top edge, dark bottom edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: 0,
          clipPath: HEX_CLIP,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Glitter sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: 0,
          clipPath: HEX_CLIP,
          background:
            "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
          backgroundSize: "220% 100%",
          animation: "glitter-sweep 3.2s linear infinite",
          mixBlendMode: "screen",
        }}
      />

      {/* Sparkle dots */}
      {sparkles.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 0 4px rgba(255,255,255,0.95)",
            animation: `glitter-sparkle 2.2s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      <Icon
        size={Math.round(size * 0.45)}
        color={cfg.iconColor}
        strokeWidth={2.5}
        style={{
          position: "relative",
          filter:
            "drop-shadow(0 1px 0 rgba(255,255,255,0.45)) drop-shadow(0 -1px 0 rgba(0,0,0,0.35))",
        }}
      />
    </div>
  );
}

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

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jiggle, setJiggle] = useState(false);
  const [leaderboardExpanded, setLeaderboardExpanded] = useState(false);
  const userRowRef = useRef<HTMLDivElement>(null);

  const charSum = [...playerId].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const userKD = Math.round((0.4 + ((charSum * 13) % 1000) / 333) * 100) / 100;
  const userKills = ((charSum * 7) % 4800) + 200;
  const userDeaths = Math.max(1, Math.round(userKills / userKD));

  const ranked = [
    ...MOCK_LEADERBOARD,
    { gamertag: "__USER__", kd: userKD },
  ].sort((a, b) => b.kd - a.kd);
  const TOTAL_RANKED = ranked.length;
  const userIdx = ranked.findIndex((e) => e.gamertag === "__USER__");
  const userRank = userIdx + 1;
  const windowSize = leaderboardExpanded ? 11 : 3;
  const aboveCount = leaderboardExpanded ? 5 : 1;
  const windowStart = Math.max(
    0,
    Math.min(userIdx - aboveCount, TOTAL_RANKED - windowSize),
  );
  const visibleRows = ranked.slice(windowStart, windowStart + windowSize);
  const userTier = (() => {
    if (userRank <= 3) return "CHAMPION";
    if (userRank <= 8) return "DIAMOND";
    if (userRank <= 15) return "PLATINUM";
    if (userRank <= 22) return "GOLD I";
    if (userRank <= 30) return "GOLD II";
    if (userRank <= 38) return "SILVER";
    if (userRank <= 46) return "BRONZE I";
    return "BRONZE II";
  })();

  const handleSearchAnother = () => {
    setSubmitted(false);
    setLoading(false);
    setPlayerId("");
    setError(null);
    setLeaderboardExpanded(false);
    setTimeout(() => playerIdRef.current?.focus(), 50);
  };

  const handleSubmit = () => {
    if (loading || submitted) return;
    if (!ready) {
      let msg = "Please pick a game and enter your Player ID";
      if (game && !playerId) msg = "Please enter your Player ID";
      else if (!game && playerId) msg = "Please pick a game";
      setError(msg);
      setJiggle(true);
      setTimeout(() => setJiggle(false), 500);
      requestAnimationFrame(() => {
        if (!game) setGameOpen(true);
        else playerIdRef.current?.focus();
      });
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 3000);
  };

  useEffect(() => {
    playerIdRef.current?.focus();
  }, []);

  useEffect(() => {
    if (game && !gameOpen) {
      const t = setTimeout(() => playerIdRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [game, gameOpen]);

  useEffect(() => {
    if (submitted && leaderboardExpanded) {
      const t = setTimeout(() => {
        userRowRef.current?.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [submitted, leaderboardExpanded]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("muted", "");

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          const kick = () => {
            v.play().catch(() => {});
            document.removeEventListener("touchstart", kick);
            document.removeEventListener("touchend", kick);
            document.removeEventListener("click", kick);
            document.removeEventListener("scroll", kick);
          };
          document.addEventListener("touchstart", kick, { once: true });
          document.addEventListener("touchend", kick, { once: true });
          document.addEventListener("click", kick, { once: true });
          document.addEventListener("scroll", kick, { once: true });
        });
      }
    };
    const onVisibility = () => {
      if (!document.hidden && v.paused) tryPlay();
    };
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("pause", () => {
      if (!v.ended) tryPlay();
    });
    document.addEventListener("visibilitychange", onVisibility);
    tryPlay();
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
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
    <main className="relative flex flex-1 flex-col items-center justify-center px-5 py-12 sm:px-4">
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
      <div
        className={`flex flex-col ${
          submitted
            ? "items-center sm:items-start sm:[transform:translate(-15vw,250px)]"
            : "items-center"
        }`}
        style={{
          transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <h1
          className={`font-display font-extrabold uppercase tracking-normal leading-[1.03] text-white ${
            submitted
              ? "text-[40px] sm:text-[66px] text-center sm:text-left"
              : "text-[40px] sm:text-[90px] text-center"
          }`}
          style={{
            transition: "font-size 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span className="block">K/D</span>
          <span className="block">Tracker</span>
        </h1>
        <p
          className={`mt-4 max-w-md text-neutral-400 ${
            submitted ? "text-center sm:text-left" : "text-center"
          }`}
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
        className={`relative mt-20 rounded-[32px] p-px ${
          submitted ? "sm:[transform:translate(15vw,-170px)]" : ""
        }`}
        style={{
          width: "fit-content",
          minWidth: 336,
          background:
            "radial-gradient(circle at 26% 13%, #36363A 0%, #36363A 26%, #18181B 50%, #222225 100%)",
          boxShadow:
            "0 4px 4px rgba(0,0,0,0.25), 0 8px 8px rgba(0,0,0,0.25)",
          transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
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

          {!submitted && (
          <div>

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
                              setError(null);
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
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Player ID"
                    value={playerId}
                    onChange={(e) => {
                      setPlayerId(e.target.value);
                      setError(null);
                    }}
                    className={`bg-transparent text-white outline-none placeholder:text-white placeholder:opacity-50 ${playerId === "" ? "caret-transparent" : "caret-white"}`}
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

          {error && (
            <div
              className="mx-2 mt-3 flex items-center justify-center gap-1.5"
              style={{
                color: "#E84536",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                lineHeight: "18px",
                letterSpacing: "-0.02em",
              }}
            >
              <AlertTriangle size={14} strokeWidth={2.25} />
              <span>{error}</span>
            </div>
          )}

          <div className="mx-2 mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className={`glow-button ${jiggle ? "glow-button-jiggle" : ""} relative flex items-center justify-center overflow-hidden rounded-full ${
              loading ? "h-10 w-10 py-0" : "w-full py-2"
            }`}
            style={{
              backgroundColor: "#C2EE48",
              color: "#1F1F0D",
              fontFamily: "var(--font-big-shoulders)",
              fontWeight: 800,
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "-0.015em",
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
            {loading ? (
              <span
                className="relative inline-flex"
                style={{ animation: "spin 0.9s steps(8) infinite" }}
              >
                <Loader size={20} strokeWidth={2.5} color="#1F1F0D" />
              </span>
            ) : (
              <span className="relative">Submit to see your rank</span>
            )}
          </button>
          </div>
          </div>
          )}

          {submitted && (
            <div className="mx-2 mt-4">
              <div
                className="flex items-center gap-3 rounded-[20px] px-4 py-3"
                style={{
                  border: "1px solid transparent",
                  backgroundImage:
                    "linear-gradient(#1F2023, #1F2023), radial-gradient(ellipse 200% 100% at 50% 50%, #232327 35%, #48484F 68%, #29292E 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 4px 44px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  className="flex shrink-0 items-center justify-center rounded-md bg-neutral-700/50"
                  style={{ width: 40, height: 40 }}
                >
                  <span
                    className="text-white"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {playerId.slice(0, 2).toUpperCase() || "?"}
                  </span>
                </div>

                <div className="flex min-w-0 flex-col">
                  <span
                    className="truncate text-white"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "15px",
                      letterSpacing: "-0.02em",
                      lineHeight: "20px",
                    }}
                  >
                    {playerId}
                  </span>
                  <span
                    className="truncate text-neutral-400"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      letterSpacing: "-0.02em",
                      lineHeight: "16px",
                    }}
                  >
                    {game}
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-1.5 shrink-0">
                  <span
                    className="rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      background: "#34A873",
                      boxShadow: "0 0 6px rgba(52,168,115,0.7)",
                    }}
                  />
                  <span
                    className="text-neutral-300"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center">
                <p
                  className="uppercase text-neutral-500"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                  }}
                >
                  Your rank
                </p>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <TierBadge tier={userTier} size={36} />
                  <p
                    className="font-display"
                    style={{
                      fontSize: "32px",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "#C2EE48",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #{userRank}{" "}
                    <span style={{ color: "#737373" }}>of {TOTAL_RANKED}</span>
                  </p>
                </div>
                <p
                  className="text-white"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    marginTop: 6,
                  }}
                >
                  {userTier}
                </p>
              </div>

              <div
                className="mt-6 grid grid-cols-3 rounded-[16px]"
                style={{
                  border: "1px solid #313131",
                  overflow: "hidden",
                }}
              >
                {[
                  { label: "K/D", value: userKD.toFixed(2) },
                  { label: "Kills", value: userKills.toLocaleString() },
                  { label: "Deaths", value: userDeaths.toLocaleString() },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center py-3"
                    style={{
                      borderLeft: i === 0 ? "none" : "1px solid #313131",
                    }}
                  >
                    <span
                      className="uppercase text-neutral-500"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="font-display tabular-nums text-white"
                      style={{
                        fontSize: "22px",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        marginTop: 2,
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: "#313131" }} />
                <span
                  className="uppercase text-neutral-500"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                  }}
                >
                  Leaderboard
                </span>
                <div className="h-px flex-1" style={{ background: "#313131" }} />
              </div>

              <div
                className="mt-3 flex flex-col overflow-y-auto"
                style={{ maxHeight: 132 }}
              >
                {visibleRows.map((entry, i) => {
                  const rank = windowStart + i + 1;
                  const isUser = entry.gamertag === "__USER__";
                  return (
                    <div
                      key={`${rank}-${entry.gamertag}`}
                      ref={isUser ? userRowRef : undefined}
                      className="flex shrink-0 items-center rounded-lg px-3 py-2"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        letterSpacing: "-0.02em",
                        background: isUser ? "rgba(194,238,72,0.10)" : "transparent",
                        border: isUser
                          ? "1px solid rgba(194,238,72,0.55)"
                          : "1px solid transparent",
                      }}
                    >
                      <span
                        className="tabular-nums text-neutral-500"
                        style={{ width: 32 }}
                      >
                        #{rank}
                      </span>
                      <span
                        className={`flex-1 ${isUser ? "text-white" : "text-neutral-300"}`}
                        style={{ fontWeight: isUser ? 600 : 400 }}
                      >
                        {isUser ? "YOU" : entry.gamertag}
                      </span>
                      <span
                        className="font-display tabular-nums text-white"
                        style={{ fontSize: "16px" }}
                      >
                        {entry.kd.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setLeaderboardExpanded((v) => !v)}
                className="mt-3 w-full rounded-lg py-2 text-center transition-colors hover:bg-white/5"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "#C2EE48",
                }}
              >
                {leaderboardExpanded ? "View less" : "View more"}
              </button>

              <button
                type="button"
                onClick={handleSearchAnother}
                className="mt-3 w-full rounded-full py-2 text-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110"
                style={{
                  backgroundColor: "#C2EE48",
                  color: "#1F1F0D",
                  fontFamily: "var(--font-big-shoulders)",
                  fontWeight: 800,
                  fontSize: "13px",
                  lineHeight: "18px",
                  letterSpacing: "-0.015em",
                }}
              >
                Search another player
              </button>
            </div>
          )}
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
