import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string().min(1, "login_form_email_error"),
  password: z.string().min(1, "login_form_password_error")
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z.string().min(1, "signup_form_email_error").email("Email không hợp lệ"),

    firstname: z.string().min(1, "signup_form_name_error"),

    lastname: z.string().min(1, "signup_form_lastname_error"),

    password: z
      .string()
      .min(1, "signup_form_password_error")
      .min(6, "signup_form_password_error_length")
      .regex(/[A-Z]/, "signup_form_password_error_pattern")
      .regex(/[a-z]/, "signup_form_password_error_pattern")
      .regex(/[0-9]/, "signup_form_password_error_pattern"),

    confirmedPassword: z.string().min(1, "signup_form_confirm_password_error")
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "signup_form_confirm_password_error_match",
    path: ["confirmedPassword"]
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;
