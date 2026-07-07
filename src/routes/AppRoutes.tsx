import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/app/store';
import ProtectedRoute from '@/features/auth/ProtectedRoute';
import LoginPage from '@/features/auth/LoginPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import ProductListPage from '@/features/products/ProductListPage';
import CreateSalePage from '@/features/sales/CreateSalePage';
import SalesListPage from '@/features/sales/SalesListPage';

const queryClient = new QueryClient();

export default function AppRoutes() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/sales" element={<SalesListPage />} />
                <Route path="/sales/new" element={<CreateSalePage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
