"use server";
import { createClient } from "./server";

export async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userDataFromTable = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  return { user, data: userDataFromTable.data };
}
