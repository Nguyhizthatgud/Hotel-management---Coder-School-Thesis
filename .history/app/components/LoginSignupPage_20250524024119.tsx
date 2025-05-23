import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
type Props = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginSignupPage = (props: Props) => {
  return (
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

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
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
    </Form>
  );
};

export default LoginSignupPage;
