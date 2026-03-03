import Image from "next/image";
import { Wizard } from "@/components/Wizard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-off-black/10 bg-off-black">
        <div className="max-w-xl mx-auto px-6 py-6">
          <a href="/" className="inline-block">
            <Image
              src="/fresh-logo.png"
              alt="FRESH."
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </a>
        </div>
      </header>
      <Wizard />
    </main>
  );
}
