"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black border-b-2 border-faded-orange shadow-lg shadow-faded-orange/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              {/* Ghost icon - simple rounded shape */}
              <svg
                viewBox="0 0 32 32"
                className="w-full h-full fill-ghost-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 4C10.5 4 6 8.5 6 14c0 4 2 7.5 5 9.5v3.5c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-3.5c3-2 5-5.5 5-9.5 0-5.5-4.5-10-10-10zm-4 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-ghost-white tracking-tight">
              WraithWatchers
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-faded-orange text-black font-bold shadow-lg"
                  : "text-ghost-white hover:bg-muted-gray/30 hover:shadow-md"
              }`}
            >
              Sightings Map
            </Link>
            <Link
              href="/post-sighting"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/post-sighting"
                  ? "bg-faded-orange text-black font-bold shadow-lg"
                  : "text-ghost-white hover:bg-muted-gray/30 hover:shadow-md"
              }`}
            >
              Post a Sighting
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

