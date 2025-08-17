import MyTimeline from "@/components/MyTimeline";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center container mx-auto px-4 pt-12">
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-4">Hello, I&apos;m Chris 👋</h2>
        <p className="text-xl mb-8">Startups x AI x Cybersecurity x Software</p>
        <Image
          src="/images/portrait.svg?height=300&width=300"
          alt="Chris Yoo"
          width={300}
          height={300}
          className="rounded-full mx-auto mb-8"
        />
        <p className="text-lg max-w-2xl mx-auto">
          On a mission to build great things and solve huge problems.
        </p>
      </section>
      <section className="mt-12">
        <MyTimeline />
      </section>
    </main>
  );
}
