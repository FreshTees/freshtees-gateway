"use client";

const COLLECTIONS_URL = "https://freshtees.com.au/collections";

export function SmallOrderOutcome() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-center space-y-8">
      <section>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-off-black mb-2">
          Awesome, you're in the right spot for custom merch made easy
        </h1>
      </section>
      <a
        href={COLLECTIONS_URL}
        className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 bg-burnt-orange text-white font-body font-medium rounded-lg hover:bg-burnt-orange/90 focus:outline-none focus:ring-2 focus:ring-burnt-orange focus:ring-offset-2"
      >
        Order Now
      </a>
    </div>
  );
}
