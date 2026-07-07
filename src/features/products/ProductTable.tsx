import type { Product, Pagination, Role } from '@/types';
import { hasPermission } from '@/types';
import { formatCurrency } from '@/lib/format';
import { labels } from '@/lib/labels';
import { Button } from '@/components/ui/button';

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000';

interface ProductTableProps {
  products: Product[];
  pagination: Pagination;
  role: Role;
  onPageChange: (page: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, pagination, role, onPageChange, onEdit, onDelete }: ProductTableProps) {
  const canUpdate = hasPermission(role, 'product:update');
  const canDelete = hasPermission(role, 'product:delete');

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left">
              <th className="p-3">{labels.table.image}</th>
              <th className="p-3">{labels.table.name}</th>
              <th className="p-3">{labels.table.sku}</th>
              <th className="p-3">{labels.table.category}</th>
              <th className="p-3">{labels.products.price}</th>
              <th className="p-3">{labels.table.stock}</th>
              <th className="p-3">{labels.products.actions}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const raw = p.imageUrl || '';
              let imgSrc = raw;
              if ((imgSrc.startsWith('https//') || imgSrc.startsWith('http//')) && !imgSrc.includes('://')) {
                imgSrc = imgSrc.replace(/^(https?)\/\//, '$1://');
              }
              if (!(imgSrc.startsWith('http') || imgSrc.startsWith('//'))) {
                imgSrc = `${API_BASE}${imgSrc}`;
              }

              return (
                <tr key={p._id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <img src={imgSrc} alt={p.name} className="h-10 w-10 rounded object-cover" />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.sku}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{formatCurrency(p.sellingPrice)}</td>
                  <td className="p-3">
                    <span className={p.stockQuantity < 5 ? 'text-amber-600 font-medium' : ''}>{p.stockQuantity}</span>
                  </td>
                  <td className="p-3 space-x-2">
                    {canUpdate && (
                      <Button size="sm" variant="outline" onClick={() => onEdit(p)}>{labels.products.editBtn}</Button>
                    )}
                    {canDelete && (
                      <Button size="sm" variant="destructive" onClick={() => onDelete(p._id)}>{labels.products.deleteBtn}</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {labels.products.page} {pagination.page} {labels.products.of} {pagination.totalPages} ({pagination.totalResults} {labels.products.total})
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}>
            {labels.products.previous}
          </Button>
          <Button size="sm" variant="outline" disabled={pagination.page >= pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)}>
            {labels.products.next}
          </Button>
        </div>
      </div>
    </div>
  );
}
