"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
type Props = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginSignupPage = (props: Props) => {
  return (
    <div>
      <h1>Login or Signup</h1>
      <p>Please enter your credentials to continue.</p>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="link" htmlType="button" style={{ marginLeft: "10px" }}>
            Forgot password?
          </Button>
        </Form.Item>
        <div>
          Phương thức đăng nhập khác:
          <Button type="link" htmlType="button" style={{ marginLeft: "10px" }}>
            Sign in with Google
          </Button>
          <Button type="link" htmlType="button" style={{ marginLeft: "10px" }}>
            Sign in with Facebook
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginSignupPage;
