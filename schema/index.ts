import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "البريد الإلكتروني مطلوب" }).trim(),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }).trim(),
});

export const signupSchema = z.object({
  // name: z
  //   .string({
  //     error: (issue) =>
  //       issue.input === undefined ? "الاسم مطلوب" : "Not a string",
  //   })
  //   .min(4, { message: "يجب أن يكون الإسم أكبر من 4 أحرف" })
  //   .max(20, { message: "يجب أن يكون الإسم أقل من 20 حرفًا" })
  //   .trim(),
  // username: z
  //   .string()
  //   .min(3, "اسم المستخدم يجب ألا يقل عن 3 أحرف")
  //   .max(20, "اسم المستخدم يجب ألا يزيد عن 20 حرفًا")
  //   .regex(
  //     /^[a-zA-Z][a-zA-Z0-9_]*$/,
  //     "اسم المستخدم يجب أن يبدأ بحرف ويحتوي فقط على أحرف وأرقام وشرطة سفلية"
  //   ),
  email: z.email({ error: "البريد الإلكتروني مطلوب" }).trim(),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }).trim(),
});
