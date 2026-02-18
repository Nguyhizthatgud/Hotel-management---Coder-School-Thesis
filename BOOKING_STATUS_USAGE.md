# How to Use Bookings by Status in Components

## What Was Added

Your store now automatically groups bookings by status when fetching. You can access:
- `bookingsByStatus` - Arrays of bookings grouped by status
- `bookingsStateCount` - Count of bookings in each status

---

## Usage in Components

### Example 1: Display Pending Bookings

```typescript
import { useBookingStore } from '@/stores/useBookingService';

function PendingBookingsList() {
  const { bookingsByStatus, bookingsStateCount } = useBookingStore();
  
  return (
    <div>
      <h2>Pending Bookings ({bookingsStateCount.pending})</h2>
      <ul>
        {bookingsByStatus.pending.map(booking => (
          <li key={booking.bookId}>
            {booking.guestName} - {booking.roomName}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Example 2: Dashboard with All Statuses

```typescript
import { useBookingStore } from '@/stores/useBookingService';

function BookingDashboard() {
  const { bookingsStateCount, bookingsByStatus } = useBookingStore();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Card for Pending */}
      <div className="card">
        <h3>Pending</h3>
        <p className="text-3xl">{bookingsStateCount.pending}</p>
        <ul>
          {bookingsByStatus.pending.slice(0, 5).map(b => (
            <li key={b.bookId}>{b.guestName}</li>
          ))}
        </ul>
      </div>
      
      {/* Card for Confirmed */}
      <div className="card">
        <h3>Confirmed</h3>
        <p className="text-3xl">{bookingsStateCount.confirmed}</p>
        <ul>
          {bookingsByStatus.confirmed.slice(0, 5).map(b => (
            <li key={b.bookId}>{b.guestName}</li>
          ))}
        </ul>
      </div>
      
      {/* Card for Checked In */}
      <div className="card">
        <h3>Checked In</h3>
        <p className="text-3xl">{bookingsStateCount.checkIn}</p>
        <ul>
          {bookingsByStatus.checkIn.slice(0, 5).map(b => (
            <li key={b.bookId}>{b.guestName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

---

### Example 3: Status Tabs

```typescript
import { useState } from 'react';
import { useBookingStore } from '@/stores/useBookingService';

function BookingTabs() {
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'checkIn'>('pending');
  const { bookingsByStatus, bookingsStateCount } = useBookingStore();
  
  const tabs = [
    { key: 'pending', label: 'Pending', count: bookingsStateCount.pending },
    { key: 'confirmed', label: 'Confirmed', count: bookingsStateCount.confirmed },
    { key: 'checkIn', label: 'Checked In', count: bookingsStateCount.checkIn },
  ];
  
  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={activeTab === tab.key ? 'active' : ''}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="mt-4">
        {bookingsByStatus[activeTab].map(booking => (
          <div key={booking.bookId} className="booking-card">
            <h3>{booking.guestName}</h3>
            <p>Room: {booking.roomName}</p>
            <p>Check-in: {booking.checkInDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Example 4: Simple Count Display

```typescript
import { useBookingStore } from '@/stores/useBookingService';

function BookingStats() {
  const counts = useBookingStore(state => state.bookingsStateCount);
  
  return (
    <div className="stats">
      <div>Pending: {counts.pending}</div>
      <div>Confirmed: {counts.confirmed}</div>
      <div>Checked In: {counts.checkIn}</div>
      <div>Checked Out: {counts.checkOut}</div>
      <div>Total: {counts.total}</div>
    </div>
  );
}
```

---

### Example 5: Access Only Specific Status

```typescript
import { useBookingStore } from '@/stores/useBookingService';

function PendingBadge() {
  // Only subscribe to bookingsStateCount, not entire store
  const pendingCount = useBookingStore(state => state.bookingsStateCount.pending);
  
  return (
    <span className="badge">
      {pendingCount} Pending
    </span>
  );
}
```

---

### Example 6: Using with useEffect to Fetch

```typescript
import { useEffect } from 'react';
import { useBookingStore } from '@/stores/useBookingService';

function BookingPage() {
  const { fetchBookings, bookingsByStatus, loading } = useBookingStore();
  
  useEffect(() => {
    fetchBookings(); // Automatically groups and counts
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Today's Check-ins ({bookingsByStatus.checkIn.length})</h2>
      {bookingsByStatus.checkIn.map(booking => (
        <div key={booking.bookId}>
          {booking.guestName} - Room {booking.roomNumber}
        </div>
      ))}
    </div>
  );
}
```

---

## Available Data

### `bookingsByStatus` object contains:

```typescript
{
  pending: Bookings[];      // Array of pending bookings
  confirmed: Bookings[];    // Array of confirmed bookings
  checkIn: Bookings[];      // Array of checked-in bookings
  checkOut: Bookings[];     // Array of checked-out bookings
  completed: Bookings[];    // Array of completed bookings
}
```

### `bookingsStateCount` object contains:

```typescript
{
  pending: number;    // Count of pending bookings
  confirmed: number;  // Count of confirmed bookings
  checkIn: number;    // Count of checked-in bookings
  checkOut: number;   // Count of checked-out bookings
  completed: number;  // Count of completed bookings
  total: number;      // Total count of all bookings
}
```

---

## Performance Tips

### ✅ Good - Subscribe to specific data:
```typescript
const pending = useBookingStore(state => state.bookingsByStatus.pending);
const count = useBookingStore(state => state.bookingsStateCount.pending);
```

### ❌ Avoid - Subscribing to entire store:
```typescript
const store = useBookingStore(); // Re-renders on ANY state change
```

### ✅ Good - Destructure only what you need:
```typescript
const { bookingsByStatus, bookingsStateCount } = useBookingStore();
```

---

## When Data Updates

The `bookingsByStatus` and `bookingsStateCount` automatically update when:
- `fetchBookings()` is called
- Any booking is added, updated, or deleted (you may need to update other actions too)

Currently, only `fetchBookings()` updates these values. If you want automatic updates for other actions (like `addBooking`, `updateBooking`), you'll need to add similar grouping logic there.
