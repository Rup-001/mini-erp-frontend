import type { Role } from '@/types';

const numberFormatter = new Intl.NumberFormat('en-BD', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  return `৳${numberFormatter.format(amount)}`;
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRole(role: Role): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}
