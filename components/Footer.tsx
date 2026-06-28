const links = [
  { label: "graffitipasta.com", href: "https://graffitipasta.com", external: true },
  { label: "Instagram", href: "https://www.instagram.com/graffiti_pasta", external: true },
  { label: "TikTok", href: "https://tiktok.com/@graffitipasta", external: true },
];

const sectionLinks = [
  { label: "Music", href: "#music" },
  { label: "Watch", href: "#videos" },
  { label: "Merch", href: "#merch" },
  { label: "Art", href: "#art" },
  { label: "Rewards", href: "#rewards" },
  { label: "Games", href: "#games" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t border-[#2a2a2a] pt-12 pb-8 px-4"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg, #e63030, #ff6b1a, #ffd700, #ff6b1a, #e63030)" }}
      />

      <div className="max-w-2xl mx-auto">
        {/* Logo area */}
        <div className="text-center mb-8">
          <h2
            className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-widest text-[#f5f5f5] text-2xl mb-1"
          >
            GRAFFITI PASTA
          </h2>
          <p
            className="text-sm font-[family-name:var(--font-inter)]"
            style={{ color: "#ff6b1a" }}
          >
            🍝 Graffiti Pasta
          </p>
        </div>

        {/* Section nav */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#f5f5f5]/50 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider hover:text-[#ff6b1a] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "linear-gradient(90deg, transparent, #2a2a2a, transparent)" }}
        />

        {/* External links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-[#f5f5f5]/60 text-sm font-[family-name:var(--font-inter)] hover:text-[#ff6b1a] transition-colors underline underline-offset-4 decoration-[#2a2a2a]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Address */}
        <p className="text-center text-[#f5f5f5]/30 text-xs font-[family-name:var(--font-inter)] mb-6">
          Graffiti Pasta
        </p>

        {/* Powered by */}
        <p
          className="text-center text-[10px] font-[family-name:var(--font-oswald)] uppercase tracking-widest"
          style={{ color: "#f5f5f5", opacity: 0.2 }}
        >
          Powered by Pasta Life
        </p>

        {/* Copyright */}
        <p className="text-center text-[#f5f5f5]/20 text-[10px] font-[family-name:var(--font-inter)] mt-2">
          © {new Date().getFullYear()} Graffiti Pasta / ACM Creative Concepts. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
