"use server";
import { IPost, ISection } from "@/types";
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

export async function getSections(): Promise<ISection[]> {
  const supabase = await createClient();
  // const { data, error } = await supabase.from("sections").select("*");
  const { data: sections, error } = await supabase.from("sections").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return sections;
}

export async function getSectionBySlug(slug: string): Promise<ISection> {
  const supabase = await createClient();
  const { data: section, error } = await supabase
    .from("sections")
    .select("*")
    .eq("slug", slug);
  if (error) {
    throw new Error(error.message);
  }

  return section[0];
}

export async function getPosts(): Promise<IPost[]> {
  const supabase = await createClient();
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

export async function getPostsBySection(section_id: number): Promise<IPost[]> {
  const supabase = await createClient();
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
    .eq("section_id", section_id)
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
  const supabase = await createClient();
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

export async function getPost(id: number): Promise<IPost> {
  const supabase = await createClient();
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
    .eq("id", id);

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

  return mappedTopics[0];
}

export async function getPostsForSection(section_id: number): Promise<IPost[]> {
  const supabase = await createClient();
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
    .eq("section_id", section_id)
    .order("created_at", { ascending: true });

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

  return mappedTopics[0];
}
