import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/80">
      <Nav />
      <Hero />
    </div>
  );
}
