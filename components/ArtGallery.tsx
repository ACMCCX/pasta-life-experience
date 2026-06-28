import artConfig from "@/config/art.json";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  description: string;
  image: string;
  available: boolean;
  medium?: string;
}

function ArtworkCard({ artwork, contactEmail }: { artwork: Artwork; contactEmail: string }) {
  const inquireHref = `mailto:${contactEmail}?subject=Art Inquiry: ${encodeURIComponent(artwork.title)} by ${encodeURIComponent(artwork.artist)}&body=I'm interested in "${encodeURIComponent(artwork.title)}" by ${encodeURIComponent(artwork.artist)}. Please send me more information.`;

  return (
    <div
      className="rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a] flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
    >
      {/* Art image placeholder */}
      <div
        className="w-full aspect-square flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1a1a1a, #2a1010, #1a1a1a)" }}
      >
        <span className="text-5xl mb-2">🎨</span>
        <span className="text-[#f5f5f5]/30 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wide text-center px-4">
          {artwork.title}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-[#ff6b1a] text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold">
            {artwork.artist}
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wide text-[#f5f5f5] text-base leading-tight mb-1">
          {artwork.title}
        </h3>
        {artwork.medium && (
          <p className="text-[#f5f5f5]/40 text-xs font-[family-name:var(--font-inter)] mb-2">
            {artwork.medium}
          </p>
        )}
        <p className="text-[#f5f5f5]/50 text-xs font-[family-name:var(--font-inter)] leading-relaxed flex-1 mb-3">
          {artwork.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <span className="font-[family-name:var(--font-oswald)] font-bold text-[#ffd700] text-lg">
            {artwork.price}
          </span>
          {artwork.available ? (
            <a
              href={inquireHref}
              className="flex-1 text-center py-2 px-4 rounded-full font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #e63030, #ff6b1a)" }}
            >
              Inquire
            </a>
          ) : (
            <span className="flex-1 text-center py-2 px-4 rounded-full font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-sm border border-[#2a2a2a] text-[#f5f5f5]/30 cursor-default">
              Sold
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryPlaceholder({ galleryInfo }: { galleryInfo: string }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Mission statement */}
      <div
        className="rounded-2xl border border-[#ff6b1a]/30 bg-[#1a1a1a] p-6"
        style={{ boxShadow: "0 0 30px rgba(255, 107, 26, 0.08)" }}
      >
        <div className="text-4xl mb-4 text-center">🎨</div>
        <p
          className="text-center font-[family-name:var(--font-inter)] text-[#f5f5f5]/70 leading-relaxed text-sm"
        >
          {galleryInfo}
        </p>
      </div>

      {/* Coming soon cards */}
      <div
        className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-10 flex flex-col items-center justify-center gap-4 text-center"
      >
        <div className="grid grid-cols-3 gap-3 mb-4">
          {["🖌️", "🖼️", "✏️", "🎭", "🖊️", "🎪"].map((emoji, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-2xl"
            >
              {emoji}
            </div>
          ))}
        </div>
        <p
          className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-[#f5f5f5] text-xl"
        >
          Gallery Loading
        </p>
        <p className="text-[#f5f5f5]/50 font-[family-name:var(--font-inter)] text-sm max-w-xs leading-relaxed">
          Denton artists coming soon. Every piece sold supports a local creator.
          100% goes to the artist.
        </p>
      </div>
    </div>
  );
}

export default function ArtGallery() {
  const { artworks, galleryInfo, contactEmail } = artConfig as {
    galleryInfo: string;
    contactEmail: string;
    artworks: Artwork[];
  };

  const hasArtworks = artworks.length > 0;

  return (
    <section id="art" className="gp-section" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2
            className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-[#f5f5f5] mb-2"
            style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)" }}
          >
            🎨 Art Gallery
          </h2>
          <p className="text-[#f5f5f5]/50 font-[family-name:var(--font-inter)] text-sm">
            Local Denton artists. 100% to the creator.
          </p>
        </div>

        {hasArtworks ? (
          <>
            {/* Gallery mission */}
            <p className="text-[#f5f5f5]/60 font-[family-name:var(--font-inter)] text-sm leading-relaxed mb-6 border-l-2 border-[#ff6b1a] pl-4">
              {galleryInfo}
            </p>
            {/* Artwork grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} contactEmail={contactEmail} />
              ))}
            </div>
          </>
        ) : (
          <GalleryPlaceholder galleryInfo={galleryInfo} />
        )}
      </div>

      <div className="mt-16 h-px max-w-2xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, #2a2a2a, transparent)" }} />
    </section>
  );
}
