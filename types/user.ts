import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu")
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),

    firstname: z.string().min(1, "Vui lòng nhập tên"),

    lastname: z.string().min(1, "Vui lòng nhập họ"),

    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
      .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
      .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 số"),

    confirmedPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu")
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmedPassword"]
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;
