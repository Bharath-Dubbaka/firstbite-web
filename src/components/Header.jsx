"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../store/slices/firebaseSlice";
import { setUser } from "../store/slices/authSlice";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "./ui/button";
import AuthService from "../services/AuthService";
import { C } from "jsonparse";
import { logout } from "../store/slices/authSlice";
import { LogOut } from "lucide-react";
import { auth } from "../services/firebase";

// Mobile Responsive Header Component
export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();
   const { user, isAuthenticated } = useSelector((state) => state.auth);
   const { userDetails } = useSelector((state) => state.firebase);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef(null);

   //  Add Token Utility for Development REMOVE IN PROD
   useEffect(() => {
      if (process.env.NODE_ENV === "development") {
         window.getIdToken = async () => {
            try {
               const user = auth.currentUser;

               if (!user) {
                  console.warn("User not logged in.");
                  return;
               }

               const token = await user.getIdToken(true);
               await navigator.clipboard.writeText(token);
               console.log("✅ Firebase Token (copied to clipboard):", token);
            } catch (error) {
               console.error("❌ Failed to get token:", error);
            }
         };
      }
   }, []);

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

   const handleGetStarted = async () => {
      console.log("signin/signup");
      try {
         setIsLoading(true);
         await AuthService.handleAuthFlow(dispatch, user, userDetails, {
            setUser,
            // setUserQuota,
            setUserDetails,
         });
      } catch (error) {
         console.error("Login error:", error);
         alert("Auth error: " + error.message); // temporary dev feedback
      } finally {
         setIsLoading(false);
      }
   };

   const handleLogout = async () => {
      try {
         await AuthService.signOut(dispatch, logout);
      } catch (error) {
         console.error("Logout error:", error);
      }
   };

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
               <Link
                  href="/"
                  // className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wide transition-colors duration-200"
               >
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
               </Link>
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
               {/* REMOVE IN PRODUCTION */}
               <button
                  onClick={() => {
                     auth.currentUser
                        .getIdToken(true)
                        .then((token) => {
                           console.log("Firebase Token:", token);
                           navigator.clipboard.writeText(token).then(() => {
                              alert("Token copied to clipboard!");
                           });
                        })
                        .catch((err) => {
                           console.error("Token fetch failed:", err);
                           alert("You must be logged in to get a token.");
                        });
                  }}
               >
                  Copy Firebase Token
               </button>

               {/* Desktop CTA & Mobile Menu Button */}
               {user ? (
                  <div className="flex items-center gap-1 md:gap-4 relative">
                     {/* Profile Image */}
                     {user.picture ? (
                        <div className="flex">
                           <div>{user.name}</div>{" "}
                           <img
                              src={user.picture}
                              alt={user.name}
                              className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-indigo-200"
                           />
                        </div>
                     ) : (
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs md:text-sm">
                           {user.name?.charAt(0)}
                        </div>
                     )}

                     {/* User Info - Hidden on Mobile */}
                     <div className="hidden lg:block text-sm">
                        <p className="text-slate-900 font-medium flex items-center">
                           <span className="truncate max-w-[120px]">
                              {user.name}
                           </span>
                           {/* <span className="text-xs text-white px-2 py-1 ml-2 rounded-full bg-gradient-to-r from-purple-700 via-pink-800 to-purple-700 p-[2px] animate-shine">
                              {userQuota.subscription.type}
                           </span> */}
                        </p>
                     </div>

                     {/* Dropdown Trigger */}
                     <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="p-1 hover:bg-indigo-100 rounded-full"
                     >
                        <svg
                           className={`w-4 h-4 text-indigo-600 transition-transform duration-200 ${
                              isDropdownOpen ? "rotate-180" : ""
                           }`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                           />
                        </svg>
                     </button>

                     {/* Dropdown Menu - Mobile Positioning */}
                     {isDropdownOpen && (
                        <div
                           ref={dropdownRef}
                           className="absolute right-0 top-full mt-1 md:mt-2 w-64 md:w-[22rem] bg-white rounded-lg shadow-lg border border-indigo-100 py-2 z-50"
                        >
                           <div className="px-4 py-2 border-b border-indigo-100">
                              <p className="text-xs md:text-sm text-indigo-600">
                                 Email: {user.email}
                              </p>
                           </div>
                           <div className="px-4 py-2 border-b border-indigo-100">
                              <p className="text-xs md:text-sm text-indigo-600">
                                 ID: {user.uid}
                              </p>
                           </div>

                           {/* Quick Links Section */}
                           <div className="px-4 py-3 border-b border-indigo-100">
                              <p className="text-sm font-medium text-indigo-900 mb-2">
                                 Quick Links
                              </p>
                              <div className="flex space-x-2">
                                 <Link
                                    href="/dashboard"
                                    className="flex-1 py-2 px-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-medium rounded-lg transition-all duration-200 text-center"
                                    onClick={() => setIsDropdownOpen(false)}
                                 >
                                    Dashboard
                                 </Link>
                                 <Link
                                    href="/userFormPage"
                                    className="flex-1 py-2 px-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-medium rounded-lg transition-all duration-200 text-center"
                                    onClick={() => setIsDropdownOpen(false)}
                                 >
                                    Master Resume
                                 </Link>
                              </div>
                           </div>

                           {/* Premium Section */}
                           {/* <div className="px-4 py-3 border-b border-indigo-100">
                              {userQuota.subscription.type === "free" ? (
                                 <button
                                    onClick={handleUpgradeClick}
                                    className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                                 >
                                    <svg
                                       className="w-4 h-4"
                                       fill="none"
                                       stroke="currentColor"
                                       viewBox="0 0 24 24"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                       />
                                    </svg>
                                    Upgrade to Premium
                                 </button>
                              ) : (
                                 <div className="text-sm">
                                    <p className="text-slate-600 mb-1">
                                       Premium Subscription
                                    </p>
                                    <p className="font-medium text-indigo-600 flex items-center gap-2">
                                       <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                       </svg>
                                       Expires on{" "}
                                       {new Date(
                                          userQuota.subscription.endDate
                                       ).toLocaleDateString()}
                                    </p>
                                 </div>
                              )}
                           </div> */}
                           <div className="px-4 py-2 border-b border-indigo-100 bg-gradient-to-br from-white to-indigo-50">
                              <p className="text-sm font-medium text-indigo-900 mb-2">
                                 Usage Quota
                              </p>
                              {/* <div className="space-y-2">
                                 {[
                                    {
                                       label: "Parsing",
                                       used: userQuota.parsing.used,
                                       limit: userQuota.parsing.limit,
                                    },
                                    {
                                       label: "Generates",
                                       used: userQuota.generates.used,
                                       limit: userQuota.generates.limit,
                                    },
                                    {
                                       label: "Downloads",
                                       used: userQuota.downloads.used,
                                       limit: userQuota.downloads.limit,
                                    },
                                 ].map((item) => (
                                    <div
                                       key={item.label}
                                       className="flex justify-between text-xs"
                                    >
                                       <span className="text-slate-600">
                                          {item.label}
                                       </span>
                                       <span className="text-indigo-600 font-medium">
                                          {item.used}/{item.limit}
                                       </span>
                                    </div>
                                 ))}
                              </div> */}
                           </div>

                           {/* <button
                              onClick={() => {
                                 router.push("/userFormPage?edit=true");
                                 setIsDropdownOpen(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 flex items-center transition-colors duration-200"
                           >
                              <svg
                                 className="w-4 h-4 mr-2 text-indigo-500"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                 />
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                 />
                              </svg>
                              Edit Details/Master Copy
                           </button> */}

                           <button
                              onClick={() => {
                                 handleLogout();
                                 setIsDropdownOpen(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors duration-200"
                           >
                              <LogOut className="w-4 h-4 mr-2" />
                              Logout
                           </button>
                        </div>
                     )}
                  </div>
               ) : (
                  <div className="flex items-center space-x-4">
                     <Button
                        onClick={() => {
                           console.log("Button clicked"); // This should show

                           setIsMenuOpen(false);
                           handleGetStarted();
                        }}
                     >
                        <motion.div
                           className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.5 }}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <Heart className="w-4 h-4" />

                           <span>Order Now</span>
                        </motion.div>
                     </Button>
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
               )}
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
                     {/* changed */}
                     <Button
                        variant="ghost"
                        onClick={() => {
                           setIsMenuOpen(false);
                           handleGetStarted();
                           console.log("Button clicked"); // This should show
                        }}
                     >
                        <motion.div
                           className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold mt-4"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.3, delay: 0.6 }}
                        >
                           <Heart className="w-4 h-4" />
                           <span>Order Now</span>
                        </motion.div>
                     </Button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </header>
   );
}
