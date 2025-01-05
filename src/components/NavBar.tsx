"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <nav className="relative flex items-center justify-between py-4">
        <Link href="/">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/portrait.svg?height=50&width=50"
              alt="Chris Yoo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">Chris Yoo</h1>
              <p>@PenTest-duck</p>
            </div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link
              href="/"
              className="text-foreground hover:text-muted-foreground"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/hackathons"
              className="text-foreground hover:text-muted-foreground"
            >
              Hackathons
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-foreground hover:text-muted-foreground"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="text-foreground hover:text-muted-foreground"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/random/ai"
              className="block text-foreground hover:text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              Random
            </Link>
          </li>
          <li>
            <div className="flex space-x-4 items-center">
              <Link href="https://github.com/PenTest-duck/personal-website">
                <SiGithub />
              </Link>
              <Link href="https://www.linkedin.com/in/chris-yoo">
                <SiLinkedin />
              </Link>
              <ThemeSwitch />
            </div>
          </li>
        </ul>

        {/* Mobile menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 z-10 bg-background shadow-lg rounded-lg md:hidden`}
        >
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link
                href="/"
                className="block text-foreground hover:text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/hackathons"
                className="block text-foreground hover:text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                Hackathons
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block text-foreground hover:text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="block text-foreground hover:text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/random/ai"
                className="block text-foreground hover:text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                Random
              </Link>
            </li>
            <li>
              <div className="flex space-x-4 items-center">
                <Link href="https://github.com/PenTest-duck/personal-website">
                  <SiGithub />
                </Link>
                <Link href="https://www.linkedin.com/in/chris-yoo">
                  <SiLinkedin />
                </Link>
                <ThemeSwitch />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
