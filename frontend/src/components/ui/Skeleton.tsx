import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
}) => {
  const variantClasses = {
    text: 'h-4 w-full rounded',
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
  }[variant]

  return (
    <div
      className={`bg-slate-200/70 animate-pulse ${variantClasses} ${className}`}
    />
  )
}
