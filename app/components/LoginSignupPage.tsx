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
import { toast } from "sonner";
import { useAuthUIStore } from "@/stores/useAuthUIStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
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
  const { t } = useTranslation();
  const router = useRouter();
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
  const close = useAuthUIStore((state) => state.close) as () => void;

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      const token = await useAuthStore.getState().getToken(true);
      console.log(token);
      loginForm.reset();
      close(); // Close the login modal
      router.push("/hotelreception"); // Redirect to dashboard
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
        toast.success(t("signup_success_toast"));
      }
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : t("signup_error_toast");
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2!">
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
              <svg width={40} height={40} viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="apacheGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DA7523" />
                    <stop offset="100%" stopColor="#D1AE3C" />
                  </linearGradient>
                </defs>
                {/* Feather shape */}
                <path
                  d="M24 4C24 4 18 8 16 14C14 20 14 28 14 32C14 36 16 42 24 44C32 42 34 36 34 32C34 28 34 20 32 14C30 8 24 4 24 4Z"
                  fill="url(#apacheGradient1)"
                />
                {/* Feather details */}
                <path
                  d="M24 8L20 16M24 8L28 16M24 12L22 20M24 12L26 20M24 16L23 24M24 16L25 24"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Building outline at bottom */}
                <rect x="18" y="32" width="12" height="10" fill="white" opacity="0.3" rx="1" />
                <rect x="20" y="34" width="2" height="3" fill="#DC2626" />
                <rect x="23" y="34" width="2" height="3" fill="#DC2626" />
                <rect x="26" y="34" width="2" height="3" fill="#DC2626" />
              </svg>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-gray-600 text-3xl flex justify-center items-center gap-2 font-semibold py-3"
            >
              <span>{t("login_form_thumbnail")}</span>
            </motion.div>

            <motion.span variants={itemVariants} className="py-3 text-sm block text-center">
              {t("login_form_subthumbnail")}
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
                    <p className="text-orange-500 text-xs mt-1">{t("login_form_email_error")}</p>
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
                        placeholder={t("login_form_password_placeholder")}
                        className="rounded-lg"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-orange-500 text-xs mt-1">{t("login_form_password_error")}</p>
                  )}
                </Form.Item>

                <Form.Item>
                  <Flex justify="space-between" align="center">
                    <Checkbox>
                      <span className="text-sm">{t("login_form_remember_signin")}</span>
                    </Checkbox>
                    <a className="text-sm text-orange-500! hover:underline!" href="#forgot">
                      {t("login_form_forgot_password")}
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
                        {t("login_form_signin_button")}
                      </span>
                    </Button>
                  </motion.div>
                </Form.Item>

                <Divider>{t("login_form_signin_solution")}</Divider>

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

                <Form.Item className="mt-6! text-center">
                  <span className="text-sm">
                    {t("login_form_no_account")}{" "}
                    <a onClick={() => switchToSignup()} className="text-orange-500! hover:underline! cursor-pointer">
                      {t("login_form_signup_now")}
                    </a>
                  </span>
                </Form.Item>

                <Form.Item className="mt-4 text-center text-sm text-gray-500">
                  {t("login_form_policy1")}
                  <span className="text-orange-500 cursor-pointer">{t("login_form_policy2")}</span>
                  {t("login_form_policy3")}{" "}
                  <span className="text-orange-500 cursor-pointer">{t("login_form_policy4")}</span>
                  {t("login_form_policy5")}
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
              <svg width={40} height={40} viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="apacheGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DA7523" />
                    <stop offset="100%" stopColor="#D1AE3C" />
                  </linearGradient>
                </defs>
                {/* Feather shape */}
                <path
                  d="M24 4C24 4 18 8 16 14C14 20 14 28 14 32C14 36 16 42 24 44C32 42 34 36 34 32C34 28 34 20 32 14C30 8 24 4 24 4Z"
                  fill="url(#apacheGradient1)"
                />
                {/* Feather details */}
                <path
                  d="M24 8L20 16M24 8L28 16M24 12L22 20M24 12L26 20M24 16L23 24M24 16L25 24"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Building outline at bottom */}
                <rect x="18" y="32" width="12" height="10" fill="white" opacity="0.3" rx="1" />
                <rect x="20" y="34" width="2" height="3" fill="#DC2626" />
                <rect x="23" y="34" width="2" height="3" fill="#DC2626" />
                <rect x="26" y="34" width="2" height="3" fill="#DC2626" />
              </svg>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-gray-600 text-3xl flex justify-center items-center gap-2 font-semibold py-3"
            >
              <span>{t("signup_form_thumbnail")}</span>
            </motion.div>

            <motion.span variants={itemVariants} className="py-3 text-sm block text-center">
              {t("login_form_subthumbnail")}
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
                    <p className="text-orange-500 text-xs mt-1">{t("signup_form_email_error")}</p>
                  )}
                </Form.Item>

                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item>
                      <Controller
                        name="firstname"
                        control={registerForm.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder={t("signup_form_name_placeholder")}
                            className="rounded-lg"
                            size="small"
                            variant="filled"
                          />
                        )}
                      />
                      {registerForm.formState.errors.firstname && (
                        <p className="text-orange-500 text-xs mt-1">{t("signup_form_name_error")}</p>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      <Controller
                        name="lastname"
                        control={registerForm.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder={t("signup_form_lastname_placeholder")}
                            className="rounded-lg"
                            size="small"
                            variant="filled"
                          />
                        )}
                      />
                      {registerForm.formState.errors.lastname && (
                        <p className="text-orange-500 text-xs mt-1">{t("signup_form_lastname_error")}</p>
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
                        placeholder={t("signup_form_confirm_password_placeholder")}
                        className="rounded-lg"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-orange-500 text-xs mt-1">{t("signup_form_password_error")}</p>
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
                        placeholder={t("signup_form_confirm_password_placeholder")}
                        className="rounded-lg"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                  {registerForm.formState.errors.confirmedPassword && (
                    <p className="text-orange-500 text-xs mt-1">{t("signup_form_confirm_password_error")}</p>
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
                        {t("signup_form_signup_button")}
                      </span>
                    </Button>
                  </motion.div>
                </Form.Item>

                <Form.Item className="text-center">
                  <span className="text-sm">
                    {t("signup_form_have_account")}{" "}
                    <a onClick={() => switchToLogin()} className="cursor-pointer text-orange-500! hover:underline!">
                      {t("signup_form_signin_now")}
                    </a>
                  </span>
                </Form.Item>

                <Form.Item className="text-center text-sm text-gray-500">
                  {t("login_form_policy1")}{" "}
                  <span className="text-orange-500 cursor-pointer">{t("login_form_policy2")}</span>{" "}
                  {t("login_form_policy3")}{" "}
                  <span className="text-orange-500 cursor-pointer">{t("login_form_policy4")}</span>{" "}
                  {t("login_form_policy5")}
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
