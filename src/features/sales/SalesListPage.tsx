import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSales } from './useSales';
import { formatCurrency, formatDate } from '@/lib/format';
import { labels } from '@/lib/labels';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Sale, User } from '@/types';

export default function SalesListPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useSales({ page, limit: 10 });

  const getSoldByName = (soldBy: Sale['soldBy']) => {
    if (typeof soldBy === 'string') return soldBy;
    return (soldBy as User).name;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{labels.sales.title}</h2>
          <p className="text-muted-foreground">{labels.sales.subtitle}</p>
        </div>
        <Link to="/sales/new">
          <Button>{labels.sales.newSale}</Button>
        </Link>
      </div>

      {isLoading && <p>{labels.sales.loading}</p>}
      {error && <p className="text-destructive">{labels.sales.loadError}</p>}

      {data && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="p-3">{labels.sales.date}</th>
                  <th className="p-3">{labels.sales.items}</th>
                  <th className="p-3">{labels.sales.grandTotal}</th>
                  <th className="p-3">{labels.sales.soldBy}</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((sale) => (
                  <tr key={sale._id} className="border-b border-border last:border-0">
                    <td className="p-3">{formatDate(sale.createdAt)}</td>
                    <td className="p-3">{sale.items.length} {labels.sales.items}</td>
                    <td className="p-3 font-medium">{formatCurrency(sale.grandTotal)}</td>
                    <td className="p-3">{getSoldByName(sale.soldBy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between p-3">
            <p className="text-sm text-muted-foreground">
              {labels.products.page} {data.pagination.page} {labels.products.of} {data.pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>{labels.products.previous}</Button>
              <Button size="sm" variant="outline" disabled={page >= data.pagination.totalPages} onClick={() => setPage(page + 1)}>{labels.products.next}</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
