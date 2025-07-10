"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
   Menu,
   X,
   Heart,
   Phone,
   Mail,
   MapPin,
   Clock,
   Instagram,
   Facebook,
   Twitter,
   MessageCircle,
   ChevronUp,
   Coffee,
   UtensilsCrossed,
   Users,
   Shield,
   Truck,
   Star,
} from "lucide-react";

// Mobile Responsive Header Component
export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const navItems = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/howitworks", label: "How it works" },
      { href: "/bookus", label: "Book Us" },
      { href: "/contact", label: "Contact" },
   ];

   return (
      <header
         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled
               ? "bg-white/95 backdrop-blur-md shadow-lg"
               : "bg-white/10 backdrop-blur-md"
         }`}
      >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
               {/* Logo */}
               <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <div className="text-2xl md:text-3xl">💝</div>
                  <div className="text-xl md:text-2xl font-bold">
                     <span className="text-red-500">Love</span>
                     <span className="text-green-700">@firstbite</span>
                  </div>
               </motion.div>

               {/* Desktop Navigation */}
               <nav className="hidden lg:flex items-center space-x-8">
                  {navItems.map((item, index) => (
                     <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                     >
                        <Link
                           href={item.href}
                           className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wide transition-colors duration-200"
                        >
                           {item.label}
                        </Link>
                     </motion.div>
                  ))}
               </nav>

               {/* Desktop CTA & Mobile Menu Button */}
               <div className="flex items-center space-x-4">
                  <motion.button
                     className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.5 }}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     <Heart className="w-4 h-4" />
                     <span>Order Now</span>
                  </motion.button>

                  {/* Mobile Menu Button */}
                  <button
                     className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-500 transition-colors"
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                     {isMenuOpen ? (
                        <X className="w-6 h-6" />
                     ) : (
                        <Menu className="w-6 h-6" />
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Menu */}
         <AnimatePresence>
            {isMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
               >
                  <div className="px-4 py-6 space-y-4">
                     {navItems.map((item, index) => (
                        <motion.div
                           key={item.href}
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5, delay: index * 0.1 }}
                           whileHover={{ scale: 1.05 }}
                        >
                           <Link
                              href={item.href}
                              className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wide transition-colors duration-200"
                           >
                              {item.label}
                           </Link>
                        </motion.div>
                     ))}
                     <motion.button
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        onClick={() => setIsMenuOpen(false)}
                     >
                        <Heart className="w-4 h-4" />
                        <span>Order Now</span>
                     </motion.button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </header>
   );
}
