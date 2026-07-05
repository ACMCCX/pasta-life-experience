"use client";

import { useState } from "react";
import artConfig from "@/config/art.json";

interface Artwork {
  id: string;
  title: string;
  price: number;
  medium: string;
  dimensions: string;
  image: string;
  available: boolean;
  stripeProductId: string;
}

interface Artist {
  id: string;
  name: string;
  bio: string;
  website: string;
  instagram: string | null;
  artworks: Artwork[];
}

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      console.log("Purchase clicked for:", artwork.title, artwork.stripeProductId);
      // Call backend to create Stripe checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: artwork.stripeProductId,
          quantity: 1,
          title: artwork.title,
        }),
      });

      console.log("Checkout API response:", response);
      const data = await response.json();
      console.log("Checkout data:", data);
      
      if (data.url) {
        console.log("Redirecting to:", data.url);
        window.location.href = data.url; // Redirect to Stripe checkout
      } else if (data.error) {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error processing checkout. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a] flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
    >
      {/* Art image */}
      <div
        className="w-full aspect-square flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${artwork.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          background: artwork.image
            ? `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${artwork.image})`
            : "linear-gradient(135deg, #1a1a1a, #2a1010, #1a1a1a)",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!artwork.image && (
          <>
            <span className="text-5xl mb-2">🎨</span>
            <span className="text-[#f5f5f5]/30 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wide text-center px-4">
              {artwork.title}
            </span>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wide text-[#f5f5f5] text-base leading-tight mb-1">
          {artwork.title}
        </h3>
        <p className="text-[#f5f5f5]/40 text-xs font-[family-name:var(--font-inter)] mb-3">
          {artwork.medium} • {artwork.dimensions}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="font-[family-name:var(--font-oswald)] font-bold text-[#ffd700] text-lg">
            ${artwork.price}
          </span>
          {artwork.available ? (
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="flex-1 text-center py-2 px-4 rounded-full font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #e63030, #ff6b1a)" }}
            >
              {isLoading ? "Loading..." : "Purchase"}
            </button>
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
          Artists coming soon. Every piece sold supports the creator.
          100% goes to the artist.
        </p>
      </div>
    </div>
  );
}

function ArtistSection({ artist }: { artist: Artist }) {
  return (
    <div className="mb-12">
      {/* Artist Header */}
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-[#f5f5f5] text-2xl mb-2">
          {artist.name}
        </h3>
        <p className="text-[#f5f5f5]/60 font-[family-name:var(--font-inter)] text-sm leading-relaxed mb-4">
          {artist.bio}
        </p>
        {/* Links */}
        <div className="flex gap-4 items-center">
          {artist.website && (
            <a
              href={artist.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#ff6b1a] hover:text-[#ffd700] transition-colors text-sm font-[family-name:var(--font-oswald)] uppercase tracking-wide"
            >
              🌐 Website
            </a>
          )}
          {artist.instagram && (
            <a
              href={artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#ff6b1a] hover:text-[#ffd700] transition-colors text-sm font-[family-name:var(--font-oswald)] uppercase tracking-wide"
            >
              📱 Instagram
            </a>
          )}
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {artist.artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[#f5f5f5]/40 font-[family-name:var(--font-inter)] text-xs mt-6 italic">
        All proceeds go directly to {artist.name}. Pick up in-house at Graffiti Pasta Denton.
      </p>
    </div>
  );
}

export default function ArtGallery() {
  const { artists, galleryInfo } = artConfig as {
    galleryInfo: string;
    contactEmail: string;
    artists: Artist[];
  };

  const hasArtists = artists && artists.length > 0;

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
            Local artists. 100% to the creator.
          </p>
        </div>

        {hasArtists ? (
          <>
            {/* Gallery mission */}
            <p className="text-[#f5f5f5]/60 font-[family-name:var(--font-inter)] text-sm leading-relaxed mb-8 border-l-2 border-[#ff6b1a] pl-4">
              {galleryInfo}
            </p>
            {/* Artist sections */}
            {artists.map((artist) => (
              <ArtistSection key={artist.id} artist={artist} />
            ))}
          </>
        ) : (
          <GalleryPlaceholder galleryInfo={galleryInfo} />
        )}
      </div>

      <div className="mt-16 h-px max-w-2xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, #2a2a2a, transparent)" }} />
    </section>
  );
}
