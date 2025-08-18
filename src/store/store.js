// store/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import firebaseReducer from "./slices/firebaseSlice";
import { createAuthMiddleware } from "./middleware/authMiddleware";
import adminAuthReducer from "./slices/adminAuthSlice";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      firebase: firebaseReducer,
      adminAuth: adminAuthReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(createAuthMiddleware),
});
