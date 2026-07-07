import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi } from '@/api/auth.api';
import { setCredentials } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { labels } from '@/lib/labels';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await authApi.login(email, password);
      dispatch(setCredentials(result));
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(message || labels.auth.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{labels.appName} — {labels.auth.login}</CardTitle>
          <p className="text-sm text-muted-foreground">{labels.appTagline}</p>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{labels.auth.email}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{labels.auth.password}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? labels.auth.signingIn : labels.auth.signIn}
          </Button>
        </form>
        <div className="mt-6 rounded-md bg-muted p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">{labels.auth.testAccounts}</p>
          <p>admin@mini-erp.com / Admin@123</p>
          <p>manager@mini-erp.com / Manager@123</p>
          <p>employee@mini-erp.com / Employee@123</p>
        </div>
      </Card>
    </div>
  );
}
