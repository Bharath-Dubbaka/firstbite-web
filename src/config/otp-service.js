// // otp-service.js

// import {
//    RecaptchaVerifier,
//    signInWithPhoneNumber,
//    PhoneAuthProvider,
//    signInWithCredential,
// } from "firebase/auth";
// import { auth } from "./firebase";

// export default class OTPService {
//    constructor() {
//       this.recaptchaVerifier = null;
//       this.confirmationResult = null;
//    }

//    // Initialize reCAPTCHA
//    initializeRecaptcha(elementId = "recaptcha-container") {
//       if (!this.recaptchaVerifier) {
//          this.recaptchaVerifier = new RecaptchaVerifier(
//             elementId,
//             {
//                size: "invisible",
//                callback: (response) => {
//                   console.log("reCAPTCHA solved");
//                },
//                "expired-callback": () => {
//                   console.log("reCAPTCHA expired");
//                },
//             },
//             auth
//          );
//       }
//       return this.recaptchaVerifier;
//    }

//    // Send OTP
//    async sendOTP(phoneNumber) {
//       try {
//          // Ensure phone number is in +91 format
//          const formattedPhone = phoneNumber.startsWith("+91")
//             ? phoneNumber
//             : `+91${phoneNumber}`;

//          console.log("Sending OTP to:", formattedPhone);

//          const appVerifier = this.initializeRecaptcha();
//          this.confirmationResult = await signInWithPhoneNumber(
//             auth,
//             formattedPhone,
//             appVerifier
//          );

//          console.log("OTP sent successfully");
//          return {
//             success: true,
//             message: "OTP sent successfully",
//             verificationId: this.confirmationResult.verificationId,
//          };
//       } catch (error) {
//          console.error("Error sending OTP:", error);

//          // Handle specific errors
//          if (error.code === "auth/invalid-phone-number") {
//             throw new Error("Invalid phone number format");
//          } else if (error.code === "auth/too-many-requests") {
//             throw new Error("Too many attempts. Please try again later");
//          } else {
//             throw new Error("Failed to send OTP. Please try again");
//          }
//       }
//    }

//    // Verify OTP
//    async verifyOTP(otp) {
//       try {
//          if (!this.confirmationResult) {
//             throw new Error("No OTP request found. Please request OTP first");
//          }

//          console.log("Verifying OTP:", otp);

//          // Confirm the OTP
//          const result = await this.confirmationResult.confirm(otp);
//          console.log("OTP verified successfully");

//          // Get the ID token
//          const idToken = await result.user.getIdToken();
//          console.log("ID Token obtained");

//          return {
//             success: true,
//             user: result.user,
//             idToken: idToken,
//          };
//       } catch (error) {
//          console.error("Error verifying OTP:", error);

//          if (error.code === "auth/invalid-verification-code") {
//             throw new Error("Invalid OTP. Please check and try again");
//          } else if (error.code === "auth/code-expired") {
//             throw new Error("OTP expired. Please request a new one");
//          } else {
//             throw new Error("OTP verification failed. Please try again");
//          }
//       }
//    }

//    // Login with backend
//    async loginWithBackend(idToken, additionalData = {}) {
//       try {
//          console.log("Logging in with backend...");

//          const response = await fetch("http://localhost:9999/auth/verify-otp", {
//             method: "POST",
//             headers: {
//                "Content-Type": "application/json",
//                Authorization: `Bearer ${idToken}`,
//             },
//             body: JSON.stringify(additionalData),
//          });

//          const data = await response.json();

//          if (!response.ok) {
//             throw new Error(data.message || "Login failed");
//          }

//          console.log("Backend login successful:", data);
//          return data;
//       } catch (error) {
//          console.error("Backend login error:", error);
//          throw error;
//       }
//    }

//    // Complete OTP login flow
//    async completeLogin(phoneNumber, otp, additionalData = {}) {
//       try {
//          // Step 1: Send OTP (if not already sent)
//          if (!this.confirmationResult) {
//             await this.sendOTP(phoneNumber);
//             throw new Error("OTP sent. Please enter the code");
//          }

//          // Step 2: Verify OTP with Firebase
//          const firebaseResult = await this.verifyOTP(otp);

//          // Step 3: Login with backend
//          const backendResult = await this.loginWithBackend(
//             firebaseResult.idToken,
//             additionalData
//          );

//          return {
//             success: true,
//             firebase: firebaseResult,
//             backend: backendResult,
//          };
//       } catch (error) {
//          console.error("Complete login error:", error);
//          throw error;
//       }
//    }
// }
