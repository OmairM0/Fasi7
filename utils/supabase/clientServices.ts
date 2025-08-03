import { createClient } from "./client";

const supabase = createClient();

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getUserData() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userDataFromTable = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();
  return { user, userDataFromTable };
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return false;
  }

  return true;
}
