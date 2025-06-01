import React from "react";

type Props = {};

const Userfrontfield = (props: Props) => {
  return (
    <section className="container mx-auto lg:px-0">
      {/* <div>{grid}</div> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:max-w-none max-w-sm lg:mx-0 mx-auto gap-4 p-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Đăng Nhập</h2>
          <p className="text-gray-600 mb-4">
            Dễ dàng quản lý đặt chỗ và tận hưởng quyền lợi dành riêng cho hội
            viên.
          </p>
          <form>
            <input
              type="email"
              placeholder="Vui lòng nhập địa chỉ e-mail"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Tiếp Tục
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Userfrontfield;
