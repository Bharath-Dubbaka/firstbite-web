// Make sure you have 'geist' package installed: npm install geist
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

// Assign them to your variables
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
   title: "Love@firstbite",
   description:
      "Driven by a genuine passion for not just cooking, but for building and solving real-world food services. That entrepreneurial spirit.",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.className} ${geistMono.className} antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
