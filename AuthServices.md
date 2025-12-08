**STEP1: Install Firebase Client SDK**

```bash
npm install firebase
```

**STEP2: Initialize Firebase in your project**

- Create a file named `firebaseConfig.js` in your project directory.

- Auth protected routes structure:

```
app/
├── layout.tsx                          # Root layout
├── login/
│   └── page.tsx                        # Public: /login
├── register/
│   └── page.tsx                        # Public: /register
├── (protected)/
│   ├── layout.tsx                      # Auth guard (checks user)
│   ├── dashboard/
│   │   ├── page.tsx                    # Protected: /dashboard
│   │   └── data.json
│   ├── profile/
│   │   └── page.tsx                    # Protected: /profile
│   └── settings/
│       └── page.tsx                    # Protected: /settings

```

```
hotel-booking-app-frontend/
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── dashboard/
│       └── page.tsx            # Protected route
├── lib/
│   └── firebase/
│       ├── config.ts           # Firebase initialization
│       └── authService.ts      # Auth methods
├── store/
│   └── useAuthStore.ts        # Auth state management
├── services/
│   └── api.ts                  # API client with auth
├── components/
│   └── auth/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── .env.local                  # Environment variables (DO NOT COMMIT)
└── .gitignore                  # Add .env.local here
```

**SUMMARY:**

1. Backend (Admin SDK):

- Register → creates Firebase Auth user + stores profile in Firestore
- Verify → validates ID tokens from clients
- Profile CRUD → manages Firestore user

2. Frontend (Client SDK):

- Login → signInWithEmailAndPassword → gets ID token
- Protected routes → check user state, send token in Authorization header
- Logout → signOut

3. DataFlow:

- User enters email/password on frontend
- Firebase Client SDK authenticates → returns ID token
- Frontend sends token to backend API (Authorization: Bearer <token>)
- Backend verifies token with Firebase Admin SDK
- Backend returns user data or performs protected actions
- Frontend manages auth state (e.g., with Zustand, Context API) → Store the user data in localStorage directly via Zustand:

```
// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../services/config/firebase.js";
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
      loading: true,
      error: null,

      init: () => {
        onAuthStateChanged(auth, (user) => {
          set({ user, loading: false });
        });
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          set({ user: cred.user, loading: false });
          toast.success("Logged in");
          return cred.user;
        } catch (e: any) {
          set({ error: e.message, loading: false });
          toast.error(e.message);
          throw e;
        }
      },

      register: async (email, password, firstname, lastname) => {
        set({ loading: true });
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(cred.user, {
            displayName: `${firstname} ${lastname}`
          });
          const idToken = await cred.user.getIdToken();
          await axiosInstance.post("/auth/register", {
            uid: cred.user.uid,
            email,
            firstname,
            lastname,
            role: "guest"
          }, { headers: { Authorization: `Bearer ${idToken}` } });
          set({ user: cred.user, loading: false });
          toast.success("Registered");
          return cred.user;
        } catch (e: any) {
          set({ error: e.message, loading: false });
          toast.error(e.message);
          throw e;
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null });
        toast.success("Logged out");
      },

      getToken: async (forceRefresh = false) => {
        const user = get().user || auth.currentUser;
        if (!user) return null;
        return await user.getIdToken(forceRefresh);
      }
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ user: state.user }) // Only persist user, not loading/error
    }
  )
);
```
