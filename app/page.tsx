import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-400/5 rounded-full blur-[100px]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:75px_75px]" />
      <div className="relative flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1 flex w-full">
          <Hero />
        </main>
        <Footer />
      </div>
    </div>
  );
}
