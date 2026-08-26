import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 
    | 'default' 
    | 'brand' 
    | 'outline' 
    | 'triage-red' 
    | 'triage-yellow' 
    | 'triage-green'
    | 'entity-symptom'
    | 'entity-medication'
    | 'entity-diagnosis'
    | 'entity-procedure'
    | 'entity-lab'
    | 'privacy'
    | 'model-ready'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] font-medium px-2 py-0.5 rounded-md gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-lg gap-1.5',
    lg: 'text-sm font-semibold px-3.5 py-1.5 rounded-xl gap-2',
  }

  const variantStyles: Record<string, string> = {
    default: 'bg-[#F1F4F9] text-[#475467] border border-[#E8ECF2]',
    brand: 'bg-[#EEF2FF] text-[#3157D5] border border-[#D9E2FE]',
    outline: 'bg-white text-[#344054] border border-[#D0D5DD]',
    
    // Clinical Triage
    'triage-red': 'bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]',
    'triage-yellow': 'bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]',
    'triage-green': 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]',

    // Medical NER Entities
    'entity-symptom': 'bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]',
    'entity-medication': 'bg-[#ECFEFF] text-[#0E7490] border border-[#CFFAFE]',
    'entity-diagnosis': 'bg-[#FFF1F2] text-[#BE123C] border border-[#FFE4E6]',
    'entity-procedure': 'bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7]',
    'entity-lab': 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]',

    // System States
    privacy: 'bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] font-mono tracking-tight',
    'model-ready': 'bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]',
  }

  const dotColors: Record<string, string> = {
    'triage-red': 'bg-[#E05252] animate-pulse',
    'triage-yellow': 'bg-[#E6B84A]',
    'triage-green': 'bg-[#45A878]',
    brand: 'bg-[#3157D5]',
    default: 'bg-[#98A2B3]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center select-none shrink-0 transition-colors',
        sizeStyles[size],
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            dotColors[variant] || 'bg-current'
          )}
        />
      )}
      {children}
    </span>
  )
}
