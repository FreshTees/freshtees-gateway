"use client";

import { getDesignToolUrl, getWorkflowGateMessage } from "@/lib/flow";

export function SmallOrderOutcome() {
  const url = getDesignToolUrl();
  const message = getWorkflowGateMessage();

  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-center">
      <h1 className="font-display font-bold text-2xl md:text-3xl text-off-black mb-4">
        You're in the right place
      </h1>
      <p className="font-body text-off-black/80 mb-8">
        {message}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 bg-burnt-orange text-white font-body font-medium rounded-lg hover:bg-burnt-orange/90 transition-colors"
      >
        Place order on our website
      </a>
    </div>
  );
}
