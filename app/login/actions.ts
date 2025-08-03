"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { loginSchema } from "@/schema";

type FormState =
  | undefined
  | { errors: { email?: string[]; password?: string[]; message?: string } };

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1) Validate form fields
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const supabase = await createClient();

  const errorMessage = { message: "بيانات غير صحيحة" };
  const { error } = await supabase.auth.signInWithPassword(
    validatedFields.data
  );

  if (error) {
    return { errors: errorMessage };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
