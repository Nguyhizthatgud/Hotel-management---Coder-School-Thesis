/**
 * Room status to i18n key mapping
 * Use with i18n.t() to get translated room status labels
 */

export const ROOM_STATUS_ENUM = {
  AVAILABLE: "còn trống",
  RESERVED: "đã đặt trước",
  IN_USE: "đang sử dụng",
  MAINTENANCE: "bảo trì",
  CLEANING: "đang dọn dẹp"
} as const;

export type RoomStatusEnum = (typeof ROOM_STATUS_ENUM)[keyof typeof ROOM_STATUS_ENUM];

/**
 * Maps room status enum value to i18n translation key
 * @param status - The room status enum value (e.g., "còn trống", "đã đặt trước")
 * @returns The i18n translation key (e.g., "room_status_available")
 */
export function getRoomStatusTranslationKey(status: string | RoomStatusEnum): string {
  const statusMap: Record<RoomStatusEnum, string> = {
    [ROOM_STATUS_ENUM.AVAILABLE]: "room_status_available",
    [ROOM_STATUS_ENUM.RESERVED]: "room_status_reserved",
    [ROOM_STATUS_ENUM.IN_USE]: "room_status_in_use",
    [ROOM_STATUS_ENUM.MAINTENANCE]: "room_status_maintenance",
    [ROOM_STATUS_ENUM.CLEANING]: "room_status_cleaning"
  };

  return statusMap[status as RoomStatusEnum] || "room_status_available";
}

/**
 * Helper to get all room status options for select dropdowns
 * Returns the enum values that should be used for database/API
 */
export function getRoomStatusOptions(): RoomStatusEnum[] {
  return Object.values(ROOM_STATUS_ENUM);
}

/**
 * Helper to get translated status for display
 * @param status - The room status enum value
 * @param t - The i18n translation function
 * @returns The translated status label
 */
export function getTranslatedRoomStatus(status: string | RoomStatusEnum, t: (key: string) => string): string {
  const key = getRoomStatusTranslationKey(status);
  return t(key);
}
