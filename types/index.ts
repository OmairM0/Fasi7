import { User } from "@supabase/supabase-js";

export interface IUser {
  user: User | null;
  data: {
    id: string;
    name: string;
    username: string;
    bio: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string | null;
    role: string;
  } | null;
}

export interface ISection {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  sections: { id: number; name: string };
  users: { id: number; name: string };
  created_at: Date;
}
