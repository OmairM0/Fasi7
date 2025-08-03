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
  return { user, data: userDataFromTable.data };
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return false;
  }

  return true;
}

export async function editName({ id, name }: { id: string; name: string }) {
  const { data, error } = await supabase
    .from("users")
    .update([{ name }])
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function editBio({ id, bio }: { id: string; bio: string }) {
  const { data, error } = await supabase
    .from("users")
    .update([{ bio }])
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function editUsername({
  id,
  username,
}: {
  id: string;
  username: string;
}) {
  const { data, error } = await supabase
    .from("users")
    .update([{ username }])
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("username", username.trim())
    .single();

  return !data;
}
