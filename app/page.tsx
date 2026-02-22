import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="flex h-screen w-full items-center justify-center bg-white">
        <p className="text-lg text-gray-600">Content section — scroll to test animation</p>
      </section>
    </>
  );
}
