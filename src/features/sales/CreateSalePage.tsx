import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/features/products/useProducts';
import { useCreateSale } from './useSales';
import ProductPicker from './ProductPicker';
import SaleLineItems, { type LineItem } from './SaleLineItems';
import { labels } from '@/lib/labels';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types';

export default function CreateSalePage() {
  const navigate = useNavigate();
  const { data: productsData } = useProducts({ limit: 100 });
  const createSale = useCreateSale();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [error, setError] = useState('');

  const handleAdd = (product: Product) => {
    if (lineItems.find((i) => i.product._id === product._id)) return;
    setLineItems([...lineItems, { product, quantity: 1 }]);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setLineItems(lineItems.map((i) => (i.product._id === productId ? { ...i, quantity } : i)));
  };

  const handleRemove = (productId: string) => {
    setLineItems(lineItems.filter((i) => i.product._id !== productId));
  };

  const handleSubmit = async () => {
    if (lineItems.length === 0) {
      setError(labels.sales.addItemError);
      return;
    }
    setError('');
    try {
      await createSale.mutateAsync({
        items: lineItems.map((i) => ({ productId: i.product._id, quantity: i.quantity })),
      });
      navigate('/sales');
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(message || labels.sales.createError);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{labels.sales.createTitle}</h2>
        <p className="text-muted-foreground">{labels.sales.createSubtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{labels.sales.addProducts}</CardTitle>
          </CardHeader>
          {productsData && <ProductPicker products={productsData.results} onAdd={handleAdd} />}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{labels.sales.lineItems}</CardTitle>
          </CardHeader>
          <SaleLineItems items={lineItems} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
        </Card>
      </div>

      {error && <p className="text-destructive">{error}</p>}
      <Button onClick={handleSubmit} disabled={createSale.isPending || lineItems.length === 0}>
        {createSale.isPending ? labels.sales.creating : labels.sales.complete}
      </Button>
    </div>
  );
}
