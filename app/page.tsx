import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Circular gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(52,211,153,0.1) 25%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:75px_75px]" />

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1 flex flex-col w-full items-center justify-center">
          <Hero />
        </main>
        <Footer />
      </div>
    </div>
  );
}
