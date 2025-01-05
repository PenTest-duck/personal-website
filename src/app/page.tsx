import MyTimeline from "@/components/MyTimeline";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-scroll bg-gradient-to-br from-cyan-100 to-blue-500 p-8">
      <div className="flex flex-row">
        <Link href="/hackathons">
          <button className="absolute top-4 right-4 px-4 py-2 bg-white text-blue-500 rounded-lg shadow-md hover:bg-blue-50 transition-colors">
            Home
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row">
        <Image
          src="/images/portrait-no-bg.png"
          alt="Chris Yoo"
          width={300}
          height={300}
          className="mx-auto rounded-full border-2 border-slate-400"
        />
        <div className="flex flex-col justify-center md:ml-8 mt-8 md:mt-0 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white">
            Hello, I&apos;m Chris 👋
          </h1>
          <p className="text-xl text-white mt-4">
            19 year old. University student. Software developer. AI enthusiast.
            Aspiring founder.
          </p>
        </div>
      </div>
    </main>
    // <main className="flex flex-col justify-center items-center container mx-auto px-4 py-12">
    //   <section className="text-center">
    //     <h2 className="text-4xl font-bold mb-4">Hello, I&apos;m Chris 👋</h2>
    //     <p className="text-xl mb-8">
    //       19 year old. University student. Software developer. AI enthusiast.
    //       Aspiring founder.
    //     </p>
    //     <Image
    //       src="/images/portrait.svg?height=300&width=300"
    //       alt="Chris Yoo"
    //       width={300}
    //       height={300}
    //       className="rounded-full mx-auto mb-8"
    //     />
    //     <p className="text-lg max-w-2xl mx-auto">
    //       As a passionate software developer, I&apos;m constantly exploring new
    //       technologies and pushing the boundaries of what&apos;s possible. My
    //       goal is to create innovative solutions that make a positive impact on
    //       the world.
    //     </p>
    //   </section>
    //   <section className="mt-48">
    //     <MyTimeline />
    //   </section>
    // </main>
  );
}
