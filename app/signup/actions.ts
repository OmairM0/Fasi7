"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signupSchema } from "@/schema";

type FormState =
  | undefined
  | {
      errors: {
        name?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
        message?: string;
      };
    };

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1) Validate form fields
  const validatedFields = signupSchema.safeParse({
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

  const { data: user, error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    return {
      errors: error.message
        ? { message: error.message }
        : { message: "حصل خطأ" },
    };
  }
  console.log(user.user?.id);
  console.log(user.session?.user);

  // save user info to normal table
  // const { data, error: insertError } = await supabase.from("users").insert([
  //   {
  //     id: user.user?.id,
  //     name: validatedFields.data.name,
  //     // username: validatedFields.data.username,
  //   },
  // ]);
  // console.log(data);

  // if (insertError) {
  //   console.error("Error inserting user data:", insertError);
  //   return {
  //     errors: insertError.message
  //       ? { message: insertError.message }
  //       : { message: "حصل خطأ" },
  //   };
  // }

  revalidatePath("/", "layout");
  redirect("/signup/confirm");
}

// export async function signup2(formData: FormData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }
