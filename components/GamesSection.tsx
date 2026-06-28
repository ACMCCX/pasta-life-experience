interface Game {
  emoji: string;
  title: string;
  description: string;
  color: string;
}

const upcomingGames: Game[] = [
  {
    emoji: "🍝",
    title: "Build Your Own Pasta Bowl",
    description: "Drag & drop your dream bowl. Share it. Eat it (maybe).",
    color: "#ff6b1a",
  },
  {
    emoji: "🍹",
    title: "Tony Negroni — Bartender Mode",
    description: "Mix cocktails under pressure. Don't spill.",
    color: "#e63030",
  },
  {
    emoji: "🏃",
    title: "Tortellini Kitchen Runner",
    description: "Infinite runner. Dodge the bad pasta. Collect the good stuff.",
    color: "#ffd700",
  },
  {
    emoji: "🖌️",
    title: "Graffiti Wall Art Maker",
    description: "Design your own GP tag. Show off in the gallery.",
    color: "#ff6b1a",
  },
  {
    emoji: "🧠",
    title: "Pasta Trivia",
    description: "How much do you actually know about pasta? Prove it.",
    color: "#e63030",
  },
  {
    emoji: "📱",
    title: "QR Scavenger Hunt",
    description: "Hidden QR codes around the restaurant. Find them all. Win stuff.",
    color: "#ffd700",
  },
];

function GameCard({ game }: { game: Game }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Locked overlay */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <span
          className="text-[10px] font-[family-name:var(--font-oswald)] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: "rgba(42,42,42,0.9)", color: "#f5f5f5", border: "1px solid #3a3a3a" }}
        >
          🔒 Coming Soon
        </span>
      </div>

      {/* Game icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
        style={{ background: `${game.color}15`, border: `1px solid ${game.color}30` }}
      >
        {game.emoji}
      </div>

      {/* Info */}
      <div>
        <h3
          className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wide text-[#f5f5f5] text-base leading-tight mb-1"
        >
          {game.title}
        </h3>
        <p className="text-[#f5f5f5]/50 text-xs font-[family-name:var(--font-inter)] leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Locked button */}
      <div
        className="mt-auto py-2 px-4 rounded-full text-center font-[family-name:var(--font-oswald)] font-semibold uppercase tracking-wider text-xs border border-[#2a2a2a] text-[#f5f5f5]/30 cursor-not-allowed select-none"
      >
        Loading...
      </div>

      {/* Color glow */}
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none opacity-20"
        style={{ background: game.color, filter: "blur(20px)" }}
      />
    </div>
  );
}

export default function GamesSection() {
  return (
    <section id="games" className="gp-section" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-[family-name:var(--font-oswald)] font-bold uppercase tracking-widest mb-4 border border-[#2a2a2a]"
            style={{ color: "#f5f5f5]/60", background: "rgba(42,42,42,0.5)" }}
          >
            Arcade Loading
          </div>
          <h2
            className="font-[family-name:var(--font-oswald)] font-bold uppercase leading-tight mb-3"
            style={{
              fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
              background: "linear-gradient(135deg, #e63030, #ff6b1a, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            GAMES — LOADING...
          </h2>
          <p className="text-[#f5f5f5]/50 font-[family-name:var(--font-inter)] text-sm">
            The Pasta Life Arcade is under construction. Games incoming.
          </p>
        </div>

        {/* Game cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {upcomingGames.map((game) => (
            <GameCard key={game.title} game={game} />
          ))}
        </div>

        {/* Coming soon note */}
        <div className="mt-8 text-center">
          <p className="text-[#f5f5f5]/30 text-xs font-[family-name:var(--font-inter)]">
            Earn GPC rewards by playing. Stay tuned.
          </p>
        </div>
      </div>

      <div className="mt-16 h-px max-w-2xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, #2a2a2a, transparent)" }} />
    </section>
  );
}
