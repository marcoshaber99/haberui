import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Nav />
      <main className="flex-1 flex items-center justify-center w-full relative">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
