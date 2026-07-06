"use client";

interface Comic {
  id: string;
  title: string;
  coverImage: string;
  comicImage: string;
}

const comics: Comic[] = [
  {
    id: "bucatini",
    title: "Bucatini — Hallow Inside",
    coverImage: "/images/svaya/_Bucatini/_Bucatini_Hallow Inside_Cover.jpg",
    comicImage: "/images/svaya/_Bucatini/_Bucatini_Hallow Inside_P1.jpg",
  },
  {
    id: "eatmorpazta",
    title: "Eat More Pazta",
    coverImage: "/images/svaya/_Eat Mor Pazta/PastaLife_Eat More Pazta_Cover_P1.jpg",
    comicImage: "/images/svaya/_Eat Mor Pazta/PastaLife_Eat More Pazta_P2.jpg",
  },
  {
    id: "farfalle",
    title: "Farfalle — Bowtie Anonymous",
    coverImage: "/images/svaya/_Farfalle/_Farfalle Bowtie Anonymous_Bowtie_Cover_P1.jpg",
    comicImage: "/images/svaya/_Farfalle/_Farfalle Bowtie Anonymous_Bowtie_P2.jpg",
  },
];

function ComicCard({ comic }: { comic: Comic }) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Title */}
      <h3 className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-[#f5f5f5] text-lg">
        {comic.title}
      </h3>
      
      {/* Horizontal layout: Cover (left) + Comic (right) - Equal size panels */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Cover - Left (square frame) */}
        <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a]">
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={comic.coverImage}
              alt={`${comic.title} Cover`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>

        {/* Comic - Right (square frame) */}
        <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a]">
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={comic.comicImage}
              alt={comic.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComicsSection() {
  return (
    <section id="comics" className="gp-section" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2
            className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wider text-[#f5f5f5] mb-2"
            style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)" }}
          >
            🎨 Pasta Life Comics
          </h2>
          <p className="text-[#f5f5f5]/50 font-[family-name:var(--font-inter)] text-sm">
            Weekly comic strips by Svaya. New comics drop every Sunday.
          </p>
        </div>

        {/* Comics List - Stacked rows */}
        <div className="flex flex-col">
          {comics.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div
          className="mt-12 rounded-2xl border border-[#ff6b1a]/20 bg-[#1a1a1a] p-6 text-center"
        >
          <p className="font-[family-name:var(--font-oswald)] uppercase tracking-wider text-[#ff6b1a] font-bold mb-2">
            🔥 New Comics Coming Soon
          </p>
          <p className="text-[#f5f5f5]/50 text-sm font-[family-name:var(--font-inter)]">
            Keep checking back for new Pasta Life comic strips. Follow Svaya's journey as she continues to bring the Graffiti Pasta universe to life.
          </p>
        </div>
      </div>

      <div className="mt-16 h-px max-w-2xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, #2a2a2a, transparent)" }} />
    </section>
  );
}
