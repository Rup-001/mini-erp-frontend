import { useState } from 'react';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { labels } from '@/lib/labels';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProductPickerProps {
  products: Product[];
  onAdd: (product: Product) => void;
}

export default function ProductPicker({ products, onAdd }: ProductPickerProps) {
  const [search, setSearch] = useState('');

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <Input placeholder={labels.sales.searchProduct} value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="max-h-48 overflow-y-auto rounded-md border border-border">
        {filtered.map((p) => (
          <div key={p._id} className="flex items-center justify-between border-b border-border px-3 py-2 last:border-0">
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                {p.sku} · {formatCurrency(p.sellingPrice)} · {labels.sales.stock}: {p.stockQuantity}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => onAdd(p)} disabled={p.stockQuantity === 0}>
              {labels.sales.add}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
