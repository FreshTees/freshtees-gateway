"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BRAND_BY_ID,
  DEFAULT_BRAND_ID,
  getStoredBrandId,
  setStoredBrandId,
  type BrandId,
  type Brand,
} from "@/lib/brands";

type BrandContextValue = {
  brandId: BrandId;
  brand: Brand;
  setBrandId: (id: BrandId) => void;
};

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brandId, setBrandIdState] = useState<BrandId>(DEFAULT_BRAND_ID);
  const [mounted, setMounted] = useState(false);

  const setBrandId = useCallback((id: BrandId) => {
    setBrandIdState(id);
    setStoredBrandId(id);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brandParam = params.get("brand");
    if (brandParam === "rockit" || brandParam === "fresh") {
      setStoredBrandId(brandParam);
      setBrandIdState(brandParam);
    } else {
      const stored = getStoredBrandId();
      if (stored) setBrandIdState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const brand = BRAND_BY_ID[brandId];
    document.documentElement.style.setProperty("--accent", brand.accentColor);
    document.documentElement.style.setProperty(
      "--accent-hover",
      brand.accentColor + "E6"
    );
  }, [mounted, brandId]);

  const brand = BRAND_BY_ID[brandId];

  return (
    <BrandContext.Provider value={{ brandId, brand, setBrandId }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
