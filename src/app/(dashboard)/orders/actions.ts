"use server";

import { createClient } from "@/lib/supabase/server";

export async function getOrders() {
  const supabase = createClient();
  const response = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return response;
}

export async function getTableById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tables")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Failed to fetch table details.");
  }

  return data;
}

export async function deleteOrder(orderId: string) {
  const supabase = createClient();
  const { error } = await supabase.from("orders").delete().eq("id", orderId);

  if (error) {
    throw new Error("Failed to delete order.");
  }

  return { success: true };
}
