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
