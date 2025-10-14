import { cn } from '@/core/utils/cn';
import { buttonVariants } from './variants';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary Reusable button component with variants
 * @domain core
 * @type ui-component
 * @category form
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
