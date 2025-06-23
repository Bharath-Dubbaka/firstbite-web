"use client";

import { useState, useEffect, useRef } from "react"; // Added useRef
import Hero from "./components/Hero";

export default function Home() {
   return (
      <div className="bg-gray-900 text-white">
         <div>
            <Hero />
         </div>
      </div>
   );
}
