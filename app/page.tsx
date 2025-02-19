import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/home/footer";
import { GradientBlob } from "@/components/haber-ui/gradient-blob";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Nav />
      <main className="flex-1 flex items-center justify-center w-full relative">
        {/* Background Blobs */}
        <div className="absolute inset-0 -z-10">
          <GradientBlob
            variant="blue"
            size="xl"
            className="absolute -top-24 -left-24 opacity-40"
          />
          <GradientBlob
            variant="purple"
            size="xl"
            className="absolute top-1/2 -right-24 opacity-40"
          />
          <GradientBlob
            variant="emerald"
            size="lg"
            className="absolute bottom-24 left-1/4 opacity-30"
            animate={false}
          />
        </div>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
