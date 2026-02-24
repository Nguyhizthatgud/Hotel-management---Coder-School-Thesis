import { create } from "zustand";
import { auth } from "../services/config/firebase.js";
import { persist } from "zustand/middleware";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User
} from "firebase/auth";
import axiosInstance from "../services/config/axios.js";
import { toast } from "sonner";
import i18n from "../utils/i18n.js";
type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  init: () => void;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, firstname: string, lastname: string) => Promise<User>;
  logout: () => Promise<void>;
  getToken: (forceRefresh?: boolean) => Promise<string | null>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      // initial auth state listener
      init: () => {
        set({ loading: true });
        onAuthStateChanged(
          auth,
          (user) => {
            set({ user, loading: false });
          },
          (error: any) => {
            // logout on auth errors (expired refresh token)
            if (error.code === "auth/user-token-expired" || error.code === "auth/network-request-failed") {
              get().logout();
              toast.error(i18n.t("login_auth_state_listener_error"));
            }
            set({ loading: false, error: error.message });
          }
        );
      },
      // login method
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const token = await userCredential.user.getIdToken();
          set({ user: userCredential.user, loading: false });
          toast.success(i18n.t("login_form_success_toast"));
          return userCredential.user;
        } catch (error: any) {
          set({ error: error.message, loading: false });
          toast.error(i18n.t("login_form_failure_toast"));
          throw error;
        }
      },
      // register method
      register: async (email: string, password: string, firstname: string, lastname: string) => {
        set({ loading: true, error: null });
        try {
          const username = `${firstname} ${lastname}`;

          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          await updateProfile(userCredential.user, { displayName: username });

          // get token to call backend
          const idToken = await userCredential.user.getIdToken();
          try {
            // call backend to create user record
            await axiosInstance.post(
              "/api/users",
              { uid: userCredential.user.uid, email, firstname, lastname },
              { headers: { Authorization: `Bearer ${idToken}` } }
            );
          } catch (error) {
            throw error;
          }
          set({ user: userCredential.user, loading: false });
          return userCredential.user;
        } catch (error: any) {
          const code = error?.code;
          const message =
            code === "auth/email-already-in-use"
              ? "Email đã được đăng ký. Hãy đăng nhập hoặc dùng email khác."
              : `Lỗi ${error?.message || "không xác định"}: Đăng ký thất bại! Vui lòng thử lại`;
          set({ error: message, loading: false });
          toast.error(i18n.t("signup_error_toast"));
          throw new Error(message);
        }
      },
      // logout method
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null, loading: false });

          // manually clear persisted storage to ensure immediate cleanup
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth-storage");
          }

          toast.success(i18n.t("logout_success_toast"));
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        } catch (error: any) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },
      // getToken method
      getToken: async (forceRefresh = false) => {
        const user = get().user;
        if (!user) return null;
        try {
          const token = await user.getIdToken(forceRefresh);
          return token;
        } catch (error: any) {
          // Auto-logout on token refresh failure
          if (error.code === "auth/user-token-expired" || error.code === "auth/network-request-failed") {
            await get().logout();
            set({ user: null, loading: false });
            toast.error(i18n.t("login_timeout"));
          }
          set({ error: error.message });
          return null;
        }
      }
    }),
    {
      name: "auth-storage", // name of the item in storage
      partialize: (state) => ({ user: state.user }) // only persist the user object
    }
  )
);
