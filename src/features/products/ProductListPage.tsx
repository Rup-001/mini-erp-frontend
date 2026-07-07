import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import type { Product } from '@/types';
import { hasPermission } from '@/types';
import { labels } from '@/lib/labels';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from './useProducts';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useSelector((state: RootState) => state.auth.user)!;
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, error } = useProducts({ search, category, page, limit: 10 });
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const canCreate = hasPermission(user.role, 'product:create');

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    setSearchParams(params);
  };

  const handleCreate = async (formData: FormData) => {
    await createMutation.mutateAsync(formData);
    setShowForm(false);
  };

  const handleUpdate = async (formData: FormData) => {
    if (!editingProduct) return;
    await updateMutation.mutateAsync({ id: editingProduct._id, formData });
    setEditingProduct(undefined);
  };

  const handleDelete = async (id: string) => {
    if (confirm(labels.products.deleteConfirm)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{labels.products.title}</h2>
          <p className="text-muted-foreground">{labels.products.subtitle}</p>
        </div>
        {canCreate && !showForm && !editingProduct && (
          <Button onClick={() => setShowForm(true)}>{labels.products.add}</Button>
        )}
      </div>

      {showForm && (
        <ProductForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} loading={createMutation.isPending} />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProduct(undefined)}
          loading={updateMutation.isPending}
        />
      )}

      {!showForm && !editingProduct && (
        <>
          <div className="flex gap-4">
            <Input
              placeholder={labels.products.search}
              value={search}
              onChange={(e) => updateParams('search', e.target.value)}
              className="max-w-xs"
            />
            <Input
              placeholder={labels.products.filterCategory}
              value={category}
              onChange={(e) => updateParams('category', e.target.value)}
              className="max-w-xs"
            />
          </div>

          {isLoading && <p>{labels.products.loading}</p>}
          {error && <p className="text-destructive">{labels.products.loadError}</p>}
          {data && (
            <ProductTable
              products={data.results}
              pagination={data.pagination}
              role={user.role}
              onPageChange={(p) => updateParams('page', p.toString())}
              onEdit={setEditingProduct}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
