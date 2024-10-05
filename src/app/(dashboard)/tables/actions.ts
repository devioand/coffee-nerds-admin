"use server";

import { createClient } from "@/lib/supabase/server";
import { NewTable, Table, UpdateTableData } from "@/types/table.types";

// Fetch all tables
export async function getTables(): Promise<Table[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tables")
    .select("*")
    .order("table_number", { ascending: true });

  console.log({ data, error });

  if (error) {
    throw new Error("Failed to fetch tables.");
  }

  return data as Table[];
}

// Create a new table
export async function createTable(
  newTable: NewTable
): Promise<{ success: boolean }> {
  const supabase = createClient();
  const { error } = await supabase.from("tables").insert(newTable);

  if (error) {
    console.log({ error });
    // Check if the error code is 23505, which indicates a duplicate key violation
    if (error.code === "23505") {
      throw new Error(
        "Table with this number already exist. Please try different table number."
      );
    }
    throw new Error("Failed to create a new table. Pleae contact IT Team.");
  }

  return { success: true };
}

// Update an existing table
export async function updateTable(
  tableId: string,
  updatedData: UpdateTableData
): Promise<{ success: boolean }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("tables")
    .update(updatedData)
    .eq("id", tableId);

  if (error) {
    throw new Error("Failed to update the table.");
  }

  return { success: true };
}

// Delete a table
export async function deleteTable(
  tableId: string
): Promise<{ success: boolean }> {
  const supabase = createClient();
  const { error } = await supabase.from("tables").delete().eq("id", tableId);

  if (error) {
    console.log({ error });
    // Check if the error code is 23503, which indicates a foreign key violation
    if (error.code === "23503") {
      throw new Error(
        "This table is already used in any of the order, so please delete that order first to delete this table."
      );
    }
    // General error handling
    throw new Error(`Failed to delete the table. Please contact IT team`);
  }

  return { success: true };
}

// Unlock a table
export async function unlockTable(
  tableId: string
): Promise<{ success: boolean }> {
  const supabase = createClient();
  // Attempting the update
  const { error } = await supabase
    .from("tables")
    .update({ locked_until: null })
    .eq("id", tableId)
    .select();

  if (error) {
    throw new Error("Failed to unlock the table.");
  }

  return { success: true };
}

// Update table QR code
export async function updateTableQRCode(
  tableId: string,
  qrCode: string
): Promise<{ success: boolean; data: string }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tables")
    .update({ qr_code: qrCode })
    .eq("id", tableId)
    .select("qr_code");

  if (error) {
    console.log({ error });
    throw new Error("Failed to update the QR code for the table.");
  }

  return { success: true, data: data[0].qr_code };
}
