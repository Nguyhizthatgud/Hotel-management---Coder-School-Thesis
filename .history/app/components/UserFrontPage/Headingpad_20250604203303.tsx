import React from "react";

type Props = {
  roomId?: string;
  roomName?: string;
};

const Headingpad = (props: Props) => {
  return;
  <div className="flex px-4 items-center gap-12 container mx-auto">
    <div className="py-10 h-full">
      <h1 className="text-3xl font-bold text-gray-800">
        Chào mừng đến với trang cá nhân của bạn
      </h1>
      <p className="text-gray-600 mt-2">
        Quản lý đặt chỗ và tận hưởng quyền lợi dành riêng cho hội viên.
      </p>
    </div>
  </div>;
};

export default Headingpad;
