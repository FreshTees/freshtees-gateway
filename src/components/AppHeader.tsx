"use client";

import Image from "next/image";
import { useBrand } from "@/contexts/BrandContext";

export function AppHeader() {
  const { brand } = useBrand();

  return (
    <header className="border-b border-off-black/10 bg-off-black">
      <div className="max-w-xl mx-auto px-6 py-6">
        <a href="/" className="inline-block shrink-0">
          {brand.logoUrl ? (
            <Image
              src={brand.logoUrl}
              alt={brand.name}
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          ) : (
            <RockItLogo accentColor={brand.accentColor} poweredBy={brand.poweredBy} />
          )}
        </a>
      </div>
    </header>
  );
}

/** Rock It Merch text logo (inverted for dark header): ROCK IT outline, MERCH on teal bar, POWERED BY FRESH. */
function RockItLogo({
  accentColor,
  poweredBy,
}: {
  accentColor: string;
  poweredBy?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-col leading-none">
        <span
          className="font-bold text-lg tracking-tight text-white border-2 border-white px-1.5 pb-0.5"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          ROCK IT
        </span>
        <span
          className="font-bold text-lg tracking-tight text-white px-1.5 py-0.5"
          style={{ backgroundColor: accentColor, fontFamily: "system-ui, sans-serif" }}
        >
          MERCH
        </span>
      </div>
      {poweredBy && (
        <p className="text-[10px] leading-tight text-white/90" style={{ fontFamily: "system-ui, sans-serif" }}>
          POWERED BY{" "}
          <span className="font-semibold" style={{ color: accentColor }}>
            {poweredBy}
          </span>
        </p>
      )}
    </div>
  );
}
