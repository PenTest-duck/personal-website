import HackathonCard from "@/components/HackathonCard";
import hackathons from "@/data/hackathons.json";

export default function Hackathons() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-4">Hackathons</h2>
        <p className="text-xl mb-8">
          I&apos;ve participated in several hackathons over the years. Here is a
          compilation of them.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((hackathon, index) => (
            <HackathonCard key={index} {...hackathon} />
          ))}
        </div>
      </section>
    </main>
  );
}
