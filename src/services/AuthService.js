import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { QuotaService } from "./QuotaService";
import { UserDetailsService } from "./UserDetailsService";

class AuthService {
   static async signInWithGoogle(dispatch, setUser, setUserDetails) {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      localStorage.setItem("firebaseToken", idToken);

      // Set Redux user info
      const userData = {
         email: result.user.email,
         name: result.user.displayName,
         picture: result.user.photoURL,
         uid: result.user.uid,
      };
      dispatch(setUser(userData));

      // Save to backend (this is the fix)
      await UserDetailsService.saveUserDetails(userData);

      // Fetch userDetails and quota from Express backend
      const [details] = await Promise.all([
         UserDetailsService.getUserDetails(),
      ]);

      // dispatch(setUserQuota(quota));
      dispatch(setUserDetails(details));

      return { userData, details };
   }

   static async signOut(dispatch, logout) {
      try {
         await auth.signOut();
         dispatch(logout());
         // dispatch(clearFirebaseData());
         return true;
      } catch (error) {
         console.error("Logout error:", error);
         return false;
      }
   }

   static async handleAuthFlow(dispatch, user, userDetails, actions) {
      console.log("handleAuthFlow called");
      try {
         // if (user) {
         //    if (userDetails) {
         //       router.push("/dashboard");
         //    } else {
         //       router.push("/userFormPage");
         //    }
         //    return;
         // }

         const { details } = await this.signInWithGoogle(
            dispatch,
            actions.setUser,
            actions.setUserDetails
         );
         console.log("deteails from await this.signInWithGoogle");
         // Dont have to redirect
         // router.push(details ? "/dashboard" : "/userFormPage");
      } catch (error) {
         console.error("Auth flow error:", error);
         throw error;
      }
   }
}

export default AuthService;
