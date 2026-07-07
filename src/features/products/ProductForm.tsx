import { useState } from 'react';
import type { Product } from '@/types';
import { labels } from '@/lib/labels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, loading }: ProductFormProps) {
  const [name, setName] = useState(product?.name || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [category, setCategory] = useState(product?.category || '');
  const [purchasePrice, setPurchasePrice] = useState(product?.purchasePrice?.toString() || '');
  const [sellingPrice, setSellingPrice] = useState(product?.sellingPrice?.toString() || '');
  const [stockQuantity, setStockQuantity] = useState(product?.stockQuantity?.toString() || '0');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('category', category);
    formData.append('purchasePrice', purchasePrice);
    formData.append('sellingPrice', sellingPrice);
    formData.append('stockQuantity', stockQuantity);
    if (image) formData.append('image', image);
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? labels.products.edit : labels.products.add}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{labels.products.name}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>{labels.products.sku}</Label>
          <Input value={sku} onChange={(e) => setSku(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>{labels.products.category}</Label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>{labels.products.purchasePrice}</Label>
          <Input type="number" min="0" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>{labels.products.sellingPrice}</Label>
          <Input type="number" min="0" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>{labels.products.stock}</Label>
          <Input type="number" min="0" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>{labels.products.image} {!product && labels.products.imageRequired}</Label>
          <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required={!product} />
        </div>
        <div className="flex gap-2 md:col-span-2">
          <Button type="submit" disabled={loading}>{loading ? labels.products.saving : labels.products.save}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>{labels.products.cancel}</Button>
        </div>
      </form>
    </Card>
  );
}
