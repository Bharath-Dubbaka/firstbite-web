"use client";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";

// Component that runs inside the Provider to dispatch actions
const AuthInitializer = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      console.log("🚀 AuthInitializer mounted - dispatching INIT_AUTH");
      dispatch({ type: "INIT_AUTH" });
   }, [dispatch]);

   return null;
};

const ClientProvider = ({ children }) => {
   useEffect(() => {
      // Debug: Log store state every 3 seconds in development (client only)
      if (process.env.NODE_ENV === "development") {
         const interval = setInterval(() => {
            const state = store.getState();
            console.log("📊 Redux State:", {
               auth: state.auth,
               firebase: state.firebase,
               hasLocalStorageToken:
                  typeof window !== "undefined"
                     ? !!localStorage.getItem("firebaseToken")
                     : "N/A",
            });
         }, 3000);

         return () => clearInterval(interval);
      }
   }, []);

   return (
      <Provider store={store}>
         <AuthInitializer />
         {children}
      </Provider>
   );
};

export default ClientProvider;
