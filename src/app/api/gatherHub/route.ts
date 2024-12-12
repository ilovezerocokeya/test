import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
    const supabase = createClient();

    let {data: members, error} = await supabase
    .from("Users")
    .select("*")
    .eq("hubCard", true);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

    return NextResponse.json({members});
}