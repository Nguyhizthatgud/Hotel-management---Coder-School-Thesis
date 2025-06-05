import React from "react";

type Props = {
  roomId?: string;
  roomName?: string;
};

const Headingpad = (props: Props) => {
  return;
  <div className="flex flex-col items-center justify-center py-8 bg-gray-100 dark:bg-gray-800">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      {props.roomName || "Room Name"}
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300">
      Room ID: {props.roomId || "12345"}
    </p>
  </div>;
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {props.roomName || "Room Name"}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Room ID: {props.roomId || "12345"}
      </p>
    </div>
  );
};

export default Headingpad;
