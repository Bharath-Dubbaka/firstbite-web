"use client";
import { useState } from "react";
import CafeMenuCarousel from "./ui/CafeMenuCarousel";
import DabbaMenuAccordion from "./ui/DabbaMenuAccordion";

export default function MainMenus() {
   const [activeMenu, setActiveMenu] = useState("cafe");

   return (
      <section className="bg-white pt-8 pb-20 px-4 ">
         <div className="max-w-[90%] mx-auto">
            <div className="flex justify-center gap-4">
               <button
                  onClick={() => setActiveMenu("cafe")}
                  className={`px-6 py-2 rounded-full font-medium text-lg transition-all ${
                     activeMenu === "cafe"
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-700"
                  }`}
               >
                  Café Menu
               </button>
               <button
                  onClick={() => setActiveMenu("dabba")}
                  className={`px-6 py-2 rounded-full font-medium text-lg transition-all ${
                     activeMenu === "dabba"
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-700"
                  }`}
               >
                  Dabba Menu
               </button>
            </div>

            <div className="mt-10 px-10 py-4 bg-[#fcf7f2] backdrop-blur-md rounded-xl">
               {activeMenu === "cafe" ? (
                  <CafeMenuCarousel />
               ) : (
                  <DabbaMenuAccordion />
               )}
            </div>
         </div>
      </section>
   );
}
