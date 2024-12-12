import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  let { data: IT_Events, error } = await supabase
    .from("IT_Events")
    .select("*")
    .order("date_start", { ascending: false });

  return NextResponse.json({ data: IT_Events });
};
