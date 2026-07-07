import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50',
          variant === 'default' && 'bg-primary text-primary-foreground hover:bg-blue-700',
          variant === 'outline' && 'border border-border bg-white hover:bg-muted',
          variant === 'destructive' && 'bg-destructive text-white hover:bg-red-600',
          variant === 'ghost' && 'hover:bg-muted',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4',
          size === 'lg' && 'h-11 px-6',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
export { Button };
