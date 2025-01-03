import { useState } from "react";
import Link from "next/link"; // Import Link from next/link

export default function DesktopNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="text-2xl font-bold text-indigo-600">BlogSphere</span>
        </Link>

        <button
          className="md:hidden ml-auto text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center`}
        >
          <Link href="/" className="mr-5 hover:text-indigo-600">Home</Link>
          <Link href="/about" className="mr-5 hover:text-indigo-600">About</Link>
          <Link href="/blog" className="mr-5 hover:text-indigo-600">Blog</Link>
          <Link href="/contact" className="mr-5 hover:text-indigo-600">Contact</Link>
        </nav>

        <button className="hidden md:inline-flex items-center bg-indigo-600 text-white border-0 py-1 px-4 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0">
          Subscribe
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
