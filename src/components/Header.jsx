import Link from "next/link";

// components/HeaderSpiceInspired.jsx
export default function Header() {
   return (
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-5 bg-white/10 backdrop-blur-md">
         {/* Left Logo */}
         <div className="text-4xl font-signature text-green-900 ml-10">
            💝
            <span className="text-red-500 font-bold ml-[-5px]">@firstbite</span>
         </div>

         {/* Center Nav */}
         <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide text-green-900 font-semibold">
            <Link className=" hover:text-red-600" href="/">
               Home
            </Link>
            <Link className=" hover:text-red-600" href="/about">
               About
            </Link>
            <Link className=" hover:text-red-600" href="/contact">
               Contact
            </Link>
            <Link className=" hover:text-red-600" href="whyus">
               Why us
            </Link>
         </nav>

         {/* Right Button */}
         <button className="border border-red-800 text-green-800 px-4 py-1.5 rounded-full text-sm hover:bg-green-800 hover:text-white transition">
            Sign In
         </button>
      </header>
   );
}
