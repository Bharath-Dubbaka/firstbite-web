// components/PhoneAuth.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
   RecaptchaVerifier,
   signInWithPhoneNumber,
   PhoneAuthProvider,
   signInWithCredential,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setLoading } from "../store/authSlice";

const PhoneAuth = () => {
   const dispatch = useDispatch();

   const [phoneNumber, setPhoneNumber] = useState("");
   const [otp, setOtp] = useState("");
   const [verificationId, setVerificationId] = useState("");
   const [step, setStep] = useState("phone");
   const [error, setError] = useState("");
   const loading = useSelector((state) => state.auth.loading);

   // ✅ Clean up recaptcha on unmount
   useEffect(() => {
      return () => {
         if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
         }
      };
   }, []);

   const setupRecaptcha = () => {
      // ✅ Check if auth is properly initialized
      if (!auth) {
         throw new Error("Firebase auth not initialized");
      }

      // ✅ Clean up existing recaptcha first
      if (window.recaptchaVerifier) {
         window.recaptchaVerifier.clear();
      }

      try {
         window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
               size: "invisible",
               callback: (response) => {
                  console.log("reCAPTCHA solved", response);
               },
               "expired-callback": () => {
                  console.log("reCAPTCHA expired");
                  setError("reCAPTCHA expired. Please try again.");
               },
            },
            auth // ✅ Make sure auth is passed correctly
         );

         // ✅ Render the recaptcha
         return window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
            return window.recaptchaVerifier;
         });
      } catch (error) {
         console.error("Error setting up recaptcha:", error);
         setError("Failed to setup verification. Please refresh the page.");
         throw error;
      }
   };

   const sendOTP = async () => {
      if (!phoneNumber || phoneNumber.length !== 10) {
         return setError("Enter a valid 10-digit phone number");
      }

      setError(""); // Clear previous errors
      dispatch(setLoading(true));

      try {
         // ✅ Setup recaptcha and wait for it to be ready
         await setupRecaptcha();

         const appVerifier = window.recaptchaVerifier;
         const formattedPhone = `+91${phoneNumber}`;

         console.log("Sending OTP to:", formattedPhone);

         const confirmationResult = await signInWithPhoneNumber(
            auth,
            formattedPhone,
            appVerifier
         );

         setVerificationId(confirmationResult.verificationId);
         setStep("otp");
         setError(""); // Clear any errors
      } catch (err) {
         console.error("Error sending OTP:", err);

         // ✅ Handle specific Firebase errors
         if (err.code === "auth/too-many-requests") {
            setError("Too many requests. Please try again later.");
         } else if (err.code === "auth/invalid-phone-number") {
            setError("Invalid phone number format.");
         } else if (err.code === "auth/quota-exceeded") {
            setError("SMS quota exceeded. Please try again later.");
         } else {
            setError("Failed to send OTP. Please try again.");
         }

         // ✅ Clean up recaptcha on error
         if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
         }
      } finally {
         dispatch(setLoading(false));
      }
   };

   const verifyOTP = async () => {
      if (!otp || otp.length !== 6) {
         return setError("Enter a valid 6-digit OTP");
      }

      setError(""); // Clear previous errors
      dispatch(setLoading(true));

      try {
         const credential = PhoneAuthProvider.credential(verificationId, otp);
         const result = await signInWithCredential(auth, credential);
         const idToken = await result.user.getIdToken();

         // ✅ Add error handling for backend API call
         const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
               Authorization: `Bearer ${idToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               firstName: "",
               lastName: "",
               phoneNumber,
               email: "",
            }),
         });

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();

         if (data.success) {
            dispatch(setAuth({ user: data.user, idToken }));
            setError(""); // Clear any errors
         } else {
            setError(data.message || "Authentication failed");
         }
      } catch (err) {
         console.error("Error verifying OTP:", err);

         // ✅ Handle specific Firebase errors
         if (err.code === "auth/invalid-verification-code") {
            setError("Invalid OTP. Please check and try again.");
         } else if (err.code === "auth/code-expired") {
            setError("OTP has expired. Please request a new one.");
         } else {
            setError("Invalid OTP or authentication failed");
         }
      } finally {
         dispatch(setLoading(false));
      }
   };

   return (
      <div className="max-w-md md:mx-auto mx-4 md:p-6 p-2 bg-white rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold text-center mb-6">
            Login with Phone
         </h2>

         {step === "phone" && (
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Phone Number
                  </label>
                  <div className="flex">
                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +91
                     </span>
                     <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                           // ✅ Only allow numbers
                           const value = e.target.value.replace(/\D/g, "");
                           setPhoneNumber(value);
                           setError(""); // Clear error on input change
                        }}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter 10-digit mobile number"
                        maxLength="10"
                     />
                  </div>
               </div>

               <button
                  onClick={sendOTP}
                  disabled={loading || phoneNumber.length !== 10}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {loading ? "Sending OTP..." : "Send OTP"}
               </button>
            </div>
         )}

         {step === "otp" && (
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Enter OTP
                  </label>
                  <input
                     type="text"
                     value={otp}
                     onChange={(e) => {
                        // ✅ Only allow numbers
                        const value = e.target.value.replace(/\D/g, "");
                        setOtp(value);
                        setError(""); // Clear error on input change
                     }}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                     placeholder="Enter 6-digit OTP"
                     maxLength="6"
                  />
               </div>

               <button
                  onClick={verifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {loading ? "Verifying..." : "Verify OTP"}
               </button>

               <button
                  onClick={() => {
                     setStep("phone");
                     setOtp("");
                     setError("");
                     setVerificationId("");
                     // Clean up recaptcha when going back
                     if (window.recaptchaVerifier) {
                        window.recaptchaVerifier.clear();
                        window.recaptchaVerifier = null;
                     }
                  }}
                  className="w-full text-green-600 py-2 px-4 rounded-md hover:bg-green-50"
               >
                  Change Phone Number
               </button>
            </div>
         )}

         {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
               <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
         )}

         {/* ✅ Make sure this div exists and is visible */}
         <div id="recaptcha-container" style={{ display: "none" }}></div>
      </div>
   );
};

export default PhoneAuth;
