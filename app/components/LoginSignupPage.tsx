"use client";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Divider } from "antd";
type Props = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginSignupPage = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-gray-600 text-3xl">Đăng Nhập / Đăng Ký</h1>
      <span className="py-3 text-sm">Dễ dàng quản lý đặt chỗ và tận hưởng quyền lợi dành riêng cho hội viên.</span>
      <Form name="user" initialValues={{ remember: true }} autoComplete="off">
        <Form.Item rules={[{ required: true, message: "Please input your username!" }]}>
          <Input
            size="large"
            className="google-input"
            placeholder="vui lòng nhập địa chỉ e-mail"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button className="w-full">Tiếp Tục</Button>
        </Form.Item>
        <Divider>Phương thức đăng nhập khác</Divider>
        <div>
          <Button type="link">Sign in with Google</Button>
          <Button type="link">Sign in with Facebook</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginSignupPage;
