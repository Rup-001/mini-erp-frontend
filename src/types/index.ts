export type Role = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  results: T[];
  pagination: Pagination;
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  imageUrl: string;
  createdAt: string;
}

export interface SaleItem {
  product: Product | string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  _id: string;
  items: SaleItem[];
  grandTotal: number;
  soldBy: User | string;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  lowStockProducts: Pick<Product, '_id' | 'name' | 'sku' | 'stockQuantity' | 'category'>[];
}

export const ROLE_PERMISSIONS = {
  admin: ['product:create', 'product:read', 'product:update', 'product:delete', 'sale:create', 'sale:read', 'dashboard:read'],
  manager: ['product:create', 'product:read', 'product:update', 'sale:create', 'sale:read', 'dashboard:read'],
  employee: ['product:read', 'sale:create', 'sale:read', 'dashboard:read'],
} as const;

export type Permission = (typeof ROLE_PERMISSIONS)[Role][number];

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return (ROLE_PERMISSIONS[role] as readonly string[]).includes(permission);
};
