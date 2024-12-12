import { Tables } from "../supabase";

export type Post = {
  post_id: string;
  user_id: string;
  created_at: string;
  category: string;
  duration: number;
  location: string | null;
  total_members: number;
  personal_link?: string | null;
  target_position: string[];
  recruitments: number;
  tech_stack: string | string[];
  deadline: string;
  title: string;
  content: string;
  place?: string;
};

export type User = {
  email: string;
  nickname: string;
  profile_image_url: string | null;
};

export type PostWithUser = Post & {
  user: User;
};

export type ITEvent = Tables<"IT_Events">;
