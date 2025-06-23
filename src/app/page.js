"use client";

import { useState, useEffect, useRef } from "react"; // Added useRef
import Hero from "./components/Hero";
import Header from "./components/Header";

export default function Home() {
   return (
      <div className="bg-gray-900 text-white">
         <div>
            <Header />
            <Hero />
            <Hero />
         </div>
      </div>
   );
}
