import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { logout } from '@/features/auth/authSlice';
import type { RootState } from '@/app/store';
import { cn } from '@/lib/utils';
import { labels } from '@/lib/labels';
import { formatRole } from '@/lib/format';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/dashboard', label: labels.nav.dashboard, icon: LayoutDashboard },
  { to: '/products', label: labels.nav.products, icon: Package },
  { to: '/sales', label: labels.nav.sales, icon: ShoppingCart },
  { to: '/sales/new', label: labels.nav.newSale, icon: ShoppingCart },
];

export default function DashboardLayout() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary">{labels.appName}</h1>
          <p className="text-xs text-muted-foreground">
            {user?.role && formatRole(user.role)} · {user?.name}
          </p>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-muted'
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <Button variant="ghost" className="mt-8 w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut size={16} />
          {labels.nav.logout}
        </Button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
