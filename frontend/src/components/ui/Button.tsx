import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'brand-light'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3157D5]/40 disabled:pointer-events-none disabled:opacity-50 select-none'
    
    const sizeStyles = {
      sm: 'text-xs h-8 px-3 rounded-lg gap-1.5',
      md: 'text-sm h-10 px-4 rounded-xl gap-2',
      lg: 'text-base h-12 px-6 rounded-xl gap-2.5 font-semibold',
      icon: 'h-9 w-9 rounded-lg p-0',
    }

    const variantStyles = {
      primary: 'bg-[#3157D5] text-white hover:bg-[#2745B0] active:scale-[0.98] shadow-sm shadow-[#3157D5]/20',
      secondary: 'bg-[#111827] text-white hover:bg-[#1F2937] active:scale-[0.98] shadow-sm',
      outline: 'border border-[#E8ECF2] bg-white text-[#111827] hover:bg-[#F8FAFC] hover:border-[#D0D5DD] active:scale-[0.98]',
      ghost: 'text-[#667085] hover:text-[#111827] hover:bg-[#F1F4F9]',
      danger: 'bg-[#E05252] text-white hover:bg-[#C94242] active:scale-[0.98]',
      'brand-light': 'bg-[#EEF2FF] text-[#3157D5] hover:bg-[#E0E7FF] active:scale-[0.98]',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
