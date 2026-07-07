import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api/dashboard.api';
import { formatCurrency } from '@/lib/format';
import { labels } from '@/lib/labels';
import StatCard from './StatCard';
import LowStockTable from './LowStockTable';

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardApi.getStats,
  });

  if (isLoading) return <p>{labels.dashboard.loading}</p>;
  if (error) return <p className="text-destructive">{labels.dashboard.loadError}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">{labels.dashboard.title}</h2>
        <p className="text-muted-foreground">{labels.dashboard.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title={labels.dashboard.totalProducts} value={data.totalProducts} />
        <StatCard title={labels.dashboard.totalSales} value={data.totalSales} />
        <StatCard title={labels.dashboard.totalRevenue} value={formatCurrency(data.totalRevenue)} />
      </div>
      <LowStockTable products={data.lowStockProducts} />
    </div>
  );
}
