import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-black">
            BlogApp
          </Link>
        </div>

        <div className="flex gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-black transition">
            About
          </Link>

          <Link href="/blog" className="hover:text-black transition">
            Blog
          </Link>

          <Link href="/dashboard" className="hover:text-black transition">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hover:text-black transition">
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-1 rounded-md border border-black text-black hover:bg-black hover:text-white transition"
          >
            Register
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
