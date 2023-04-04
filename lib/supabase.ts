import { createClient as supabaseCreateClient } from "supabase";

const supabaseUrl: string = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey: string = Deno.env.get("SUPABASE_KEY") || "";

export default function createClient() {
  return supabaseCreateClient(supabaseUrl, supabaseKey);
}
