'use client';

export function LoadingPlaceholder({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full" />
      <span className="ml-3 text-gray-600">{text}</span>
    </div>
  );
}
