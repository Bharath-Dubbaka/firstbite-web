// store/middleware/authMiddleware.js
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, setLoading } from "../slices/authSlice";
import { setUserDetails } from "../slices/firebaseSlice";
import { UserDetailsService } from "../../services/UserDetailsService";

// ✅ BETTER APPROACH: Create auth listener as a separate function
let authListenerInitialized = false;

const initializeAuthListener = (store) => {
   if (authListenerInitialized) return;
   authListenerInitialized = true;

   // Set initial loading state
   store.dispatch(setLoading(true));

   onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
         try {
            const token = await firebaseUser.getIdToken();
            console.log("Firebase auth state changed - user logged in");

            const userData = {
               email: firebaseUser.email || "",
               name: firebaseUser.displayName || "",
               picture: firebaseUser.photoURL || "",
               uid: firebaseUser.uid,
            };

            store.dispatch(setUser(userData));

            // Fetch user details from backend
            try {
               const details = await UserDetailsService.getUserDetails();
               store.dispatch(setUserDetails(details));
               console.log("User details loaded successfully");
            } catch (detailsError) {
               console.warn(
                  "Could not fetch user details:",
                  detailsError.message
               );
               store.dispatch(setUserDetails(null));
            }
         } catch (error) {
            console.error("Error in auth state change:", error);
            store.dispatch(setUser(null));
            store.dispatch(setUserDetails(null));
         }
      } else {
         console.log("Firebase auth state changed - user logged out");
         store.dispatch(setUser(null));
         store.dispatch(setUserDetails(null));
      }

      store.dispatch(setLoading(false));
   });
};

// ✅ Proper middleware that initializes auth on first action
export const createAuthMiddleware = (store) => {
   return (next) => (action) => {
      // Initialize auth listener on first action dispatch
      if (!authListenerInitialized) {
         initializeAuthListener(store);
      }

      return next(action);
   };
};
