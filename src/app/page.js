"use client";

import { useState, useEffect, useRef } from "react"; // Added useRef
import Hero from "./components/Hero";
import Header from "./components/Header";
import Menus from "./components/MainMenus";

export default function Home() {
   return (
      <div className="bg-gray-900 text-white">
         <div>
            <Header />
            <Hero />
            <Menus />
            <div className="pb-20 bg-white"></div>
         </div>
      </div>
   );
}
