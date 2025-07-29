"use client";
//src/app/login/page.js
import PhoneAuth from "../../components/PhoneAuth";
import React from "react";

export default function Login() {
   return (
      <div className="min-h-[80vh] flex flex-col justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 overflow-hidden">
         <PhoneAuth />
      </div>
   );
}
