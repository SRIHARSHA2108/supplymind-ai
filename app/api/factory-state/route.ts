import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ live: false, state: null });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("factory_state")
    .select("*")
    .eq("id", "current")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ live: false, state: null });
  }

  return NextResponse.json({ live: Boolean(data), state: data ?? null });
}
