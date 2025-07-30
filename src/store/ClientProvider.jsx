"use client";
//Wrap children with Redux Provider in a Client Layout || Move Redux Provider to a separate ClientProvider.jsx component
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

const ClientProvider = ({ children }) => {
   return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
