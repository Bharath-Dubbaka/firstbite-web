// Make sure you have 'geist' package installed: npm install geist
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Provider } from "react-redux";
import { store } from "../store/store";

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientProvider from "@/store/Clientprovider";

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
            <ClientProvider>
               <Header />

               {children}
               <Footer />
            </ClientProvider>
         </body>
      </html>
   );
}
