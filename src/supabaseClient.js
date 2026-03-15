import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uvlhfwugsfdeomhwekqi.supabase.co";

const supabaseKey = "sb_publishable_O8DP4y-gOPddkWnhnz_XXQ_J0Is_dll";

export const supabase = createClient(supabaseUrl, supabaseKey);