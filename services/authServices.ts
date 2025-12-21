import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from "firebase/auth";
import { auth } from "./config/firebase.js";
import axiosInstance from "./config/axios.js";

const authService = {
  // res for newusr
  register: async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //updating profile name
    await updateProfile(userCredential.user, { displayName: username });
    //get token id to call backend
    const idToken = await userCredential.user.getIdToken();
    console.log("Registered user ID Token:", idToken);
    try {
      // Call backend to create user record
      await axiosInstance.post(
        "/users",
        {
          uid: userCredential.user.uid,
          email: email,
          username: username
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        }
      );
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
    return userCredential.user;
  },
  // sign in existing usr
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },
  // sign out usr
  async logout() {
    await signOut(auth);
    
  },
  // Get current user token
  async getIdToken() {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  },
  // Force refresh ID token
  async refreshIdToken(forceRefresh = true) {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken(forceRefresh);
  },
  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
};

export default authService;
