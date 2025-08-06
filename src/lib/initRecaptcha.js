// // src/lib/initRecaptcha.js
// import { RecaptchaVerifier } from "firebase/auth";
// import { auth } from "../config/firebase";

// export const initRecaptcha = () => {
//    if (typeof window === "undefined") return;

//    // Prevent multiple initializations
//    if (window.recaptchaVerifier) {
//       console.log("✅ reCAPTCHA already initialized");
//       return;
//    }

//    console.log("🔍 Firebase Auth instance:", auth);

//    try {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//          "recaptcha-container",
//          {
//             size: "invisible",
//             callback: (response) => {
//                console.log("🔐 reCAPTCHA resolved:", response);
//             },
//             "expired-callback": () => {
//                console.warn("⚠️ reCAPTCHA expired");
//             },
//          },
//          auth
//       );

//       console.log("✅ reCAPTCHA initialized");
//    } catch (err) {
//       console.error("❌ Failed to initialize reCAPTCHA:", err);
//    }
// };
