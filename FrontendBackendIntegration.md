# Frontend → Backend Integration Guide

## Architecture Overview

```
React Component
    ↓
Custom Hook (useQuery, useMutation, etc.) --> ( State management - Loading states, error states, data caching
Side effects - Fetching data when component mounts or dependencies change
Reusability - Share data-fetching logic across multiple components)

Separation of concerns - Components focus on UI, hooks handle data
    ↓
Service Module (roomService.ts, bookingService.ts, etc.)
    ↓
HTTP Client (axios instance or fetch wrapper)
    ↓
Auth Token Injection (from useAuthStore)
    ↓
API Gateway / Direct Service
    ↓
Backend (Node.js Express + MongoDB)
```

---

## Step-by-Step Data Flow

### Step 1: React Component Calls a Hook

```tsx
// components/RoomList.tsx
import { useRooms } from "@/hooks/useRooms";

export default function RoomList() {
  const { data: rooms, loading } = useRooms();
  return (
    <div>
      {rooms?.map((r) => (
        <div key={r.id}>{r.name}</div>
      ))}
    </div>
  );
}
```

### Step 2: Custom Hook Calls Service

```tsx
// hooks/useRooms.ts
import { roomService } from "@/services/roomService";

export function useRooms() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    roomService
      .listRooms()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
     get
  return { data, loading };
}
```
 
### Step 3: Service Module Calls HTTP Client

```ts
// services/roomService.ts
export const roomService = {
  listRooms: async (filters?: { status?: string }) => {
    // Option A: Use axios (preferred, auto-handles 401 + token)
    return api.get("/api/rooms", { params: filters });

    // Option B: Use fetch wrapper (manual token + 401)
    return callRoomService("/api/rooms?" + new URLSearchParams(filters));
  }
};
```

### Step 4: HTTP Client Injects Auth Token

```ts
// services/config/axios.js
axiosInstance.interceptors.request.use(async (config) => {
  const token = await useAuthStore.getState().getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### Step 5: Request Hits Backend

```
GET http://localhost:4001/api/rooms
Header: Authorization: Bearer <Firebase_ID_Token>
```

### Step 6: Backend Routes → Controller → Database

```
Express Router (GET /api/rooms)
  ↓
Auth Middleware (validates Firebase token)
  ↓
RBAC Middleware (checks user role if needed)
  ↓
Room Controller (queries MongoDB)
  ↓
Response back to Frontend
```

---

## Development Mode (Local)

### Setup

1. Start MongoDB:

   ```bash
   docker-compose up -d mongodb
   ```

2. Start API Gateway:

   ```bash
   cd hotel-booking-app-backend/api-gateway
   npm start  # runs on http://localhost:4001
   ```

3. Start Room Service (or specific service):

   ```bash
   cd hotel-booking-app-backend/services/room-services
   npm start  # runs on http://localhost:4004
   ```

4. Start Frontend:
   ```bash
   cd hotel-booking-app-frontend
   npm run dev  # runs on http://localhost:3000
   ```

### Environment Variables (.env.local)

```bash
# Frontend uses Gateway for most calls
NEXT_PUBLIC_API_URL=http://localhost:4001/api

# Optional: Direct service calls (if not routing through gateway)
NEXT_PUBLIC_ROOM_SERVICE_URL=http://localhost:4004
```

### Data Flow (Dev Mode)

```
Frontend (http://localhost:3000)
    ↓
axios / fetch
    ↓
API Gateway (http://localhost:4001)
    ↓
Room Service (http://localhost:4004)
    ↓
MongoDB (mongodb://localhost:27017/hotel-db)
```

### Testing a Call

```bash
# Terminal 1: Check if gateway is reachable
curl -X GET http://localhost:4001/api/rooms \
  -H "Authorization: Bearer <valid_firebase_token>"

# Terminal 2: Check if room service is reachable
curl -X GET http://localhost:4004/api/rooms \
  -H "Authorization: Bearer <valid_firebase_token>"
```

---

## Production Mode (Cloud Run / VPS)

### Deployment Targets

- **Frontend:** Vercel, Netlify, or Firebase Hosting
- **API Gateway:** Cloud Run, Render, AWS EC2, DigitalOcean
- **Services:** Cloud Run, Kubernetes, Docker Swarm, VPS
- **Database:** MongoDB Atlas (managed cloud)

### Setup Steps

#### 1. Build & Push Backend to Container Registry

```bash
cd hotel-booking-app-backend

# Option A: Google Cloud Build (Cloud Run)
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/api-gateway

# Option B: Docker Hub or your registry
docker build -t yourregistry/api-gateway .
docker push yourregistry/api-gateway
```

#### 2. Deploy API Gateway to Cloud Run

```bash
gcloud run deploy api-gateway \
  --image gcr.io/YOUR_PROJECT_ID/api-gateway \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hotel-db,FIREBASE_PROJECT_ID=your-firebase-project"
```

Output: `https://api-gateway-xxxxx.a.run.app`

#### 3. Deploy Services to Cloud Run (same process)

```bash
gcloud run deploy room-service \
  --image gcr.io/YOUR_PROJECT_ID/room-service \
  --region us-central1 \
  --set-env-vars="MONGODB_URI=mongodb+srv://...,API_GATEWAY_URL=https://api-gateway-xxxxx.a.run.app"
```

#### 4. Update Frontend Environment

```bash
# .env.production (Vercel env vars)
NEXT_PUBLIC_API_URL=https://api-gateway-xxxxx.a.run.app/api
NEXT_PUBLIC_ROOM_SERVICE_URL=https://room-service-xxxxx.a.run.app
```

#### 5. Deploy Frontend to Vercel

```bash
cd hotel-booking-app-frontend
vercel deploy --prod
```

Output: `https://your-app.vercel.app`

### Data Flow (Production on Cloud Run)

```
Frontend (https://your-app.vercel.app)
    ↓
axios / fetch
    ↓
API Gateway (https://api-gateway-xxxxx.a.run.app)
    ↓
Room Service (https://room-service-xxxxx.a.run.app)
    ↓
MongoDB Atlas (mongodb+srv://cluster.mongodb.net/hotel-db)
```

### Alternative: Single VPS Deployment

```bash
# SSH into VPS
ssh user@your-vps-ip

# Clone repo and start all services in Docker
docker-compose -f docker-compose.yml up -d

# Nginx reverse proxy (optional)
server {
  listen 80;
  server_name api.yourdomain.com;
  location / {
    proxy_pass http://localhost:4001;
  }
}
```

Environment on VPS:

```bash
MONGODB_URI=mongodb://localhost:27017/hotel-db
# or
MONGODB_URI=mongodb+srv://user:pass@atlas.mongodb.net/hotel-db
```

---

## Critical Environment Variables by Deployment

| Variable                       | Dev                                  | Cloud Run                                              | VPS                                               |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------ | ------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`          | `http://localhost:4001/api`          | `https://api-gateway-xxxxx.a.run.app/api`              | `https://api.yourdomain.com/api`                  |
| `MONGODB_URI`                  | `mongodb://localhost:27017/hotel-db` | `mongodb+srv://user:pass@cluster.mongodb.net/hotel-db` | `mongodb://localhost:27017/hotel-db` or Atlas URI |
| `FIREBASE_PROJECT_ID`          | `your-firebase-project`              | `your-firebase-project`                                | `your-firebase-project`                           |
| `NEXT_PUBLIC_ROOM_SERVICE_URL` | `http://localhost:4004`              | `https://room-service-xxxxx.a.run.app`                 | `https://rooms.yourdomain.com`                    |

---

## Error Handling & Token Refresh

### On 401 (Token Expired)

1. **Axios interceptor** (automatic):

   - Attempts refresh: `useAuthStore.getState().getToken(true)`
   - Retries request with new token
   - If still 401: calls `useAuthStore.logout()` → clears Zustand + Firebase → redirects to `/`

2. **Fetch wrapper** (manual):
   - Wrap in try/catch; on 401, call `await useAuthStore.getState().logout()`

### To Verify Token Lifecycle

```bash
# 1. Log in via Frontend
# 2. Open DevTools → Application → Local Storage → `auth-storage`
# 3. See cached user object (persisted by Zustand)
# 4. Wait 1 hour or manually expire token
# 5. On next API call, axios triggers refresh
# 6. If refresh fails, user is cleared and you're redirected to /
```

---

## Adding a New Service Module

### Pattern 1: Using Axios (Recommended)

```ts
// services/bookingService.ts
import api from "./config/axios";

export const bookingService = {
  createBooking: async (data) => api.post("/api/bookings", data),
  listBookings: async (filters) => api.get("/api/bookings", { params: filters }),
  getBooking: async (id) => api.get(`/api/bookings/${id}`),
  updateBooking: async (id, data) => api.patch(`/api/bookings/${id}`, data),
  cancelBooking: async (id) => api.delete(`/api/bookings/${id}`)
};
```

### Pattern 2: Using Fetch Wrapper

```ts
// services/bookingService.ts
import { useAuthStore } from "@/stores/useAuthStore";

async function callBookingService(path, init) {
  const token = await useAuthStore.getState().getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL}${path}`, {
    ...init,
    headers: { ...init?.headers, Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error(`Booking error: ${response.status}`);
  return response.json();
}

export const bookingService = {
  createBooking: (data) => callBookingService("/api/bookings", { method: "POST", body: JSON.stringify(data) })
  // ... more methods
};
```

### Usage in Component

```tsx
import { bookingService } from "@/services/bookingService";

export function CreateBooking() {
  const handleSubmit = async (formData) => {
    try {
      const result = await bookingService.createBooking(formData);
      console.log("Booking created:", result);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return <form onSubmit={(e) => { e.preventDefault(); handleSubmit(...); }} />;
}
```

---

## Debugging Checklist

- [ ] Frontend dev server running? (`npm run dev`)
- [ ] Backend service running? (`npm start` or `docker-compose up`)
- [ ] MongoDB running? (`docker ps | grep mongo`)
- [ ] `.env.local` pointing to correct URLs?
- [ ] Firebase project ID set?
- [ ] Valid Firebase token in Authorization header?
- [ ] CORS enabled on backend (if needed)?
- [ ] Firewall/security groups allow traffic between services?
- [ ] Cloud Run / VPS DNS/IP resolving correctly?
