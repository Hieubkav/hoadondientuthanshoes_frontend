export interface Invoice {
  id: number;
  seller_tax_code: string;
  invoice_code: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
