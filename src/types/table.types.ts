export interface Table {
  id: string;
  created_at: string; // ISO timestamp with time zone
  updated_at: string; // ISO timestamp without time zone
  status: string;
  location: string;
  capacity: number;
  table_number: number;
  locked_until: string | null; // ISO timestamp with time zone, nullable
  qr_code: string; // Short unique code for generating QR URL
}

export interface NewTable {
  status?: string;
  location?: string;
  capacity?: number;
  table_number: number;
  locked_until?: string | null; // Optional ISO timestamp with time zone
  qr_code?: string; // Optional short unique code for generating QR URL
}

export interface UpdateTableData {
  status?: string;
  location?: string;
  capacity?: number;
  table_number?: number;
  locked_until?: string | null; // Optional ISO timestamp with time zone
  qr_code?: string; // Optional short unique code for generating QR URL
}
