import type { Product } from '@/types';
import { labels } from '@/lib/labels';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface LowStockTableProps {
  products: Pick<Product, '_id' | 'name' | 'sku' | 'stockQuantity' | 'category'>[];
}

export default function LowStockTable({ products }: LowStockTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{labels.dashboard.lowStock}</CardTitle>
      </CardHeader>
      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">{labels.dashboard.noLowStock}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4">{labels.table.name}</th>
                <th className="pb-2 pr-4">{labels.table.sku}</th>
                <th className="pb-2 pr-4">{labels.table.category}</th>
                <th className="pb-2">{labels.table.stock}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{p.sku}</td>
                  <td className="py-2 pr-4">{p.category}</td>
                  <td className="py-2">
                    <span className={p.stockQuantity === 0 ? 'text-destructive font-medium' : 'text-amber-600 font-medium'}>
                      {p.stockQuantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
