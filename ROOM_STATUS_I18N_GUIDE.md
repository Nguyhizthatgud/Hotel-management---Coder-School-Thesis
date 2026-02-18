## Room Status i18n Implementation Guide

### ✅ What's Been Done

Your i18n.js file now has room status translations in all three languages:

**English:**

```
room_status_available: "Available"
room_status_reserved: "Reserved"
room_status_in_use: "In Use"
room_status_maintenance: "Maintenance"
room_status_cleaning: "Cleaning"
```

**Vietnamese:**

```
room_status_available: "Còn trống"
room_status_reserved: "Đã đặt trước"
room_status_in_use: "Đang sử dụng"
room_status_maintenance: "Bảo trì"
room_status_cleaning: "Đang dọn dẹp"
```

**Chinese:**

```
room_status_available: "空闲"
room_status_reserved: "已预定"
room_status_in_use: "在用"
room_status_maintenance: "维护中"
room_status_cleaning: "清扫中"
```

### New Helper Functions

A new file has been created: `lib/roomStatusTranslations.ts`

This provides:

- `ROOM_STATUS_ENUM` - Constants for all room status values
- `getRoomStatusTranslationKey(status)` - Maps status to translation key
- `getTranslatedRoomStatus(status, t)` - Gets translated label
- `getRoomStatusOptions()` - Gets all status options for dropdowns

### Usage Examples

#### 1. In UI Components (e.g., StatusBadge.tsx)

**Before:**

```tsx
const getStatusColor = (status: string) => {
  switch (status) {
    case "đang sử dụng":
      return <Badge className="...">Đang sử dụng</Badge>;
    // hardcoded Vietnamese labels
  }
};
```

**After:**

```tsx
import { useTranslation } from "react-i18next";
import { getRoomStatusTranslationKey } from "@/lib/roomStatusTranslations";

const getStatusColor = (status: string) => {
  const { t } = useTranslation();
  const i18nKey = getRoomStatusTranslationKey(status);
  const label = t(i18nKey);

  switch (status) {
    case "đang sử dụng":
      return <Badge className="...">{label}</Badge>;
    // ... other cases with translated labels
  }
};
```

#### 2. In Select Dropdowns (e.g., AddRoom.tsx)

**Before:**

```tsx
<SelectValue placeholder="Select status" />
<SelectItem value="còn trống">Còn trống</SelectItem>
<SelectItem value="đã đặt trước">Đã đặt trước</SelectItem>
<SelectItem value="đang sử dụng">Đang sử dụng</SelectItem>
```

**After:**

```tsx
import { useTranslation } from "react-i18next";
import { getRoomStatusOptions, getRoomStatusTranslationKey } from "@/lib/roomStatusTranslations";

export default function StatusSelect() {
  const { t } = useTranslation();

  return (
    <>
      <SelectValue placeholder={t("select_status")} />
      {getRoomStatusOptions().map((status) => (
        <SelectItem key={status} value={status}>
          {t(getRoomStatusTranslationKey(status))}
        </SelectItem>
      ))}
    </>
  );
}
```

#### 3. In Filter Logic (e.g., page.tsx room filters)

**Before:**

```tsx
const availableRooms = rooms.filter((room) => room.status === "còn trống");
```

**After:**

```tsx
import { ROOM_STATUS_ENUM } from "@/lib/roomStatusTranslations";

const availableRooms = rooms.filter((room) => room.status === ROOM_STATUS_ENUM.AVAILABLE);
```

#### 4. Direct Translation in Components

```tsx
import { useTranslation } from "react-i18next";
import { getTranslatedRoomStatus } from "@/lib/roomStatusTranslations";

export default function RoomDisplay({ room }) {
  const { t } = useTranslation();

  return (
    <div>
      <p>Status: {getTranslatedRoomStatus(room.status, t)}</p>
    </div>
  );
}
```

### Files That Need Updating

1. **StatusBadge.tsx** - Display status with translation
2. **AddRoom.tsx** - Room status select dropdown
3. **page.tsx (rooms)** - Room status filter logic (optional - can keep enum values for backend)
4. **page.tsx (hotelreception)** - Room filtering by status (line 59)
5. Any other components displaying room status

### Implementation Steps

1. Import the helper function:

   ```tsx
   import { getRoomStatusTranslationKey, getTranslatedRoomStatus } from "@/lib/roomStatusTranslations";
   ```

2. Import useTranslation hook:

   ```tsx
   import { useTranslation } from "react-i18next";
   ```

3. Get the translation function:

   ```tsx
   const { t } = useTranslation();
   ```

4. Use it to translate room status:
   ```tsx
   const translatedStatus = t(getRoomStatusTranslationKey(room.status));
   // or
   const translatedStatus = getTranslatedRoomStatus(room.status, t);
   ```

### Benefits

✅ Single source of truth for translations
✅ Consistent UI across all components
✅ Easy to add new statuses
✅ Type-safe with TypeScript
✅ Automatic language switching with i18next
✅ Backward compatible with existing enum values
