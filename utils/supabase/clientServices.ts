import { IComment, IPost, ISection } from "@/types";
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
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("username", username.trim())
    .single();

  return !data;
}

// Sections
export async function getSections(): Promise<ISection[]> {
  // const { data, error } = await supabase.from("sections").select("*");
  const { data: sections, error } = await supabase.from("sections").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return sections;
}

// topics
interface NewPost {
  title: string;
  content: string;
  section_id: number;
  user_id?: string; // optional
}

export async function createPost(post: NewPost) {
  const user = (await supabase.auth.getUser()).data.user;
  post.user_id = user?.id;
  const { data, error } = await supabase
    .from("topics")
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getPosts(): Promise<IPost[]> {
  const { data: topics, error } = await supabase
    .from("topics")
    .select(
      `
    id,
    title,
    content,
    created_at,
    users (
      id,
      name
    ),
    sections (
      id,
      name
    )
  `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Map the array fields to single objects if needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedTopics = (topics || []).map((topic: any) => ({
    ...topic,
    users: Array.isArray(topic.users) ? topic.users[0] : topic.users,
    sections: Array.isArray(topic.sections)
      ? topic.sections[0]
      : topic.sections,
  }));

  return mappedTopics;
}

export async function getPostsByUser(): Promise<IPost[]> {
  const user = (await supabase.auth.getUser()).data.user;
  const { data: topics, error } = await supabase
    .from("topics")
    .select(
      `
    id,
    title,
    content,
    created_at,
    users (
      id,
      name
    ),
    sections (
      id,
      name
    )
  `
    )
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Map the array fields to single objects if needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedTopics = (topics || []).map((topic: any) => ({
    ...topic,
    users: Array.isArray(topic.users) ? topic.users[0] : topic.users,
    sections: Array.isArray(topic.sections)
      ? topic.sections[0]
      : topic.sections,
  }));

  return mappedTopics;
}

export async function getTopPosts(): Promise<IPost[]> {
  const { data: topics, error } = await supabase
    .from("topics")
    .select(
      `
    id,
    title,
    content,
    created_at,
    users (
      id,
      name
    ),
    sections (
      id,
      name
    )
  `
    )
    .range(0, 3)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Map the array fields to single objects if needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedTopics = (topics || []).map((topic: any) => ({
    ...topic,
    users: Array.isArray(topic.users) ? topic.users[0] : topic.users,
    sections: Array.isArray(topic.sections)
      ? topic.sections[0]
      : topic.sections,
  }));

  return mappedTopics;
}

// Comments
export async function createComment(postId: number, content: string) {
  const user = (await supabase.auth.getUser()).data.user;

  const { data, error } = await supabase
    .from("comments")
    .insert({ content: content, topic_id: postId, user_id: user?.id })
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getComments(topic_id: number): Promise<IComment[]> {
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
    id,
    content,
    created_at,
    users (
      id,
      name
    )
  `
    )
    .eq("topic_id", topic_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Map the array fields to single objects if needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedComments = (comments || []).map((comment: any) => ({
    ...comment,
    users: Array.isArray(comment.users) ? comment.users[0] : comment.users,
  }));

  return mappedComments;
}

export async function getCommentsByUser(): Promise<IComment[]> {
  const user = (await supabase.auth.getUser()).data.user;
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
    id,
    content,
    created_at,
    topics (
      id,
      title
    ),
    users (
      id,
      name
    )
  `
    )
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Map the array fields to single objects if needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedComments = (comments || []).map((comment: any) => ({
    ...comment,
    users: Array.isArray(comment.users) ? comment.users[0] : comment.users,
    topics: Array.isArray(comment.topics) ? comment.topics[0] : comment.topics,
  }));

  return mappedComments;
}
