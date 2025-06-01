"use client";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider } from "antd";
import {
  GoogleOutlined,
  FacebookFilled,
  GithubOutlined,
} from "@ant-design/icons";
type Props = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginSignupPage = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-gray-600 text-3xl">Đăng Nhập / Đăng Ký</h1>
      <span className="py-3 text-sm">
        Dễ dàng quản lý đặt chỗ và tận hưởng quyền lợi dành riêng cho hội viên.
      </span>
      <Form
        className="w-full max-w-sm"
        name="user"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="small"
            className="w-full"
            autoFocus
            placeholder="vui lòng nhập địa chỉ e-mail"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Button className="w-full">Tiếp Tục</Button>
        </Form.Item>
        <Divider size="large" className="text-lg py-4 my-6 font-semibold">
          Phương thức đăng nhập khác
        </Divider>
        <div className="flex gap-2">
          <Button type="default" block icon={<GithubOutlined />} block></Button>
          <Button type="default" icon={<GoogleOutlined />} block></Button>
          <Button type="default" icon={<FacebookFilled />} block></Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginSignupPage;
