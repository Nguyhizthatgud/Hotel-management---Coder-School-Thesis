"use client";
import React from "react";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider, Checkbox, Flex, Row, Col } from "antd";
import { GoogleOutlined, FacebookFilled, GithubOutlined, LockOutlined } from "@ant-design/icons";
import { SiApachepulsar } from "react-icons/si";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema, LoginFormData, RegisterFormData } from "@/types/user";
import { useAuthUIStore } from "@/stores/useAuthUIStore";
import { useAuthStore } from "@/stores/useAuthStore";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const LoginSignupPage = () => {
  const { login, register } = useAuthStore();
  const { isLogin } = useAuthUIStore();
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmedPassword: ""
    }
  });
  const switchToLogin = useAuthUIStore((state) => state.switchToLogin) as () => void;
  const switchToSignup = useAuthUIStore((state) => state.switchToSignup) as () => void;
  const submittingSuccess = useAuthUIStore((state) => state.submittingSuccess) as (value: boolean) => void;
  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      const token = await useAuthStore.getState().getToken(true);
      console.log(token);
      loginForm.reset();
    } finally {
      submittingSuccess(true);
    }
    console.log("Login data:", data);
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    const { email, firstname, lastname, password } = data;
    // call register API here
    try {
      const registerSuccess = await register(email, password, lastname, firstname);
      if (registerSuccess) {
        registerForm.reset();
        switchToLogin();
      }
    } catch (error: Error | unknown) {
      console.log("Registration error:", error instanceof Error ? error.message : error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center !py-2">
      <AnimatePresence mode="wait">
        {isLogin ? (
          // LOGIN FORM
          <motion.div
            key="login"
            className="w-full max-w-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <SiApachepulsar className="text-4xl text-orange-400" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-gray-600 text-3xl flex justify-center items-center gap-2 font-semibold py-3"
            >
              <span>Đăng Nhập</span>
            </motion.div>

            <motion.span variants={itemVariants} className="py-3 text-sm block text-center">
              Dễ dàng quản lý đặt chỗ và tận hưởng quyền lợi dành riêng cho hội viên.
            </motion.span>

            <motion.div variants={itemVariants}>
              <Form onFinish={loginForm.handleSubmit(onLoginSubmit)}>
                <Form.Item>
                  <Controller
                    name="email"
                    control={loginForm.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        variant="filled"
                        prefix={<UserOutlined />}
                        placeholder="Email"
                        className="rounded-lg"
                        size="small"
                      />
                    )}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-orange-500 text-xs mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </Form.Item>

                <Form.Item>
                  <Controller
                    name="password"
                    control={loginForm.control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                        className="rounded-lg"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-orange-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </Form.Item>

                <Form.Item>
                  <Flex justify="space-between" align="center">
                    <Checkbox>
                      <span className="text-sm">Ghi nhớ đăng nhập</span>
                    </Checkbox>
                    <a className="text-sm !text-orange-500 hover:!underline" href="#forgot">
                      Quên mật khẩu?
                    </a>
                  </Flex>
                </Form.Item>

                <Form.Item>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      htmlType="submit"
                      className="w-full"
                      disabled={loginForm.formState.isSubmitting}
                      loading={loginForm.formState.isSubmitting}
                      block
                    >
                      <span className={`text-orange-500 ${loginForm.formState.isSubmitting ? "hidden" : "block"}`}>
                        Đăng Nhập
                      </span>
                    </Button>
                  </motion.div>
                </Form.Item>

                <Divider>Phương thức đăng nhập khác</Divider>

                <div className="flex gap-2 flex-col">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="default" icon={<GoogleOutlined />} block>
                      Gmail
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="default" block icon={<GithubOutlined />}>
                      Github
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="default" icon={<FacebookFilled />} block>
                      Facebook
                    </Button>
                  </motion.div>
                </div>

                <Form.Item className="!mt-6 text-center">
                  <span className="text-sm">
                    Chưa có tài khoản?{" "}
                    <a onClick={() => switchToSignup()} className="!text-orange-500 hover:!underline cursor-pointer">
                      Đăng ký
                    </a>
                  </span>
                </Form.Item>

                <Form.Item className="mt-4 text-center text-sm text-gray-500">
                  Bằng việc tiếp tục, bạn đồng ý với
                  <span className="text-orange-500 cursor-pointer"> điều khoản dịch vụ</span> và{" "}
                  <span className="text-orange-500 cursor-pointer"> chính sách bảo mật </span>của chúng tôi.
                </Form.Item>
              </Form>
            </motion.div>
          </motion.div>
        ) : (
          // REGISTER FORM
          <motion.div
            key="signup"
            className="w-full max-w-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <SiApachepulsar className="text-4xl text-orange-400" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-gray-600 text-3xl flex justify-center items-center gap-2 font-semibold py-3"
            >
              <span>Đăng Ký</span>
            </motion.div>

            <motion.span variants={itemVariants} className="py-3 text-sm block text-center">
              Dễ dàng quản lý đặt chỗ và tận hưởng quyền lợi dành riêng cho hội viên.
            </motion.span>

            <motion.div variants={itemVariants}>
              <Form onFinish={registerForm.handleSubmit(onRegisterSubmit)}>
                <Form.Item>
                  <Controller
                    name="email"
                    control={registerForm.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        className="rounded-lg"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-orange-500 text-xs mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </Form.Item>

                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item>
                      <Controller
                        name="firstname"
                        control={registerForm.control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Tên" className="rounded-lg" size="small" variant="filled" />
                        )}
                      />
                      {registerForm.formState.errors.firstname && (
                        <p className="text-orange-500 text-xs mt-1">
                          {registerForm.formState.errors.firstname.message}
                        </p>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      <Controller
                        name="lastname"
                        control={registerForm.control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Họ" className="rounded-lg" size="small" variant="filled" />
                        )}
                      />
                      {registerForm.formState.errors.lastname && (
                        <p className="text-orange-500 text-xs mt-1">{registerForm.formState.errors.lastname.message}</p>
                      )}
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Controller
                    name="password"
                    control={registerForm.control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                        className="rounded-lg"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-orange-500 text-xs mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </Form.Item>

                <Form.Item>
                  <Controller
                    name="confirmedPassword"
                    control={registerForm.control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        prefix={<LockOutlined />}
                        placeholder="Xác nhận mật khẩu"
                        className="rounded-lg"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                  {registerForm.formState.errors.confirmedPassword && (
                    <p className="text-orange-500 text-xs mt-1">
                      {registerForm.formState.errors.confirmedPassword.message}
                    </p>
                  )}
                </Form.Item>

                <Form.Item>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      htmlType="submit"
                      disabled={registerForm.formState.isSubmitting}
                      loading={registerForm.formState.isSubmitting}
                      className="w-full"
                      block
                    >
                      <span className={`text-orange-500 ${registerForm.formState.isSubmitting ? "hidden" : "block"}`}>
                        Đăng ký
                      </span>
                    </Button>
                  </motion.div>
                </Form.Item>

                <Form.Item className="text-center">
                  <span className="text-sm">
                    Đã có tài khoản?{" "}
                    <a onClick={() => switchToLogin()} className="cursor-pointer !text-orange-500 hover:!underline">
                      Đăng nhập tại đây
                    </a>
                  </span>
                </Form.Item>

                <Form.Item className="text-center text-sm text-gray-500">
                  Bằng việc tiếp tục, bạn đồng ý với{" "}
                  <span className="text-orange-500 cursor-pointer">điều khoản dịch vụ</span> và{" "}
                  <span className="text-orange-500 cursor-pointer">chính sách bảo mật</span> của chúng tôi.
                </Form.Item>
              </Form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginSignupPage;
