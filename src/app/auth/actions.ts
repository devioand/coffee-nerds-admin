"use server";
import { createClient } from "@/lib/supabase/server";

export async function login(data: { email: string; password: string }) {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (!!response.error) {
    const errorCode = response.error?.code;
    throw new Error(
      errorCode === "invalid_credentials"
        ? "Invalid email or password."
        : "Something went wrong, please contact IT team"
    );
  }

  return;
}

export async function signout() {
  const supabase = createClient();
  return supabase.auth.signOut();
}
