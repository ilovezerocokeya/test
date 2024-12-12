import { Tables } from "@/types/supabase";

type ChatUserInfo = {
  Users: {
    profile_image_url: string;
    nickname: string;
  };
};

export type MessageRow = Tables<"Messages"> & ChatUserInfo;
