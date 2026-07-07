import type { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { labels } from '@/lib/labels';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface LineItem {
  product: Product;
  quantity: number;
}

interface SaleLineItemsProps {
  items: LineItem[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function SaleLineItems({ items, onQuantityChange, onRemove }: SaleLineItemsProps) {
  const grandTotal = items.reduce((sum, item) => sum + item.quantity * item.product.sellingPrice, 0);

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{labels.sales.noItems}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left">
              <th className="p-3">{labels.sales.product}</th>
              <th className="p-3">{labels.sales.unitPrice}</th>
              <th className="p-3">{labels.sales.qty}</th>
              <th className="p-3">{labels.sales.subtotal}</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product._id} className="border-b border-border last:border-0">
                <td className="p-3">{item.product.name}</td>
                <td className="p-3">{formatCurrency(item.product.sellingPrice)}</td>
                <td className="p-3">
                  <Input
                    type="number"
                    min={1}
                    max={item.product.stockQuantity}
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.product._id, parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                </td>
                <td className="p-3">{formatCurrency(item.quantity * item.product.sellingPrice)}</td>
                <td className="p-3">
                  <Button size="sm" variant="ghost" onClick={() => onRemove(item.product._id)}>{labels.sales.remove}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">{labels.sales.grandTotal}: {formatCurrency(grandTotal)}</p>
        <p className="text-xs text-muted-foreground">{labels.sales.previewNote}</p>
      </div>
    </div>
  );
}
