"use client";

import { useState } from "react";
import { getPrivacyPolicyUrl } from "@/lib/flow";

export type ProjectDataForQuote = {
  project_purpose: string;
  artwork_status?: "yes" | "partially" | "no";
  contact_details?: { fullName: string; email: string; phone: string; businessName?: string };
  products: {
    product_type: string;
    garment_model: string;
    garment_colour: string;
    quantity: number;
    placements: { location: string; print_type: string; colour_count?: number }[];
    finishes: string[];
    due_date?: string;
    rush_flag: boolean;
    indicative_total?: number;
  }[];
  indicative_pricing_shown?: {
    estimatedProjectTotal: number;
    totalUnits: number;
    productCalculations: unknown[];
  };
  timestamp?: string;
};

export function QuoteForm({
  answers,
  context,
  projectData,
}: {
  answers: Record<string, string>;
  context: "education" | "qualified";
  projectData?: ProjectDataForQuote | null;
}) {
  const [name, setName] = useState(projectData?.contact_details?.fullName ?? "");
  const [email, setEmail] = useState(projectData?.contact_details?.email ?? "");
  const [phone, setPhone] = useState(projectData?.contact_details?.phone ?? "");
  const [message, setMessage] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const privacyUrl = getPrivacyPolicyUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          marketingConsent: marketing,
          context,
          answers,
          ...(projectData && {
            project_purpose: projectData.project_purpose,
            artworkStatus: projectData.artwork_status,
            contact_details: projectData.contact_details ?? { fullName: name, email, phone },
            project_products: projectData.products,
            indicative_pricing_shown: projectData.indicative_pricing_shown,
            timestamp: projectData.timestamp ?? new Date().toISOString(),
          }),
        }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    }
  };

  if (sent) {
    return (
      <p className="font-body text-off-black/80">
        Thanks. We've got your details and will be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-body text-sm font-medium text-off-black mb-1">
          Name *
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-off-black/20 rounded-lg font-body"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-body text-sm font-medium text-off-black mb-1">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-off-black/20 rounded-lg font-body"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block font-body text-sm font-medium text-off-black mb-1">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border border-off-black/20 rounded-lg font-body"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-body text-sm font-medium text-off-black mb-1">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 border border-off-black/20 rounded-lg font-body"
        />
      </div>

      <div>
        <label className="flex gap-3 items-start cursor-pointer">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1"
          />
          <span className="font-body text-sm text-off-black/80">
            We'd love to keep you in the loop with tips, offers and news. You can unsubscribe anytime.{" "}
            <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="underline text-off-black">
              Privacy policy
            </a>
          </span>
        </label>
      </div>

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="px-8 py-4 bg-off-black text-white font-body font-medium rounded-lg hover:bg-off-black/90"
      >
        Submit
      </button>
    </form>
  );
}
