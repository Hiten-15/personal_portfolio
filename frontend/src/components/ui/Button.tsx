import type { ButtonProps, ButtonVariant } from '@/types/components';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-surface hover:bg-primary-dark border border-primary',
  outline:
    'bg-transparent text-primary border border-border-blue hover:bg-blue-tint',
  ghost: 'bg-transparent text-ink hover:bg-blue-tint border border-transparent',
};

export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
