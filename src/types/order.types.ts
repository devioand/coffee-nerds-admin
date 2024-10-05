// Order.ts
export interface Product {
  id: string;
  name: string;
  notes: string;
  quantity: number;
  imageURL: string;
  price: number;
}

export interface Order {
  readonly id: string;
  readonly table_id: string;
  readonly order_no: number;
  payment_method: string;
  created_at: string;
  products: Product[];
  tables: Table; // New property for the joined table data
}

export interface Table {
  id: string;
  location: string;
  capacity: number;
  table_number: number;
  status: string;
}
