import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'silver' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseStyles = 'badge';

  const variantStyles = {
    gold: 'badge-gold',
    silver: 'badge-silver',
    success: 'badge-success',
    error: 'badge-error',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}
